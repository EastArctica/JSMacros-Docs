import React, { useMemo, useState } from 'react';
import { ParsedLogEntry } from '../../types';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import { formatCurrency, formatNumber } from '../../utils/parser';

interface Props {
  data: ParsedLogEntry[];
}

type TreeNode = {
  name: string;
  size: number;
  children?: TreeNode[];
};

const CustomContent = (props: any) => {
  const { depth, x, y, width, height, index, name } = props;
  
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? '#334155' : '#6366f1',
          stroke: '#1e293b',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1,
          fillOpacity: 0.6 + (index % 5) * 0.1,
        }}
      />
      {width > 40 && height > 20 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize={Math.min(width / 5, 12)}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {name}
        </text>
      )}
    </g>
  );
};

export const FileTreeMap: React.FC<Props> = ({ data }) => {
  const [metric, setMetric] = useState<'cost' | 'tokens'>('cost');

  const treeData = useMemo(() => {
    // Create a map-based tree builder to handle deep nesting efficiently
    const root: TreeNode = { name: 'root', size: 0, children: [] };

    data.forEach((item) => {
      const parts = item.filename.split('/');
      let currentLevel = root.children!;

      parts.forEach((part, index) => {
        const isLast = index === parts.length - 1;
        
        let existingNode = currentLevel.find(n => n.name === part);

        if (!existingNode) {
          existingNode = { name: part, size: 0, children: [] };
          currentLevel.push(existingNode);
        }

        if (isLast) {
          // For leaf nodes, set the size and remove children array
          existingNode.size = metric === 'cost' ? item.cost : item.native_total_tokens;
          delete existingNode.children;
        } else {
          // Continue down the tree
          currentLevel = existingNode.children!;
        }
      });
    });

    return root.children;
  }, [data, metric]);

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Project Structure Analysis</h3>
        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
          <button
            onClick={() => setMetric('cost')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              metric === 'cost' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cost
          </button>
          <button
            onClick={() => setMetric('tokens')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              metric === 'tokens' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tokens
          </button>
        </div>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            key={metric} // Force re-render on metric change
            data={treeData}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            content={<CustomContent />}
            animationDuration={300}
          >
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '8px', color: '#f1f5f9' }}
              formatter={(value: number) => metric === 'cost' ? formatCurrency(value) : formatNumber(value)}
            />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </div>
  );
};