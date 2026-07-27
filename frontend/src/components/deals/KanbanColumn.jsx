import React from 'react';

export default function KanbanColumn({ column, onDragStart, onDragOver, onDrop, onAddDeal }) {
  const totalSum = column.deals.reduce((sum, d) => {
    const val = parseFloat(d.amount.replace(/[^0-9.-]+/g, "")) || 0;
    return sum + val;
  }, 0);

  const formattedSum = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(totalSum);

  return (
    <div 
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
      className="w-72 shrink-0 bg-slate-200/50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl flex flex-col max-h-full min-h-[550px]"
    >
      {/* Column Header */}
      <div className={`p-3.5 border-t-4 ${column.borderColor || 'border-indigo-500'} bg-white dark:bg-slate-900 rounded-t-xl border-b border-slate-200/80 dark:border-slate-800 shadow-xs`}>
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
            {column.stageTitle}
          </h4>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
            {formattedSum}
          </span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1 font-medium">
          {column.deals.length} {column.deals.length === 1 ? 'Opportunity' : 'Opportunities'}
        </div>
      </div>

      {/* Cards List */}
      <div className="p-2.5 overflow-y-auto space-y-2.5 flex-1">
        {column.deals.length === 0 ? (
          <div className="h-32 border border-dashed border-slate-300 dark:border-slate-800 rounded-lg flex items-center justify-center text-[11px] text-slate-400 font-medium">
            Drop deals here
          </div>
        ) : (
          column.deals.map((deal) => (
            <div
              key={deal.id}
              draggable
              onDragStart={(e) => onDragStart(e, deal.id, column.id)}
              className="p-3.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-indigo-500/80 dark:hover:border-indigo-500/80 cursor-grab active:cursor-grabbing transition-all group hover:shadow-md"
            >
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {deal.name}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">{deal.company}</p>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold">
                <span className="text-indigo-600 dark:text-indigo-400">{deal.amount}</span>
                <span className="text-[10px] text-slate-400 font-normal">{deal.date}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Action */}
      <div className="p-2 border-t border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 rounded-b-xl">
        <button 
          onClick={() => onAddDeal(column.id)}
          className="w-full py-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg transition-colors text-left pl-2 flex items-center gap-1 cursor-pointer"
        >
          <span>+ Add Deal</span>
        </button>
      </div>
    </div>
  );
}