import React from 'react';
import {
  FiDollarSign,
  FiTrendingUp,
  FiPieChart,
  FiAward,
  FiClock,
  FiLayers,
} from 'react-icons/fi';

export default function MetricsOverview({ overview }) {
  if (!overview) return null;

  const cards = [
    {
      title: 'Total Pipeline Value',
      value: `$${overview.total_projected_revenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'text-brand-400 bg-brand-500/10 border-brand-500/20',
    },
    {
      title: 'Closed Won Revenue',
      value: `$${overview.closed_won_revenue.toLocaleString()}`,
      icon: FiAward,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Win Rate Ratio',
      value: `${overview.win_rate_percentage}%`,
      icon: FiPieChart,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Average Deal Size',
      value: `$${overview.avg_deal_size.toLocaleString()}`,
      icon: FiTrendingUp,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Total Active Opportunities',
      value: `${overview.total_deals_count} Deals`,
      icon: FiLayers,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
    {
      title: 'Avg Sales Velocity',
      value: `${overview.avg_sales_cycle_days} Days`,
      icon: FiClock,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {card.title}
              </span>
              <span className="text-2xl font-black text-white tracking-tight">
                {card.value}
              </span>
            </div>
            <div className={`p-3 rounded-2xl border ${card.color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}