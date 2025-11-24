'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Save, Plus, CheckCircle2, AlertTriangle } from 'lucide-react';
import MethodEditor from './MethodEditor';
import FieldEditor from './FieldEditor';
import clsx from 'clsx';

interface ClassData {
  name: string;
  fullClassName: string;
  extends: string | null;
  since: string;
  description: string;
  overview: string;
  constructors: any[];
  methods: any[];
  fields?: any[];
}

interface ClassEditorProps {
  initialData: ClassData;
  filePath: string;
}

export default function ClassEditor({ initialData, filePath }: ClassEditorProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'constructors' | 'methods' | 'fields'>('overview');
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const { register, control, handleSubmit, reset, watch, formState: { dirtyFields } } = useForm<ClassData>({
    defaultValues: initialData,
  });

  const className = watch('name');

  // Update form when initialData changes (file switch)
  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const countChanges = (obj: any): number => {
    if (!obj) return 0;
    if (typeof obj === 'boolean') return obj ? 1 : 0;
    if (Array.isArray(obj)) return obj.reduce((acc, item) => acc + countChanges(item), 0);
    if (typeof obj === 'object') return Object.values(obj).reduce((acc: number, val) => acc + countChanges(val), 0);
    return 0;
  };

  const changeCount = countChanges(dirtyFields);

  const onSubmit = useCallback(async (data: ClassData) => {
    try {
      const res = await fetch(`/api/content?path=${encodeURIComponent(filePath)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to save');
      reset(data, { keepValues: true });
      setSaveStatus({ type: 'success', message: 'Changes saved successfully.' });
    } catch (error) {
      console.error(error);
      setSaveStatus({ type: 'error', message: 'Failed to save file.' });
    }
  }, [filePath]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        handleSubmit(onSubmit)();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleSubmit, onSubmit]);

  useEffect(() => {
    if (!saveStatus) return;
    const timeout = window.setTimeout(() => setSaveStatus(null), 3500);
    return () => window.clearTimeout(timeout);
  }, [saveStatus]);

  const { fields: methods, append: appendMethod, remove: removeMethod } = useFieldArray({
    control,
    name: 'methods',
  });

  const { fields: constructors, append: appendConstructor, remove: removeConstructor } = useFieldArray({
    control,
    name: 'constructors',
  });

  // Fields might be undefined in some JSONs
  const { fields: classFields, append: appendField, remove: removeField } = useFieldArray({
    control,
    name: 'fields',
  });

  return (
    <>
      {saveStatus && (
        <div
          role="status"
          className={clsx(
            'fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg border text-sm font-medium',
            saveStatus.type === 'success'
              ? 'bg-emerald-600/95 border-emerald-500 text-white'
              : 'bg-rose-600/95 border-rose-500 text-white'
          )}
        >
          {saveStatus.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          <span>{saveStatus.message}</span>
          <button
            type="button"
            className="ml-2 text-white/80 hover:text-white"
            onClick={() => setSaveStatus(null)}
            aria-label="Dismiss save notification"
          >
            &times;
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border-base p-4 bg-bg-surface flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{watch('name')}</h1>
          <p className="text-sm text-text-secondary">{watch('fullClassName')}</p>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition-colors"
        >
          <Save size={18} />
          {changeCount > 0 ? `Save ${changeCount} Changes` : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-base bg-bg-app px-4">
        {['overview', 'constructors', 'methods', 'fields'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab as any)}
            className={clsx(
              'px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize',
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-bg-app">
        <div className="max-w-5xl mx-auto bg-bg-surface rounded-lg shadow p-6 min-h-full border border-border-base">

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Class Name
                    {dirtyFields.name && <span className="ml-2 text-yellow-500 text-xs" title="Changed">●</span>}
                  </label>
                  <input
                    {...register('name')}
                    className="w-full bg-bg-app border border-border-base rounded px-3 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Since
                    {dirtyFields.since && <span className="ml-2 text-yellow-500 text-xs" title="Changed">●</span>}
                  </label>
                  <input
                    {...register('since')}
                    className="w-full bg-bg-app border border-border-base rounded px-3 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Full Class Name
                    {dirtyFields.fullClassName && <span className="ml-2 text-yellow-500 text-xs" title="Changed">●</span>}
                  </label>
                  <input
                    {...register('fullClassName')}
                    className="w-full bg-bg-app border border-border-base rounded px-3 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Extends
                    {dirtyFields.extends && <span className="ml-2 text-yellow-500 text-xs" title="Changed">●</span>}
                  </label>
                  <input
                    {...register('extends')}
                    className="w-full bg-bg-app border border-border-base rounded px-3 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Description (Markdown)
                  {dirtyFields.description && <span className="ml-2 text-yellow-500 text-xs" title="Changed">●</span>}
                </label>
                <textarea
                  {...register('description')}
                  rows={5}
                  className="w-full bg-bg-app border border-border-base rounded px-3 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none font-mono text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Overview (Markdown)
                  {dirtyFields.overview && <span className="ml-2 text-yellow-500 text-xs" title="Changed">●</span>}
                </label>
                <textarea
                  {...register('overview')}
                  rows={8}
                  className="w-full bg-bg-app border border-border-base rounded px-3 py-2 text-text-primary focus:ring-2 focus:ring-primary outline-none font-mono text-sm transition-all"
                />
              </div>
            </div>
          )}

          {activeTab === 'methods' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-text-primary">Methods ({methods.length})</h2>
                <button
                  type="button"
                  onClick={() => appendMethod({ name: 'newMethod', signature: 'newMethod()', returnType: 'void', description: '', examples: [] })}
                  className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors"
                >
                  <Plus size={16} /> Add Method
                </button>
              </div>

              <div className="space-y-6">
                {methods.map((field, index) => (
                  <MethodEditor
                    key={field.id}
                    index={index}
                    control={control}
                    register={register}
                    remove={() => removeMethod(index)}
                    dirtyFields={dirtyFields.methods?.[index]}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'constructors' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-text-primary">Constructors ({constructors.length})</h2>
                <button
                  type="button"
                  onClick={() => appendConstructor({ signature: `new ${className || 'Constructor'}()`, description: '', parameters: [], examples: [] })}
                  className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors"
                >
                  <Plus size={16} /> Add Constructor
                </button>
              </div>

              <div className="space-y-6">
                {constructors.map((field, index) => (
                  <MethodEditor
                    key={field.id}
                    index={index}
                    control={control}
                    register={register}
                    remove={() => removeConstructor(index)}
                    isConstructor
                    dirtyFields={dirtyFields.constructors?.[index]}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'fields' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-text-primary">Fields ({classFields.length})</h2>
                <button
                  type="button"
                  onClick={() => appendField({ name: 'newField', type: 'Object', description: '' })}
                  className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors"
                >
                  <Plus size={16} /> Add Field
                </button>
              </div>

              <div className="space-y-4">
                {classFields.map((field, index) => (
                  <FieldEditor
                    key={field.id}
                    index={index}
                    register={register}
                    remove={() => removeField(index)}
                    dirtyFields={dirtyFields.fields?.[index]}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
      </form>
    </>
  );
}
