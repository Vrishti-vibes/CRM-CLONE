import React, { useState } from 'react';
import { FiX, FiBell, FiActivity, FiClock, FiSettings } from 'react-icons/fi';

export default function SignalsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('feeds');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-darkbg-card rounded-3xl shadow-2xl border border-slate-200 dark:border-darkbg-border overflow-hidden flex flex-col h-[500px]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-darkbg-border flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FiBell className="text-indigo-600" /> Notifications & Signals Hub
          </h3>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-darkbg-border px-6 gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('feeds')}
            className={`py-3 border-b-2 transition-all ${activeTab === 'feeds' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
          >
            Feeds
          </button>
          <button
            onClick={() => setActiveTab('reminders')}
            className={`py-3 border-b-2 transition-all ${activeTab === 'reminders' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
          >
            Reminders
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`py-3 border-b-2 transition-all ${activeTab === 'system' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
          >
            System Notifications
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 text-2xl shadow-inner">
            <FiActivity />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">You don't have any {activeTab} right now.</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Get notified whenever your team members mention you or update records you follow.
          </p>
        </div>

        {/* Footer Config */}
        <div className="p-4 border-t border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg flex justify-between items-center">
          <span className="text-[11px] text-slate-400">Signals tracking active</span>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-sm">
            <FiSettings className="w-3.5 h-3.5" /> Configure
          </button>
        </div>
      </div>
    </div>
  );
}