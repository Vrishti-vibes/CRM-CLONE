import React from 'react';
import { useCRM } from '../../context/CRMContext';

export default function PipelineDrawer({ isOpen, onClose }) {
  const { activePipeline, setActivePipeline } = useCRM();

  if (!isOpen) return null;

  const pipelines = ['Primary Pipeline', 'Enterprise Sales', 'Inbound Leads', 'Partner Network'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-start bg-black/40 backdrop-blur-xs pt-16 pl-16" onClick={onClose}>
      <div className="w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 text-xs" onClick={e => e.stopPropagation()}>
        <div className="font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px] mb-3">
          Select Sales Pipeline
        </div>

        <div className="space-y-1.5">
          {pipelines.map(pipe => (
            <div 
              key={pipe}
              onClick={() => { setActivePipeline(pipe); onClose(); }}
              className={`p-2.5 rounded-xl font-bold cursor-pointer transition-all flex justify-between items-center ${
                activePipeline === pipe 
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>💼 {pipe}</span>
              {activePipeline === pipe && <span className="text-xs">✓</span>}
            </div>
          ))}
        </div>

        <button 
          onClick={() => { alert('Sub-Pipeline Creator opened!'); onClose(); }}
          className="mt-4 w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-center transition-colors"
        >
          + Custom Sub-Pipeline
        </button>
      </div>
    </div>
  );
}