import React from 'react';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';

export default function StatCard({ title, value, change, isPositive }) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div
          className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
            isPositive
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}
        >
          {isPositive ? (
            <FiArrowUpRight className="w-3.5 h-3.5" />
          ) : (
            <FiArrowDownRight className="w-3.5 h-3.5" />
          )}
          <span>{change}</span>
        </div>
      </div>
      <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
        {value}
      </div>
      <p className="text-[11px] text-slate-500 mt-2">Vs. previous 30-day period</p>
    </div>
  );
}