import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DOCS_ROOT = path.resolve(process.cwd(), '../../packages/core');

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
        return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    // Security check: ensure path is within DOCS_ROOT
    const fullPath = path.resolve(DOCS_ROOT, filePath);
    if (!fullPath.startsWith(DOCS_ROOT)) {
        return NextResponse.json({ error: 'Invalid path' }, { status: 403 });
    }

    try {
        const content = await fs.readFile(fullPath, 'utf-8');
        return NextResponse.json(JSON.parse(content));
    } catch (error) {
        console.error('Error reading file:', error);
        return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
        return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    const fullPath = path.resolve(DOCS_ROOT, filePath);
    if (!fullPath.startsWith(DOCS_ROOT)) {
        return NextResponse.json({ error: 'Invalid path' }, { status: 403 });
    }

    try {
        const body = await request.json();
        // Write with 2-space indentation
        await fs.writeFile(fullPath, JSON.stringify(body, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error writing file:', error);
        return NextResponse.json({ error: 'Failed to write file' }, { status: 500 });
    }
}
