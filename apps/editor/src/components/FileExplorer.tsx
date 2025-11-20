'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import clsx from 'clsx';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
}

interface FileExplorerProps {
  onSelectFile: (path: string) => void;
  selectedFile: string | null;
}

export default function FileExplorer({ onSelectFile, selectedFile }: FileExplorerProps) {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/files')
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4 text-sm text-gray-500">Loading files...</div>;

  return (
    <div className="h-full overflow-y-auto p-2">
      {files.map((node) => (
        <FileTreeNode
          key={node.path}
          node={node}
          onSelect={onSelectFile}
          selectedFile={selectedFile}
          depth={0}
        />
      ))}
    </div>
  );
}

function FileTreeNode({
  node,
  onSelect,
  selectedFile,
  depth,
}: {
  node: FileNode;
  onSelect: (path: string) => void;
  selectedFile: string | null;
  depth: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isSelected = selectedFile === node.path;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.type === 'directory') {
      setIsOpen(!isOpen);
    } else {
      onSelect(node.path);
    }
  };

  return (
    <div>
      <div
        className={clsx(
          'flex items-center py-1 px-2 cursor-pointer rounded text-sm select-none transition-colors',
          'hover:bg-bg-surface-hover hover:text-text-primary',
          isSelected ? 'bg-primary/10 text-primary font-medium' : 'text-text-secondary'
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={handleToggle}
      >
        <span className={clsx("mr-1", isSelected ? "text-primary" : "text-text-muted")}>
          {node.type === 'directory' ? (
            isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          ) : (
            <File size={14} />
          )}
        </span>
        <span className="truncate">{node.name}</span>
      </div>
      {isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.path}
              node={child}
              onSelect={onSelect}
              selectedFile={selectedFile}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
