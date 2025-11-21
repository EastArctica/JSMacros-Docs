import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DOCS_ROOT = path.resolve(process.cwd(), '../../packages/core');

interface FileNode {
    name: string;
    path: string;
    type: 'file' | 'directory';
    children?: FileNode[];
}

async function getFiles(dir: string, relativePath: string = ''): Promise<FileNode[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const nodes: FileNode[] = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const entryRelativePath = path.join(relativePath, entry.name);

        if (entry.isDirectory()) {
            // Only include json_docs directories or their subdirectories
            if (relativePath === '' && !entry.name.startsWith('json_docs-')) {
                continue;
            }

            nodes.push({
                name: entry.name,
                path: entryRelativePath,
                type: 'directory',
                children: await getFiles(fullPath, entryRelativePath),
            });
        } else if (entry.name.endsWith('.json')) {
            nodes.push({
                name: entry.name,
                path: entryRelativePath,
                type: 'file',
            });
        }
    }

    return nodes;
}

export async function GET() {
    try {
        const files = await getFiles(DOCS_ROOT);
        return NextResponse.json(files);
    } catch (error) {
        console.error('Error reading files:', error);
        return NextResponse.json({ error: 'Failed to read files' }, { status: 500 });
    }
}
