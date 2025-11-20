import React from 'react';
import { ParsedLogEntry } from '../../types';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatDuration, formatNumber } from '../../utils/parser';

interface Props {
  data: ParsedLogEntry[];
}

export const TimeScatterChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 h-96 flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4">Generation Time vs. Total Tokens</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              type="number" 
              dataKey="native_total_tokens" 
              name="Total Tokens" 
              stroke="#94a3b8"
              label={{ value: 'Total Native Tokens', position: 'insideBottom', offset: -10, fill: '#94a3b8' }}
            />
            <YAxis 
              type="number" 
              dataKey="generation_time" 
              name="Time" 
              stroke="#94a3b8"
              unit="s" // Recharts adds this unit to the tick formatted value
              tickFormatter={(val) => (val / 1000).toFixed(1)} // Just return the number string
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '8px', color: '#f1f5f9' }}
              formatter={(value: number, name: string) => {
                 if (name === 'Time') return [formatDuration(value), 'Duration'];
                 if (name === 'Total Tokens') return [formatNumber(value), 'Tokens'];
                 return value;
              }}
              labelFormatter={() => ''}
            />
            <Scatter name="Files" data={data} fill="#34d399">
               {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#34d399" fillOpacity={0.6} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};