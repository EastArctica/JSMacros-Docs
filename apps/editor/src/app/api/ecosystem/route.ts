import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ECOSYSTEM_DIR = path.join(process.cwd(), 'example-ecosystem', 'headers');

let cachedFiles: { path: string; content: string }[] | null = null;

async function getDtsFiles(dir: string, baseDir: string): Promise<{ path: string; content: string }[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: { path: string; content: string }[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      files.push(...(await getDtsFiles(fullPath, baseDir)));
    } else if (entry.isFile() && entry.name.endsWith('.d.ts')) {
      const content = await fs.readFile(fullPath, 'utf-8');
      // Normalize path separators to forward slashes for consistency in Monaco
      files.push({ path: relativePath.replace(/\\/g, '/'), content });
    }
  }

  return files;
}

export async function GET() {
  try {
    if (!cachedFiles) {
      cachedFiles = await getDtsFiles(ECOSYSTEM_DIR, ECOSYSTEM_DIR);
    }
    return NextResponse.json(cachedFiles);
  } catch (error) {
    console.error('Error reading ecosystem files:', error);
    return NextResponse.json({ error: 'Failed to load ecosystem files' }, { status: 500 });
  }
}
