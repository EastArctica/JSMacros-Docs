import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const SNAPSHOT_DIR = 'json_docs-gemini-3-pro-preview';
const DOCS_ROOT = path.resolve(process.cwd(), '../../packages/core', SNAPSHOT_DIR);
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 60;
const WRITE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_WRITE_BYTES_PER_WINDOW = 1_073_741_824; // 1 GB

type RateBucket = { count: number; expiresAt: number };
type WriteBucket = { bytes: number; windowStart: number };

const rateBuckets = new Map<string, RateBucket>();
const writeBuckets = new Map<string, WriteBucket>();

class PathError extends Error {}

export async function GET(request: Request) {
    const rateLimitError = enforceRateLimit(request);
    if (rateLimitError) {
        return rateLimitError;
    }

    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
        return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    try {
        const fullPath = resolveDocPath(filePath);
        const content = await fs.readFile(fullPath, 'utf-8');
        return NextResponse.json(JSON.parse(content));
    } catch (error) {
        console.error('Error reading file:', error);
        const status = error instanceof PathError ? 403 : 500;
        const message = error instanceof PathError ? error.message : 'Failed to read file';
        return NextResponse.json({ error: message }, { status });
    }
}

export async function POST(request: Request) {
    const rateLimitError = enforceRateLimit(request);
    if (rateLimitError) {
        return rateLimitError;
    }

    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
        return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    let payload: unknown;
    try {
        payload = await request.json();
    } catch {
        return NextResponse.json({ error: 'Body must be valid JSON' }, { status: 400 });
    }

    const validation = validateDocSchema(payload);
    if (!validation.success) {
        return NextResponse.json({
            error: 'Payload does not match the documentation schema',
            details: validation.errors,
        }, { status: 422 });
    }

    try {
        const fullPath = resolveDocPath(filePath);
        const serialized = JSON.stringify(payload, null, 2);
        const byteSize = Buffer.byteLength(serialized, 'utf8');
        const writeLimitError = enforceWriteLimit(request, byteSize);
        if (writeLimitError) {
            return writeLimitError;
        }

        await fs.writeFile(fullPath, serialized, 'utf-8');
        return NextResponse.json({ success: true, bytesWritten: byteSize });
    } catch (error) {
        console.error('Error writing file:', error);
        if (error instanceof PathError) {
            return NextResponse.json({ error: error.message }, { status: 403 });
        }
        return NextResponse.json({ error: 'Failed to write file' }, { status: 500 });
    }
}

function resolveDocPath(filePath: string) {
    const normalized = stripSnapshotPrefix(filePath);

    if (!normalized.endsWith('.json')) {
        throw new PathError('Only JSON files inside the snapshot may be accessed');
    }

    const fullPath = path.resolve(DOCS_ROOT, normalized);
    const relative = path.relative(DOCS_ROOT, fullPath);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
        throw new PathError('Invalid path');
    }

    return fullPath;
}

function stripSnapshotPrefix(filePath: string) {
    const trimmed = filePath.trim();
    if (!trimmed) {
        throw new PathError('Path is required');
    }

    let relative = trimmed.replace(/^[/\\]+/, '');
    if (relative.startsWith(`${SNAPSHOT_DIR}/`) || relative.startsWith(`${SNAPSHOT_DIR}\\`)) {
        relative = relative.slice(SNAPSHOT_DIR.length + 1);
        relative = relative.replace(/^[/\\]+/, '');
    } else if (relative === SNAPSHOT_DIR) {
        throw new PathError('Path must point to a JSON file inside the snapshot');
    }

    return relative;
}

function getClientId(request: Request) {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0]?.trim() || 'unknown';
    }

    return request.headers.get('x-real-ip')
        || request.headers.get('cf-connecting-ip')
        || 'unknown';
}

function enforceRateLimit(request: Request) {
    const clientId = getClientId(request);
    const now = Date.now();
    const bucket = rateBuckets.get(clientId);

    if (!bucket || bucket.expiresAt <= now) {
        rateBuckets.set(clientId, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
        return null;
    }

    if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json({ error: 'Rate limit exceeded. Try again soon.' }, { status: 429 });
    }

    bucket.count += 1;
    return null;
}

function enforceWriteLimit(request: Request, bytes: number) {
    if (bytes > MAX_WRITE_BYTES_PER_WINDOW) {
        return NextResponse.json({ error: 'Single write exceeds per-IP quota.' }, { status: 413 });
    }

    const clientId = getClientId(request);
    const now = Date.now();
    const bucket = writeBuckets.get(clientId);

    if (!bucket || now - bucket.windowStart >= WRITE_LIMIT_WINDOW_MS) {
        writeBuckets.set(clientId, { bytes, windowStart: now });
        return null;
    }

    if (bucket.bytes + bytes > MAX_WRITE_BYTES_PER_WINDOW) {
        return NextResponse.json({
            error: 'Per-IP write quota exhausted (1 GB / 24h).',
        }, { status: 429 });
    }

    bucket.bytes += bytes;
    return null;
}

function validateDocSchema(payload: unknown) {
    const errors: string[] = [];

    if (Array.isArray(payload)) {
        payload.forEach((entry, index) => {
            validateDocEntry(entry, `root[${index}]`, errors);
        });
    } else {
        validateDocEntry(payload, 'root', errors);
    }

    return { success: errors.length === 0, errors };
}

function validateDocEntry(value: unknown, context: string, errors: string[]) {
    if (!isPlainObject(value)) {
        errors.push(`${context} must be an object`);
        return;
    }

    if (!isNonEmptyString(value.name)) {
        errors.push(`${context}.name must be a non-empty string`);
    }

    validateOptionalString(value.description, `${context}.description`, errors);
    validateOptionalString(value.fullClassName, `${context}.fullClassName`, errors);
    validateOptionalString(value.overview, `${context}.overview`, errors);
    validateOptionalString(value.extends, `${context}.extends`, errors);
    validateOptionalString(value.since, `${context}.since`, errors);

    validateMemberArray(value.constructors, `${context}.constructors`, errors, false);
    validateMemberArray(value.methods, `${context}.methods`, errors, true);
    validateFieldArray(value.fields, `${context}.fields`, errors);
    validateMemberArray(value.events, `${context}.events`, errors, true);

    if (value.examples !== undefined && !isStringArray(value.examples)) {
        errors.push(`${context}.examples must be an array of strings`);
    }
}

function validateMemberArray(value: unknown, context: string, errors: string[], requireName: boolean) {
    if (value === undefined) {
        return;
    }

    if (!Array.isArray(value)) {
        errors.push(`${context} must be an array`);
        return;
    }

    value.forEach((entry, index) => {
        const memberContext = `${context}[${index}]`;
        if (!isPlainObject(entry)) {
            errors.push(`${memberContext} must be an object`);
            return;
        }

        if (requireName && !isNonEmptyString(entry.name)) {
            errors.push(`${memberContext}.name must be a non-empty string`);
        }

        if (!requireName && !isNonEmptyString(entry.name) && !isNonEmptyString(entry.signature)) {
            errors.push(`${memberContext} must include a name or signature`);
        }

        validateOptionalString(entry.description, `${memberContext}.description`, errors);
        validateOptionalString(entry.signature, `${memberContext}.signature`, errors);
        validateOptionalString(entry.returnType, `${memberContext}.returnType`, errors);

        if (entry.parameters !== undefined) {
            validateParameters(entry.parameters, `${memberContext}.parameters`, errors);
        }

        if (entry.examples !== undefined && !isStringArray(entry.examples)) {
            errors.push(`${memberContext}.examples must be an array of strings`);
        }

        if (entry.static !== undefined && typeof entry.static !== 'boolean') {
            errors.push(`${memberContext}.static must be a boolean`);
        }

        if (entry.deprecated !== undefined && typeof entry.deprecated !== 'boolean') {
            errors.push(`${memberContext}.deprecated must be a boolean`);
        }
    });
}

function validateFieldArray(value: unknown, context: string, errors: string[]) {
    if (value === undefined) {
        return;
    }

    if (!Array.isArray(value)) {
        errors.push(`${context} must be an array`);
        return;
    }

    value.forEach((entry, index) => {
        const fieldContext = `${context}[${index}]`;
        if (!isPlainObject(entry)) {
            errors.push(`${fieldContext} must be an object`);
            return;
        }

        if (!isNonEmptyString(entry.name)) {
            errors.push(`${fieldContext}.name must be a non-empty string`);
        }

        validateOptionalString(entry.type, `${fieldContext}.type`, errors);
        validateOptionalString(entry.description, `${fieldContext}.description`, errors);

        if (entry.static !== undefined && typeof entry.static !== 'boolean') {
            errors.push(`${fieldContext}.static must be a boolean`);
        }

        if (entry.final !== undefined && typeof entry.final !== 'boolean') {
            errors.push(`${fieldContext}.final must be a boolean`);
        }
    });
}

function validateParameters(value: unknown, context: string, errors: string[]) {
    if (!Array.isArray(value)) {
        errors.push(`${context} must be an array`);
        return;
    }

    value.forEach((param, index) => {
        const paramContext = `${context}[${index}]`;
        if (!isPlainObject(param)) {
            errors.push(`${paramContext} must be an object`);
            return;
        }

        if (!isNonEmptyString(param.name)) {
            errors.push(`${paramContext}.name must be a non-empty string`);
        }

        if (!isNonEmptyString(param.type)) {
            errors.push(`${paramContext}.type must be a non-empty string`);
        }

        validateOptionalString(param.description, `${paramContext}.description`, errors);
    });
}

function validateOptionalString(value: unknown, context: string, errors: string[]) {
    if (value === undefined || value === null) {
        return;
    }

    if (typeof value !== 'string') {
        errors.push(`${context} must be a string`);
    }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((entry) => typeof entry === 'string');
}
