import React from 'react';
import { FiClock, FiActivity } from 'react-icons/fi';

export default function RecentActivityWidget({ activities }) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <FiActivity className="text-brand-500 w-5 h-5" />
          <h3 className="text-base font-bold text-white">Activity Feed</h3>
        </div>
        <span className="text-xs text-slate-400">Live Updates</span>
      </div>

      <div className="space-y-4">
        {activities.map((act) => (
          <div key={act.id} className="flex items-start gap-3 border-b border-slate-800/60 pb-3.5 last:border-0 last:pb-0">
            <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 shrink-0"></div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-200 truncate">{act.title}</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                <span>By {act.user}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FiClock className="w-3 h-3" />
                  {act.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}