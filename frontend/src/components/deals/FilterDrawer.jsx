import React from 'react';

export default function FilterDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/40 backdrop-blur-xs">
      <div className="w-80 bg-white dark:bg-slate-900 h-full p-4 shadow-xl border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <span className="text-emerald-600">⚡</span> Filter Pipeline
            </h3>
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-base"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <p className="font-semibold text-slate-400 text-[11px] uppercase">Choose a Property</p>
            {[
              'Touched Records', 
              'Untouched Records', 
              'Record Action', 
              'Deal Owner', 
              'Deal Name', 
              'Company Name', 
              'Contact Name', 
              'Stage', 
              'Amount'
            ].map((item) => (
              <div 
                key={item} 
                className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
          <button 
            onClick={onClose} 
            className="flex-1 py-1.5 rounded bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors"
          >
            Apply Filter
          </button>
          <button 
            onClick={onClose} 
            className="px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}