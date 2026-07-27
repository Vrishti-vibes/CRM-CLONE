import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar({ onOpenFilter, onOpenPipelineManager, currentPipeline, onAddDeal }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-30 shadow-xs w-full shrink-0">
      {/* Brand & Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2.5 pr-4 border-r border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-sm shadow-sm">
            ✨
          </div>
          <div>
            <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight block leading-none">
              Aura<span className="text-indigo-600 dark:text-indigo-400">CRM</span>
            </span>
            <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Enterprise</span>
          </div>
        </div>

        <button 
          onClick={onOpenFilter}
          className="px-2.5 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <span className="text-indigo-500 font-bold">⚡ Filter</span>
        </button>

        <button 
          onClick={onOpenPipelineManager}
          className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>{currentPipeline || 'Primary Pipeline'}</span>
          <span className="text-[10px]">▼</span>
        </button>

        <div className="relative max-w-xs w-full hidden lg:block">
          <input
            type="text"
            placeholder="Search deals, contacts... (ctrl + k)"
            className="w-full bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <span className="absolute left-2.5 top-1.5 text-slate-400 text-xs">🔍</span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span className="capitalize">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        <button
          onClick={onAddDeal}
          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm cursor-pointer"
        >
          + Add Deal
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center ml-1 ring-2 ring-indigo-500/20">
          VK
        </div>
      </div>
    </header>
  );
}