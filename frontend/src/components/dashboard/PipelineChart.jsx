import React from 'react';

export default function PipelineChart({ stages }) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Deals Pipeline Stages</h3>
          <p className="text-slate-400 text-xs mt-0.5">Summary breakdown by active stage progression</p>
        </div>
        <span className="text-xs font-semibold text-brand-400 bg-brand-500/10 border border-brand-500/20 px-3 py-1 rounded-full">
          Active Pipeline
        </span>
      </div>

      <div className="space-y-4">
        {stages.map((stage, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">{stage.stage}</span>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">{stage.count} deals</span>
                <span className="font-bold text-white">${stage.value.toLocaleString()}</span>
              </div>
            </div>

            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div
                className={`h-full rounded-full transition-all duration-500 ${stage.color}`}
                style={{ width: `${stage.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}