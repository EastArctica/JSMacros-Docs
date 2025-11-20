'use client';

import { useState, useEffect } from 'react';
import FileExplorer from '@/components/FileExplorer';
import ClassEditor from '@/components/editors/ClassEditor';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      setFileContent(null);
      return;
    }

    setLoading(true);
    fetch(`/api/content?path=${encodeURIComponent(selectedFile)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load file');
        return res.json();
      })
      .then((data) => {
        setFileContent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert('Failed to load file content');
      });
  }, [selectedFile]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-app">
      {/* Sidebar */}
      <div className="w-80 border-r border-border-base bg-bg-surface flex flex-col">
        <div className="p-4 border-b border-border-base bg-bg-surface">
          <h1 className="font-bold text-lg text-text-primary">JsMacros Docs</h1>
          <p className="text-xs text-text-secondary">Editor v1.0</p>
        </div>
        <FileExplorer onSelectFile={setSelectedFile} selectedFile={selectedFile} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full text-text-secondary">
            Loading...
          </div>
        ) : selectedFile && fileContent ? (
          <ClassEditor
            key={selectedFile} // Force re-mount on file change to reset form state
            initialData={fileContent}
            filePath={selectedFile}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-text-muted">
            <p className="text-lg">Select a file to edit</p>
          </div>
        )}
      </div>
    </div>
  );
}
