import React from 'react';
import { FiCheckSquare, FiCalendar } from 'react-icons/fi';

export default function UpcomingTasksWidget({ tasks }) {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'HIGH':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <FiCheckSquare className="text-emerald-500 w-5 h-5" />
          <h3 className="text-base font-bold text-white">Pending Tasks</h3>
        </div>
        <span className="text-xs text-slate-400">{tasks.length} items</span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-3.5 bg-slate-800/40 border border-slate-700/40 rounded-xl flex items-center justify-between gap-3"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-200 truncate">{task.title}</p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                <FiCalendar className="w-3 h-3" />
                {task.due_date}
              </p>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getPriorityBadge(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
