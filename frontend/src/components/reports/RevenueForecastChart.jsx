import React from 'react';

export default function RevenueForecastChart({ data }) {
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.pipeline_amount), 1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">Monthly Revenue Forecast</h3>
          <p className="text-slate-400 text-xs mt-0.5">
            Comparison between Closed Won and Active Pipeline Projection
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span>Closed Won</span>
          </div>
          <div className="flex items-center gap-1.5 text-brand-400">
            <span className="w-3 h-3 rounded-full bg-brand-500"></span>
            <span>Pipeline Goal</span>
          </div>
        </div>
      </div>

      <div className="space-y-5 pt-2">
        {data.map((item, idx) => {
          const wonPct = Math.round((item.won_amount / maxVal) * 100);
          const pipePct = Math.round((item.pipeline_amount / maxVal) * 100);

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>{item.month}</span>
                <span className="text-slate-400">
                  ${item.won_amount.toLocaleString()} / ${item.pipeline_amount.toLocaleString()}
                </span>
              </div>

              <div className="space-y-1">
                {/* Won Bar */}
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${wonPct}%` }}
                  ></div>
                </div>
                {/* Pipeline Bar */}
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all duration-500"
                    style={{ width: `${pipePct}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}