import React, { useState, useCallback } from 'react';
import { FileUpload } from './components/FileUpload';
import { Dashboard } from './components/Dashboard';
import { parseLogFile } from './utils/parser';
import { ParsedLogEntry } from './types';
import { Activity } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ParsedLogEntry[] | null>(null);

  const handleFileLoaded = useCallback((content: string) => {
    const parsedData = parseLogFile(content);
    if (parsedData.length > 0) {
      setData(parsedData);
    } else {
      alert("No valid log entries found in the file. Please check the format.");
    }
  }, []);

  const handleReset = useCallback(() => {
    setData(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation / Header */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">GeminiVis</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {!data ? (
          <FileUpload onFileLoaded={handleFileLoaded} />
        ) : (
          <Dashboard data={data} onReset={handleReset} />
        )}
      </main>
    </div>
  );
};

export default App;