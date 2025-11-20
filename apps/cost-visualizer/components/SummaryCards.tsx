import React from 'react';
import { LogStats } from '../types';
import { formatCurrency, formatNumber, formatDuration } from '../utils/parser';
import { DollarSign, Clock, Zap, FileCode } from 'lucide-react';

interface SummaryCardsProps {
  stats: LogStats;
}

const Card: React.FC<{ title: string; value: string; subtext?: string; icon: React.ReactNode }> = ({ title, value, subtext, icon }) => (
  <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm hover:bg-slate-800 hover:border-slate-600 transition-all">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        {subtext && <p className="text-xs text-slate-500 mt-2 font-mono">{subtext}</p>}
      </div>
      <div className="p-2.5 bg-slate-700/50 rounded-lg text-indigo-400">
        {icon}
      </div>
    </div>
  </div>
);

export const SummaryCards: React.FC<SummaryCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card 
        title="Total Cost" 
        value={formatCurrency(stats.totalCost)} 
        subtext={`Avg: ${formatCurrency(stats.avgCost)} / file`}
        icon={<DollarSign className="w-5 h-5" />}
      />
      <Card 
        title="Total Generation Time" 
        value={formatDuration(stats.totalGenerationTime)} 
        subtext={`Avg: ${formatDuration(stats.avgTime)} / file`}
        icon={<Clock className="w-5 h-5" />}
      />
      <Card 
        title="Total Tokens (Native)" 
        value={formatNumber(stats.totalPromptTokens + stats.totalCompletionTokens)} 
        subtext={`${((stats.totalReasoningTokens / (stats.totalPromptTokens + stats.totalCompletionTokens)) * 100).toFixed(1)}% reasoning`}
        icon={<Zap className="w-5 h-5" />}
      />
      <Card 
        title="Files Processed" 
        value={stats.totalFiles.toString()} 
        subtext="Log entries parsed"
        icon={<FileCode className="w-5 h-5" />}
      />
    </div>
  );
};