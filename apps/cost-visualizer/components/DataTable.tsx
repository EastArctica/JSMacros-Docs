import React from 'react';
import { ParsedLogEntry } from '../types';
import { formatCurrency, formatNumber, formatDuration } from '../utils/parser';

interface Props {
  data: ParsedLogEntry[];
}

export const DataTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">Detailed Logs</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-slate-400 uppercase bg-slate-900/50">
            <tr>
              <th className="px-6 py-3 font-medium">File</th>
              <th className="px-6 py-3 font-medium text-right">Cost</th>
              <th className="px-6 py-3 font-medium text-right">Time</th>
              <th className="px-6 py-3 font-medium text-right">Total Tokens</th>
              <th className="px-6 py-3 font-medium text-right">Reasoning</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{row.filename}</td>
                <td className="px-6 py-4 text-right font-mono text-emerald-400">{formatCurrency(row.cost)}</td>
                <td className="px-6 py-4 text-right font-mono">{formatDuration(row.generation_time)}</td>
                <td className="px-6 py-4 text-right font-mono">{formatNumber(row.native_total_tokens)}</td>
                <td className="px-6 py-4 text-right font-mono text-purple-400">{formatNumber(row.native_tokens_reasoning)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};