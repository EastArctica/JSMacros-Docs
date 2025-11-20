'use client';

import Editor, { EditorProps } from '@monaco-editor/react';

interface MonacoWrapperProps extends EditorProps {
  label?: string;
}

export default function MonacoWrapper({ label, ...props }: MonacoWrapperProps) {
  return (
    <div className="flex flex-col gap-2 h-full">
      {label && <label className="text-sm font-medium text-text-secondary">{label}</label>}
      <div className="border border-border-base rounded-md overflow-hidden flex-1 min-h-[200px]">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
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
