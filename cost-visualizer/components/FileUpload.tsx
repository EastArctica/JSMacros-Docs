import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle, Database } from 'lucide-react';

interface FileUploadProps {
  onFileLoaded: (content: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingSample, setIsLoadingSample] = useState(false);

  const handleFile = (file: File) => {
    setError(null);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        onFileLoaded(text);
      }
    };
    reader.onerror = () => {
      setError("Failed to read file.");
    };
    reader.readAsText(file);
  };

  const handleLoadSample = async () => {
    setError(null);
    setIsLoadingSample(true);
    try {
      const response = await fetch('./costs.txt');
      if (!response.ok) {
        throw new Error(`Failed to load costs.txt (${response.status})`);
      }
      const text = await response.text();
      onFileLoaded(text);
    } catch (err) {
      console.error(err);
      setError("Failed to load './costs.txt'. Ensure the file exists in the public folder.");
    } finally {
      setIsLoadingSample(false);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] p-6">
      <div className="max-w-xl w-full text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Gemini Log Analyzer</h1>
        <p className="text-slate-400 text-lg">
          Upload your API log file to visualize costs, latency, and token usage.
        </p>
      </div>

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          w-full max-w-xl p-10 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer group
          flex flex-col items-center justify-center gap-4
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-500/10 scale-105' 
            : 'border-slate-700 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-800/50'
          }
        `}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".txt,.log,.json"
          onChange={onInputChange}
        />
        
        <div className={`p-4 rounded-full bg-slate-800 group-hover:bg-slate-700 transition-colors ${isDragging ? 'bg-indigo-500/20' : ''}`}>
          <Upload className={`w-8 h-8 ${isDragging ? 'text-indigo-400' : 'text-slate-400'}`} />
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-slate-200">
            Drop your log file here
          </p>
          <p className="text-sm text-slate-500 mt-1">
            or <label htmlFor="file-upload" className="text-indigo-400 hover:text-indigo-300 cursor-pointer font-semibold hover:underline">browse files</label>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-950/50 px-3 py-1.5 rounded-md border border-slate-800 mt-2">
          <FileText className="w-3 h-3" />
          <span>Format: filename: JSON</span>
        </div>
      </div>

      <div className="w-full max-w-xl mt-6">
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink-0 mx-4 text-slate-600 text-xs uppercase font-semibold">Or start with data</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <div className="flex justify-center mt-2">
          <button
            onClick={handleLoadSample}
            disabled={isLoadingSample}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingSample ? (
              <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Database className="w-4 h-4" />
            )}
            {isLoadingSample ? 'Loading...' : 'Load sample data (costs.txt)'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};