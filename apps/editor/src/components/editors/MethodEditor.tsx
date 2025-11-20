'use client';

import { Control, UseFormRegister, useFieldArray, Controller } from 'react-hook-form';
import { Trash2, Code } from 'lucide-react';
import MonacoWrapper from '../MonacoWrapper';

interface MethodEditorProps {
  index: number;
  control: Control<any>;
  register: UseFormRegister<any>;
  remove: () => void;
  isConstructor?: boolean;
  dirtyFields?: any;
}

export default function MethodEditor({ index, control, register, remove, isConstructor = false, dirtyFields }: MethodEditorProps) {
  const basePath = isConstructor ? `constructors.${index}` : `methods.${index}`;

  const { fields: parameters, append: appendParam, remove: removeParam } = useFieldArray({
    control,
    name: `${basePath}.parameters`,
  });

  return (
    <div className="border border-border-base rounded-lg p-4 bg-bg-surface hover:bg-bg-surface-hover transition-colors relative group">
      <button
        type="button"
        onClick={remove}
        className="absolute top-4 right-4 text-text-secondary hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 size={18} />
      </button>

      <div className="grid grid-cols-12 gap-4 mb-4">
        {!isConstructor && (
          <div className="col-span-3">
            <label className="block text-xs font-medium text-text-secondary mb-1">
              Name
              {dirtyFields?.name && <span className="ml-2 text-yellow-500 text-xs" title="Changed">●</span>}
            </label>
            <input
              {...register(`${basePath}.name`)}
              className="w-full bg-bg-app border border-border-base rounded px-2 py-1 text-sm text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Method Name"
            />
          </div>
        )}
        <div className={isConstructor ? "col-span-8" : "col-span-5"}>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Signature
            {dirtyFields?.signature && <span className="ml-2 text-yellow-500 text-xs" title="Changed">●</span>}
          </label>
          <input
            {...register(`${basePath}.signature`)}
            className="w-full bg-bg-app border border-border-base rounded px-2 py-1 text-sm font-mono text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="Signature"
          />
        </div>
        {!isConstructor && (
          <div className="col-span-3">
            <label className="block text-xs font-medium text-text-secondary mb-1">
              Return Type
              {dirtyFields?.returnType && <span className="ml-2 text-yellow-500 text-xs" title="Changed">●</span>}
            </label>
            <input
              {...register(`${basePath}.returnType`)}
              className="w-full bg-bg-app border border-border-base rounded px-2 py-1 text-sm font-mono text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="void"
            />
          </div>
        )}
        {!isConstructor && (
          <div className="col-span-1 flex items-end pb-2">
            <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
              <input type="checkbox" {...register(`${basePath}.static`)} className="accent-primary" />
              Static
              {dirtyFields?.static && <span className="ml-1 text-yellow-500 text-xs" title="Changed">●</span>}
            </label>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-text-secondary mb-1">
          Description
          {dirtyFields?.description && <span className="ml-2 text-yellow-500 text-xs" title="Changed">●</span>}
        </label>
        <textarea
          {...register(`${basePath}.description`)}
          rows={2}
          className="w-full bg-bg-app border border-border-base rounded px-2 py-1 text-sm text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
          placeholder="Description..."
        />
      </div>

      {/* Parameters */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Parameters</span>
          <button
            type="button"
            onClick={() => appendParam({ name: 'arg', type: 'String', description: '' })}
            className="text-xs bg-bg-app hover:bg-border-base px-2 py-0.5 rounded text-text-primary border border-border-base transition-colors"
          >
            + Add
          </button>
        </div>
        <div className="space-y-2 pl-2 border-l-2 border-border-base">
          {parameters.map((param, pIndex) => (
            <div key={param.id} className="flex gap-2 items-start">
              <input
                {...register(`${basePath}.parameters.${pIndex}.name`)}
                className="w-24 bg-bg-app border border-border-base rounded px-2 py-1 text-xs text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="Name"
              />
              {dirtyFields?.parameters?.[pIndex]?.name && <span className="text-yellow-500 text-xs self-center" title="Changed">●</span>}
              <input
                {...register(`${basePath}.parameters.${pIndex}.type`)}
                className="w-32 bg-bg-app border border-border-base rounded px-2 py-1 text-xs font-mono text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="Type"
              />
              {dirtyFields?.parameters?.[pIndex]?.type && <span className="text-yellow-500 text-xs self-center" title="Changed">●</span>}
              <input
                {...register(`${basePath}.parameters.${pIndex}.description`)}
                className="flex-1 bg-bg-app border border-border-base rounded px-2 py-1 text-xs text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="Description"
              />
              {dirtyFields?.parameters?.[pIndex]?.description && <span className="text-yellow-500 text-xs self-center" title="Changed">●</span>}
              <button
                type="button"
                onClick={() => removeParam(pIndex)}
                className="text-text-secondary hover:text-red-500 pt-1 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {parameters.length === 0 && <p className="text-xs text-text-muted italic">No parameters</p>}
        </div>
      </div>

      {/* Examples */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Code size={14} className="text-text-secondary" />
          <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Examples
            {dirtyFields?.examples && <span className="ml-2 text-yellow-500 text-xs" title="Changed">●</span>}
          </span>
        </div>
        <Controller
          control={control}
          name={`${basePath}.examples`}
          render={({ field: { value, onChange } }) => (
            <div className="h-48 border border-border-base rounded overflow-hidden">
              <MonacoWrapper
                value={Array.isArray(value) ? value.join('\n\n') : value}
                onChange={(val) => onChange(val ? [val] : [])}
                language="javascript"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
