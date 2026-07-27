import React, { useState } from 'react';
import { FiX, FiFilter, FiCheck } from 'react-icons/fi';

export default function DealsFilterDrawer({ isOpen, onClose, onApplyFilter }) {
  const [selectedFilters, setSelectedFilters] = useState({
    touchedRecords: false,
    untouchedRecords: false,
    dealOwner: '',
    minAmount: '',
  });

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilter(selectedFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="w-96 bg-white dark:bg-darkbg-card h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-darkbg-border animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-darkbg-border flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FiFilter className="text-indigo-600" /> Filter Sales Pipeline
          </h3>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Filters List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.touchedRecords}
              onChange={(e) => setSelectedFilters({ ...selectedFilters, touchedRecords: e.target.checked })}
              className="rounded text-indigo-600 w-4 h-4"
            />
            <span>Touched Records</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.untouchedRecords}
              onChange={(e) => setSelectedFilters({ ...selectedFilters, untouchedRecords: e.target.checked })}
              className="rounded text-indigo-600 w-4 h-4"
            />
            <span>Untouched Records</span>
          </label>

          <div>
            <label className="block uppercase text-[10px] text-slate-400 font-extrabold mb-1">Deal Owner</label>
            <input
              type="text"
              placeholder="e.g., Ted Watson"
              value={selectedFilters.dealOwner}
              onChange={(e) => setSelectedFilters({ ...selectedFilters, dealOwner: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border text-slate-900 dark:text-white text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block uppercase text-[10px] text-slate-400 font-extrabold mb-1">Minimum Amount (₹)</label>
            <input
              type="number"
              placeholder="0"
              value={selectedFilters.minAmount}
              onChange={(e) => setSelectedFilters({ ...selectedFilters, minAmount: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border text-slate-900 dark:text-white text-xs font-semibold"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-darkbg-border flex gap-3">
          <button
            onClick={handleApply}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md"
          >
            <FiCheck /> Apply Filter
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 dark:bg-darkbg text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}