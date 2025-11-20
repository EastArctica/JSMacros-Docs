'use client';

import Editor, { EditorProps, OnMount } from '@monaco-editor/react';

let ecosystemPromise: Promise<{ path: string; content: string }[]> | null = null;

interface MonacoWrapperProps extends EditorProps {
  label?: string;
}

export default function MonacoWrapper({ label, onMount, ...props }: MonacoWrapperProps) {
  const handleEditorDidMount: OnMount = async (editor, monaco) => {
    // Configure compiler options for strict JavaScript
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      checkJs: true,
      allowJs: true,
      noLib: false,
      strict: true,
      alwaysStrict: true,
      noImplicitAny: true,
    });

    try {
      if (!ecosystemPromise) {
        ecosystemPromise = fetch('/api/ecosystem').then(async (res) => {
          if (!res.ok) throw new Error('Failed to fetch ecosystem types');
          return res.json();
        });
      }

      const files = await ecosystemPromise;
      
      // Use setExtraLibs to replace existing libs to avoid duplicates on remount
      // Note: This replaces ALL extra libs. If other components add libs, this might be an issue.
      // But for this app, this seems to be the central place.
      // Actually, let's use addExtraLib but maybe we can track if we loaded them?
      // Since monaco instance is passed here, we can just add them.
      // To be safe against duplicates, we can rely on Monaco handling same-URI overwrites or just accept it for now.
      // Better approach: map files to the format expected by setExtraLibs if we wanted to replace all.
      // But let's stick to addExtraLib for individual files.
      
      const libs = files.map(file => ({
        content: file.content,
        filePath: `file:///headers/${file.path}`
      }));

      // We can use setExtraLibs if we want to manage the whole set of extra libs
      monaco.languages.typescript.javascriptDefaults.setExtraLibs(libs);

    } catch (error) {
      console.error('Failed to load ecosystem types:', error);
      ecosystemPromise = null;
    }

    if (onMount) {
      onMount(editor, monaco);
    }
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      {label && <label className="text-sm font-medium text-text-secondary">{label}</label>}
      <div className="border border-border-base rounded-md overflow-hidden flex-1 min-h-[200px]">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { bottom: 10 },
            fontSize: 14,
            lineNumbers: 'on',
            folding: true,
            ...props.options,
          }}
          {...props}
        />
      </div>
    </div>
  );
}
