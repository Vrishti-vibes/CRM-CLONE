import React from 'react';
import DealCard from './DealCard';

export default function KanbanColumn({
  stage,
  deals,
  onEditDeal,
  onDeleteDeal,
  onDragStart,
  onDropDeal,
}) {
  const totalValue = deals.reduce((acc, deal) => acc + (deal.amount || 0), 0);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('text/plain');
    if (dealId) {
      onDropDeal(parseInt(dealId, 10), stage.id);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex-1 min-w-[280px] bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col max-h-[calc(100vh-180px)] overflow-hidden"
    >
      {/* Column Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${stage.color}`}></span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            {stage.title}
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
            {deals.length}
          </span>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          ${totalValue.toLocaleString()}
        </span>
      </div>

      {/* Cards Scrollable Container */}
      <div className="p-3 flex-1 overflow-y-auto space-y-3 min-h-[150px]">
        {deals.length === 0 ? (
          <div className="h-28 border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-600 font-medium">
            Drag deals here
          </div>
        ) : (
          deals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              onEdit={onEditDeal}
              onDelete={onDeleteDeal}
              onDragStart={onDragStart}
            />
          ))
        )}
      </div>
    </div>
  );
}