import React from 'react';
import { FiClock, FiActivity, FiTag, FiFileText, FiPlusCircle } from 'react-icons/fi';

export default function ActivityTimeline({ activities }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'STAGE_CHANGE':
        return <FiTag className="w-3.5 h-3.5 text-amber-400" />;
      case 'NOTE_ADDED':
        return <FiFileText className="w-3.5 h-3.5 text-sky-400" />;
      default:
        return <FiPlusCircle className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
      <div className="flex items-center gap-2 text-white font-bold text-base">
        <FiActivity className="text-emerald-500" />
        <h3>Audit Timeline</h3>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-center py-6 text-xs text-slate-500">
            No activity history available.
          </p>
        ) : (
          activities.map((act) => (
            <div key={act.id} className="flex items-start gap-3 text-xs">
              <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                {getActivityIcon(act.activity_type)}
              </div>
              <div className="flex-1 min-w-0 border-b border-slate-800/80 pb-3">
                <p className="font-semibold text-slate-200">{act.title}</p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <FiClock className="w-3 h-3" />
                  <span>{new Date(act.created_at).toLocaleString()}</span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}