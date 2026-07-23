import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dealService } from '../services/dealService';
import { noteService } from '../services/noteService';
import { activityService } from '../services/activityService';
import NoteSection from '../components/deals/NoteSection';
import ActivityTimeline from '../components/deals/ActivityTimeline';
import {
  FiArrowLeft,
  FiTrendingUp,
  FiDollarSign,
  FiPieChart,
  FiCalendar,
  FiCheckCircle,
} from 'react-icons/fi';

const STAGES = [
  'QUALIFICATION',
  'NEEDS_ANALYSIS',
  'PROPOSAL',
  'NEGOTIATION',
  'CLOSED_WON',
  'CLOSED_LOST',
];

export default function DealDetail() {
  const { id } = useParams();
  const [deal, setDeal] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDealData = useCallback(async () => {
    setLoading(true);
    try {
      const [dealRes, notesRes, actRes] = await Promise.all([
        dealService.getDeals(),
        noteService.getDealNotes(id),
        activityService.getDealActivities(id),
      ]);
      const currentDeal = dealRes.items.find((d) => d.id === parseInt(id, 10));
      setDeal(currentDeal || null);
      setNotes(notesRes.items);
      setActivities(actRes.items);
    } catch (err) {
      console.error('Failed to load deal details:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDealData();
  }, [fetchDealData]);

  const handleStageChange = async (newStage) => {
    if (!deal || deal.stage === newStage) return;
    try {
      await dealService.updateDealStage(deal.id, newStage);
      fetchDealData();
    } catch (err) {
      console.error('Failed to update stage:', err);
    }
  };

  const handleCreateNote = async (content) => {
    await noteService.createDealNote(id, content);
    fetchDealData();
  };

  const handleDeleteNote = async (noteId) => {
    await noteService.deleteNote(noteId);
    fetchDealData();
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center text-slate-400 font-medium">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Deal Opportunity Details...</span>
        </div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-slate-400">Deal record not found.</p>
        <Link
          to="/deals"
          className="inline-flex items-center gap-2 text-xs text-brand-400 hover:underline font-semibold"
        >
          <FiArrowLeft />
          <span>Back to Deals Pipeline</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div>
        <Link
          to="/deals"
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors mb-4"
        >
          <FiArrowLeft />
          <span>Back to Pipeline Board</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-400">
              <FiTrendingUp />
              <span>Deal Opportunity #{deal.id}</span>
            </div>
            <h1 className="text-2xl font-bold text-white">{deal.title}</h1>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Value</span>
              <span className="text-xl font-black text-emerald-400 flex items-center">
                <FiDollarSign className="w-4 h-4" />
                {deal.amount.toLocaleString()}
              </span>
            </div>
            <div className="border-l border-slate-800 pl-6">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Win Probability</span>
              <span className="text-base font-bold text-slate-200 flex items-center gap-1 mt-0.5">
                <FiPieChart className="w-4 h-4 text-brand-400" />
                {deal.probability}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Progress Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Pipeline Progress Stage
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {STAGES.map((s) => {
            const isActive = deal.stage === s;
            return (
              <button
                key={s}
                onClick={() => handleStageChange(s)}
                className={`py-2.5 px-3 rounded-xl text-[11px] font-bold border transition-all text-center flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-600/30'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {isActive && <FiCheckCircle className="w-3.5 h-3.5 shrink-0" />}
                <span className="truncate">{s.replace('_', ' ')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <NoteSection
            notes={notes}
            onCreateNote={handleCreateNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Deal Overview
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Close Date:</span>
                <span className="text-slate-200 font-semibold flex items-center gap-1">
                  <FiCalendar className="w-3 h-3 text-brand-400" />
                  {deal.expected_close_date || 'Not set'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Current Stage:</span>
                <span className="text-brand-400 font-bold">{deal.stage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Record Created:</span>
                <span className="text-slate-300">
                  {new Date(deal.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <ActivityTimeline activities={activities} />
        </div>
      </div>
    </div>
  );
}