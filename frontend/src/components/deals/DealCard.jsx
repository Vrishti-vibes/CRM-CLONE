import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiDollarSign, FiClock, FiEdit2, FiTrash2, FiChevronRight } from 'react-icons/fi';

export default function DealCard({ deal, onEdit, onDelete, onDragStart }) {
  const navigate = useNavigate();

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, deal.id)}
      onClick={() => navigate(`/deals/${deal.id}`)}
      className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer group space-y-3"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold text-white group-hover:text-brand-400 transition-colors leading-snug flex items-center gap-1">
          <span>{deal.title}</span>
          <FiChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </h4>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(deal);
            }}
            className="p-1 hover:bg-slate-700 text-slate-400 hover:text-white rounded-md"
            title="Edit Deal"
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(deal.id);
            }}
            className="p-1 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-md"
            title="Delete Deal"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-700/50">
        <span className="font-extrabold text-emerald-400 flex items-center gap-0.5 text-sm">
          <FiDollarSign className="w-3.5 h-3.5" />
          {deal.amount.toLocaleString()}
        </span>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-700 text-slate-300">
          {deal.probability}% Prob
        </span>
      </div>

      {deal.expected_close_date && (
        <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-0.5">
          <FiClock className="w-3 h-3 text-slate-500" />
          <span>Close: {deal.expected_close_date}</span>
        </div>
      )}
    </div>
  );
}