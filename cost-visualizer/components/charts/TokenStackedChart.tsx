import React from 'react';
import { ParsedLogEntry } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatNumber } from '../../utils/parser';

interface Props {
  data: ParsedLogEntry[];
}

export const TokenStackedChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 h-96 flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4">Native Token Breakdown</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="shortName" 
              stroke="#94a3b8" 
              tick={{ fontSize: 12 }} 
            />
            <YAxis 
              stroke="#94a3b8" 
              tick={{ fontSize: 12 }}
              tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '8px', color: '#f1f5f9' }}
              formatter={(value: number) => formatNumber(value)}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="native_tokens_prompt" stackId="a" name="Prompt" fill="#22d3ee" />
            <Bar dataKey="native_tokens_completion" stackId="a" name="Completion" fill="#818cf8" />
            <Bar dataKey="native_tokens_reasoning" stackId="a" name="Reasoning" fill="#c084fc" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};