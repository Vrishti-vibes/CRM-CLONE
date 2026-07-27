import React, { useState } from 'react';
import { FiX, FiFileText, FiSave } from 'react-icons/fi';

export default function NotebookWidget({ isOpen, onClose }) {
  const [note, setNote] = useState(localStorage.getItem('crm_scratchpad') || '');

  if (!isOpen) return null;

  const handleSave = (val) => {
    setNote(val);
    localStorage.setItem('crm_scratchpad', val);
  };

  return (
    <div className="fixed bottom-16 right-6 z-50 w-80 h-96 bg-white dark:bg-darkbg-card rounded-2xl shadow-2xl border border-slate-200 dark:border-darkbg-border flex flex-col animate-in slide-in-from-bottom duration-200">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-darkbg-border flex items-center justify-between">
        <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
          <FiFileText className="text-indigo-600" /> Notebook
        </h4>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded">
          <FiX className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 p-3">
        <textarea
          value={note}
          onChange={(e) => handleSave(e.target.value)}
          placeholder="Type notes or paste snippets here..."
          className="w-full h-full resize-none bg-transparent text-xs text-slate-800 dark:text-slate-200 focus:outline-none font-medium"
        />
      </div>
      <div className="px-3 py-2 border-t border-slate-100 dark:border-darkbg-border flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1"><FiSave /> Auto-saved</span>
      </div>
    </div>
  );
}