import React, { useEffect, useState, useCallback } from 'react';
import { dealService } from '../services/dealService';
import KanbanColumn from '../components/deals/KanbanColumn';
import DealModal from '../components/deals/DealModal';
import { FiTrendingUp, FiPlus } from 'react-icons/fi';

const PIPELINE_STAGES = [
  { id: 'QUALIFICATION', title: 'Qualification', color: 'bg-sky-500' },
  { id: 'NEEDS_ANALYSIS', title: 'Needs Analysis', color: 'bg-indigo-500' },
  { id: 'PROPOSAL', title: 'Proposal Sent', color: 'bg-amber-500' },
  { id: 'NEGOTIATION', title: 'Negotiation', color: 'bg-purple-500' },
  { id: 'CLOSED_WON', title: 'Closed Won', color: 'bg-emerald-500' },
  { id: 'CLOSED_LOST', title: 'Closed Lost', color: 'bg-rose-500' },
];

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);

  const fetchDeals = useCallback(async () => {
    setLoading(true);
    try {
      const res = await dealService.getDeals();
      setDeals(res.items);
    } catch (err) {
      console.error('Failed to fetch deals pipeline:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const handleDragStart = (e, dealId) => {
    e.dataTransfer.setData('text/plain', dealId.toString());
  };

  const handleDropDeal = async (dealId, targetStage) => {
    // Optimistic UI update
    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: targetStage } : deal
      )
    );

    try {
      await dealService.updateDealStage(dealId, targetStage);
    } catch (err) {
      console.error('Failed to update stage on server:', err);
      fetchDeals(); // Revert on failure
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    if (editingDeal) {
      await dealService.updateDeal(editingDeal.id, formData);
    } else {
      await dealService.createDeal(formData);
    }
    fetchDeals();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this deal opportunity?')) {
      try {
        await dealService.deleteDeal(id);
        fetchDeals();
      } catch (err) {
        console.error('Failed to delete deal:', err);
      }
    }
  };

  const openCreateModal = () => {
    setEditingDeal(null);
    setModalOpen(true);
  };

  const openEditModal = (deal) => {
    setEditingDeal(deal);
    setModalOpen(true);
  };

  const totalPipelineValue = deals.reduce((acc, d) => acc + (d.amount || 0), 0);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <FiTrendingUp className="text-brand-500" />
            <span>Deals Pipeline (Kanban)</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Drag and drop deals across pipeline stages (${totalPipelineValue.toLocaleString()} Total Pipeline Value)
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-brand-600/30 transition-all self-start sm:self-auto"
        >
          <FiPlus className="w-4 h-4" />
          <span>New Deal</span>
        </button>
      </div>

      {/* Kanban Board Horizontal Scroll */}
      {loading ? (
        <div className="h-96 flex items-center justify-center text-slate-400 font-medium">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading Deals Pipeline Board...</span>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4 overflow-x-auto pb-6">
          {PIPELINE_STAGES.map((stage) => {
            const stageDeals = deals.filter((d) => d.stage === stage.id);
            return (
              <KanbanColumn
                key={stage.id}
                stage={stage}
                deals={stageDeals}
                onEditDeal={openEditModal}
                onDeleteDeal={handleDelete}
                onDragStart={handleDragStart}
                onDropDeal={handleDropDeal}
              />
            );
          })}
        </div>
      )}

      {/* Deal Modal Form */}
      <DealModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={editingDeal}
      />
    </div>
  );
}