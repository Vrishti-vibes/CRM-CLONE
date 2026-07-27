import React from 'react';

export default function CalendarPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Calendar & Schedules</h2>
          <p className="text-xs text-slate-400 mt-1">View upcoming deal reviews, client calls, and team syncs.</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 transition-colors">
          + Schedule Event
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
        <p className="text-sm text-slate-300 font-medium">Calendar view is synchronized with active tasks and follow-ups.</p>
      </div>
    </div>
  );
}