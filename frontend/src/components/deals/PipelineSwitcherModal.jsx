import React from 'react';

export default function PipelineSwitcherModal({ isOpen, onClose, currentPipeline, onSelectPipeline }) {
  if (!isOpen) return null;

  const pipelines = [
    { id: 'primary', name: 'Primary Pipeline', count: '12 Deals', desc: 'Standard B2B sales cycle' },
    { id: 'enterprise', name: 'Enterprise Key Accounts', count: '5 Deals', desc: 'High-value multi-month deals' },
    { id: 'renewals', name: 'SaaS Renewals & Up-sells', count: '18 Deals', desc: 'Customer retention pipeline' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-start pt-16 pl-44 bg-black/30 backdrop-blur-2xs" onClick={onClose}>
      <div 
        className="w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 dark:border-slate-800">
          <span className="font-extrabold uppercase tracking-wider text-[10px] text-slate-400">Select Active Pipeline</span>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold">✕</button>
        </div>

        <div className="space-y-2">
          {pipelines.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                onSelectPipeline(p.name);
                onClose();
              }}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                currentPipeline === p.name
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-500/80 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs">{p.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{p.count}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-normal mt-1">{p.desc}</p>
            </div>
          ))}
        </div>

        <button 
          onClick={() => { alert('Sub-pipeline creator ready!'); onClose(); }}
          className="mt-3 w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-center transition-colors"
        >
          + Create Custom Sub-Pipeline
        </button>
      </div>
    </div>
  );
}