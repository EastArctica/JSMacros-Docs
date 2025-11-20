import React, { useMemo } from 'react';
import { ParsedLogEntry } from '../types';
import { formatCurrency, formatDuration, formatNumber } from '../utils/parser';
import { Box, Cpu, CheckCircle2 } from 'lucide-react';

interface Props {
  data: ParsedLogEntry[];
  selectedModel: string | null;
  onSelectModel: (model: string | null) => void;
}

export const ModelStats: React.FC<Props> = ({ data, selectedModel, onSelectModel }) => {
  const modelGroups = useMemo(() => {
    const groups: Record<string, {
      count: number;
      cost: number;
      tokens: number;
      time: number;
    }> = {};

    data.forEach((item) => {
      if (!groups[item.model]) {
        groups[item.model] = { count: 0, cost: 0, tokens: 0, time: 0 };
      }
      groups[item.model].count++;
      groups[item.model].cost += item.cost;
      groups[item.model].tokens += item.native_total_tokens;
      groups[item.model].time += item.generation_time;
    });

    return Object.entries(groups).sort((a, b) => b[1].cost - a[1].cost);
  }, [data]);

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">Model Performance Breakdown</h3>
        </div>
        {selectedModel && (
          <button 
            onClick={(e) => { e.stopPropagation(); onSelectModel(null); }}
            className="text-xs text-indigo-300 hover:text-indigo-200 border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 rounded-full transition-colors"
          >
            Clear Filter
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {modelGroups.map(([modelName, stats]) => {
          const isSelected = selectedModel === modelName;
          const isDimmed = selectedModel && !isSelected;

          return (
            <div 
              key={modelName} 
              onClick={() => onSelectModel(isSelected ? null : modelName)}
              className={`
                relative border rounded-lg p-4 transition-all cursor-pointer group
                ${isSelected 
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                  : 'bg-slate-900/50 border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800/80'
                }
                ${isDimmed ? 'opacity-50 grayscale-[0.5]' : 'opacity-100'}
              `}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className={`font-mono text-sm break-all ${isSelected ? 'text-white' : 'text-indigo-300'}`}>
                  {modelName}
                </h4>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                {!isSelected && (
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-full border border-slate-700">
                    {stats.count} files
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Total Cost</p>
                  <p className="text-sm font-bold text-emerald-400">{formatCurrency(stats.cost)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Avg Latency</p>
                  <p className="text-sm font-bold text-slate-200">{formatDuration(stats.time / stats.count)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Total Tokens</p>
                  <p className="text-sm font-bold text-purple-400">{formatNumber(stats.tokens)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};