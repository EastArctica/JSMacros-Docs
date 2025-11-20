import React from 'react';
import { ParsedLogEntry } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '../../utils/parser';

interface Props {
  data: ParsedLogEntry[];
}

export const CostBarChart: React.FC<Props> = ({ data }) => {
  // Sort by cost descending and take top 20
  const sortedData = [...data].sort((a, b) => b.cost - a.cost).slice(0, 20);

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 h-96 flex flex-col">
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="text-lg font-semibold text-white">Cost per File</h3>
        <span className="text-xs text-slate-400">Top 20 most expensive</span>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} layout="horizontal" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="shortName" 
              stroke="#94a3b8" 
              tick={{ fontSize: 12 }} 
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="#94a3b8" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip 
              cursor={{ fill: '#334155', opacity: 0.4 }}
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '8px', color: '#f1f5f9' }}
              itemStyle={{ color: '#818cf8' }}
              formatter={(value: number) => [formatCurrency(value), 'Cost']}
            />
            <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#6366f1'} fillOpacity={index === 0 ? 0.9 : 0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};