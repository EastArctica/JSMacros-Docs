import React, { useMemo, useState } from 'react';
import { ParsedLogEntry } from '../types';
import { SummaryCards } from './SummaryCards';
import { CostBarChart } from './charts/CostBarChart';
import { TokenStackedChart } from './charts/TokenStackedChart';
import { TimeScatterChart } from './charts/TimeScatterChart';
import { FileTreeMap } from './charts/FileTreeMap';
import { ModelStats } from './ModelStats';
import { DataTable } from './DataTable';
import { RefreshCw, Filter } from 'lucide-react';

interface DashboardProps {
  data: ParsedLogEntry[];
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, onReset }) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // Filter data based on selection
  const filteredData = useMemo(() => {
    if (!selectedModel) return data;
    return data.filter(d => d.model === selectedModel);
  }, [data, selectedModel]);

  // Calculate aggregate statistics for the filtered view
  const stats = useMemo(() => {
    const totalFiles = filteredData.length;
    const totalCost = filteredData.reduce((sum, item) => sum + item.cost, 0);
    const totalGenerationTime = filteredData.reduce((sum, item) => sum + item.generation_time, 0);
    const totalPromptTokens = filteredData.reduce((sum, item) => sum + item.native_tokens_prompt, 0);
    const totalCompletionTokens = filteredData.reduce((sum, item) => sum + item.native_tokens_completion, 0);
    const totalReasoningTokens = filteredData.reduce((sum, item) => sum + item.native_tokens_reasoning, 0);

    return {
      totalFiles,
      totalCost,
      totalGenerationTime,
      totalPromptTokens,
      totalCompletionTokens,
      totalReasoningTokens,
      avgCost: totalFiles ? totalCost / totalFiles : 0,
      avgTime: totalFiles ? totalGenerationTime / totalFiles : 0,
    };
  }, [filteredData]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-white tracking-tight">Analysis Dashboard</h2>
            {selectedModel && (
               <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-sm font-medium flex items-center gap-2">
                 <Filter className="w-3 h-3" />
                 Filtered by Model
               </span>
            )}
          </div>
          <p className="text-slate-400 mt-1">
            Visualizing performance for <span className="text-slate-200 font-semibold">{filteredData.length}</span> log entries
            {selectedModel ? ' (Filtered)' : ''}
          </p>
        </div>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-colors text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Upload New File
        </button>
      </div>

      {/* Pass FULL data to ModelStats so we see all options, but handle selection */}
      <ModelStats 
        data={data} 
        selectedModel={selectedModel} 
        onSelectModel={setSelectedModel} 
      />

      <SummaryCards stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <FileTreeMap data={filteredData} />
        </div>
        <div className="lg:col-span-1">
          <CostBarChart data={filteredData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TokenStackedChart data={filteredData} />
        <TimeScatterChart data={filteredData} />
      </div>

      <div className="mb-8">
        <DataTable data={filteredData} />
      </div>
      
      <footer className="text-center text-slate-600 text-sm pb-8">
        Generated with Gemini API Log Visualizer
      </footer>
    </div>
  );
};