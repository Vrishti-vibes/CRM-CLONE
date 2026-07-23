import React, { useEffect, useState, useCallback } from 'react';
import { reportService } from '../services/reportService';
import MetricsOverview from '../components/reports/MetricsOverview';
import RevenueForecastChart from '../components/reports/RevenueForecastChart';
import WinLossChart from '../components/reports/WinLossChart';
import {
  FiBarChart2,
  FiDownload,
  FiUserCheck,
} from 'react-icons/fi';

export default function Reports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('90d');

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await reportService.getAnalytics({ timeframe });
      setData(res);
    } catch (err) {
      console.error('Failed to load reports analytics:', err);
    } finally {
      setLoading(false);
    }
  }, [timeframe]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleExportCSV = () => {
    if (!data) return;
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Metric,Value\n' +
      `Total Projected Revenue,${data.overview.total_projected_revenue}\n` +
      `Closed Won Revenue,${data.overview.closed_won_revenue}\n` +
      `Win Rate,${data.overview.win_rate_percentage}%\n` +
      `Avg Deal Size,${data.overview.avg_deal_size}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CRM_Executive_Report_${timeframe}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <FiBarChart2 className="text-brand-500" />
            <span>Executive Reports & Analytics</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Real-time pipeline metrics, revenue forecasts, and team conversion performance
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Timeframe Selector */}
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-500"
          >
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="YTD">Year To Date (YTD)</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          >
            <FiDownload className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center text-slate-400 font-medium">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Calculating Executive Analytics...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Top KPI Grid */}
          <MetricsOverview overview={data?.overview} />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RevenueForecastChart data={data?.monthly_forecast} />
            <WinLossChart stageDistribution={data?.stage_distribution} />
          </div>

          {/* Rep Performance Directory */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <FiUserCheck className="text-brand-500" />
              <h3>Sales Representative Leaderboard</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-slate-300 text-xs">
                <thead className="bg-slate-800/60 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Sales Representative</th>
                    <th className="p-4">Assigned Deals</th>
                    <th className="p-4">Total Won Value</th>
                    <th className="p-4">Conversion Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data?.rep_performance.map((rep, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-semibold text-white">{rep.rep_name}</td>
                      <td className="p-4 text-slate-300">{rep.deals_count} Deals</td>
                      <td className="p-4 text-emerald-400 font-bold">
                        ${rep.total_won_value.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                          {rep.conversion_rate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}