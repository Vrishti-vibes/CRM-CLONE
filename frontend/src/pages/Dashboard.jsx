import React from 'react';
import { FiTrendingUp, FiDollarSign, FiUsers, FiCheckCircle, FiArrowUpRight, FiPieChart } from 'react-icons/fi';

export default function Dashboard() {
  const metrics = [
    { title: 'Total Revenue', value: '₹2,45,671', change: '+14.2%', icon: FiDollarSign, color: 'from-emerald-500 to-teal-600' },
    { title: 'Active Deals', value: '18 Deals', change: '+4 this week', icon: FiTrendingUp, color: 'from-indigo-500 to-violet-600' },
    { title: 'Conversion Rate', value: '64.8%', change: '+3.1%', icon: FiCheckCircle, color: 'from-amber-500 to-orange-600' },
    { title: 'Total Contacts', value: '1,240', change: '+28 new', icon: FiUsers, color: 'from-sky-500 to-blue-600' },
  ];

  const pipelineStages = [
    { stage: 'Qualification', count: 4, value: '₹45,000', percentage: 80 },
    { stage: 'Needs Analysis', count: 3, value: '₹70,000', percentage: 60 },
    { stage: 'Proposal Quote', count: 5, value: '₹1,20,000', percentage: 45 },
    { stage: 'Negotiation', count: 2, value: '₹85,000', percentage: 30 },
    { stage: 'Closed Won', count: 4, value: '₹2,45,671', percentage: 100 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <FiPieChart className="text-indigo-600 dark:text-indigo-400" /> Executive Analytics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Real-time revenue performance and sales pipeline health</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 shadow-xs">
            This Month (July 2026) ▼
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{m.title}</p>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">{m.value}</h3>
                </div>
                <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${m.color} text-white shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 gap-1">
                <FiArrowUpRight /> {m.change} <span className="text-slate-400 font-normal">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Analytics Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Distribution */}
        <div className="lg:col-span-2 p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Pipeline Health & Breakdown
          </h3>
          <div className="space-y-4">
            {pipelineStages.map((stg, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">{stg.stage} ({stg.count})</span>
                  <span className="text-slate-900 dark:text-white font-bold">{stg.value}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${stg.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Deals */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Top Active Opportunities
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Website Development</p>
                  <p className="text-[10px] text-slate-400">Ted Watson • Needs Analysis</p>
                </div>
                <span className="font-extrabold text-indigo-600 dark:text-indigo-400">₹70,000</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Zylker Annual Subscription</p>
                  <p className="text-[10px] text-slate-400">Zylker Tech • Qualification</p>
                </div>
                <span className="font-extrabold text-indigo-600 dark:text-indigo-400">₹5,671</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <a href="/deals" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              View All Pipeline Deals →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}