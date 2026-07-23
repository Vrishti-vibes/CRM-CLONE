import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardService } from '../services/dashboardService';
import StatCard from '../components/dashboard/StatCard';
import PipelineChart from '../components/dashboard/PipelineChart';
import RecentActivityWidget from '../components/dashboard/RecentActivityWidget';
import UpcomingTasksWidget from '../components/dashboard/UpcomingTasksWidget';

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await dashboardService.getSummary();
        setData(res);
      } catch (err) {
        console.error('Failed to load dashboard summary:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center text-slate-400 font-medium">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading CRM Analytics Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-slate-900 to-slate-900 border border-brand-700/30 rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {user?.full_name}! 👋
          </h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
            Here is what's happening across your pipeline today. You have active opportunities requiring attention.
          </p>
        </div>
      </div>

      {/* Metric KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.metrics.map((metric, idx) => (
          <StatCard
            key={idx}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            isPositive={metric.is_positive}
          />
        ))}
      </div>

      {/* Main Visual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PipelineChart stages={data?.pipeline_summary || []} />
        </div>
        <div className="space-y-6">
          <RecentActivityWidget activities={data?.recent_activities || []} />
          <UpcomingTasksWidget tasks={data?.upcoming_tasks || []} />
        </div>
      </div>
    </div>
  );
}