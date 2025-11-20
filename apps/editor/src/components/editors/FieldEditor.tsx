'use client';

import { UseFormRegister } from 'react-hook-form';
import { Trash2 } from 'lucide-react';

interface FieldEditorProps {
  index: number;
  register: UseFormRegister<any>;
  remove: () => void;
  dirtyFields?: any;
}

export default function FieldEditor({ index, register, remove, dirtyFields }: FieldEditorProps) {
  const basePath = `fields.${index}`;

  return (
    <div className="flex gap-4 items-start p-3 border border-border-base rounded bg-bg-surface hover:border-primary/50 transition-colors group relative">
      <div className="flex-1 grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Name
            {dirtyFields?.name && <span className="ml-2 text-yellow-500 text-xs" title="Changed">●</span>}
          </label>
          <input
            {...register(`${basePath}.name`)}
            className="w-full bg-bg-app border border-border-base rounded px-2 py-1 text-sm font-medium text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
        <div className="col-span-3">
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Type
            {dirtyFields?.type && <span className="ml-2 text-yellow-500 text-xs" title="Changed">●</span>}
          </label>
          <input
            {...register(`${basePath}.type`)}
            className="w-full bg-bg-app border border-border-base rounded px-2 py-1 text-sm font-mono text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
        <div className="col-span-6">
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Description
            {dirtyFields?.description && <span className="ml-2 text-yellow-500 text-xs" title="Changed">●</span>}
          </label>
          <input
            {...register(`${basePath}.description`)}
            className="w-full bg-bg-app border border-border-base rounded px-2 py-1 text-sm text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-6">
        <label className="flex items-center gap-1 text-xs text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
          <input type="checkbox" {...register(`${basePath}.static`)} className="accent-primary" />
          Static
          {dirtyFields?.static && <span className="ml-1 text-yellow-500 text-xs" title="Changed">●</span>}
        </label>
        <label className="flex items-center gap-1 text-xs text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
          <input type="checkbox" {...register(`${basePath}.final`)} className="accent-primary" />
          Final
          {dirtyFields?.final && <span className="ml-1 text-yellow-500 text-xs" title="Changed">●</span>}
        </label>
      </div>

      <button
        type="button"
        onClick={remove}
        className="text-text-secondary hover:text-red-500 self-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
