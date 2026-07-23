import React from 'react';

export default function WinLossChart({ stageDistribution }) {
  if (!stageDistribution || stageDistribution.length === 0) return null;

  const totalValue = stageDistribution.reduce((acc, s) => acc + s.total_value, 0) || 1;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      <div>
        <h3 className="text-base font-bold text-white">Pipeline Value Distribution</h3>
        <p className="text-slate-400 text-xs mt-0.5">
          Proportional monetary value across active deal stages
        </p>
      </div>

      <div className="space-y-3.5">
        {stageDistribution.map((item, idx) => {
          const percentage = Math.round((item.total_value / totalValue) * 100);
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-200">{item.stage}</span>
                <span className="text-slate-400">
                  {item.count} deals (${item.total_value.toLocaleString()})
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-600 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}