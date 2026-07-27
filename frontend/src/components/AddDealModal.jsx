import React, { useState } from 'react';
import { 
  FiX, FiDollarSign, FiUser, FiBriefcase, 
  FiCalendar, FiLayers, FiTag, FiCheckCircle 
} from 'react-icons/fi';

export default function AddDealModal({ isOpen, onClose, onAddDeal }) {
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    stage: 'Lead',
    contact: '',
    company: '',
    expectedCloseDate: '',
    priority: 'Medium'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.value) return;

    const newDeal = {
      id: Date.now(),
      title: formData.title,
      value: parseFloat(formData.value) || 0,
      stage: formData.stage,
      contact: formData.contact || 'N/A',
      company: formData.company || 'N/A',
      expectedCloseDate: formData.expectedCloseDate || 'Not set',
      priority: formData.priority,
      createdAt: new Date().toLocaleDateString()
    };

    if (onAddDeal) onAddDeal(newDeal);
    setFormData({
      title: '',
      value: '',
      stage: 'Lead',
      contact: '',
      company: '',
      expectedCloseDate: '',
      priority: 'Medium'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white dark:bg-darkbg-card border border-slate-200/80 dark:border-darkbg-border rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-darkbg-border bg-slate-50/50 dark:bg-darkbg/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-xl text-indigo-600 dark:text-indigo-400">
              <FiDollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">Create New Deal</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Add a sales opportunity to your pipeline</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-darkbg transition-all"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">
              Deal Title <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <FiTag className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g., Enterprise Software Renewal"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">
                Deal Value ($) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="number"
                  required
                  placeholder="25000"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Pipeline Stage</label>
              <div className="relative">
                <FiLayers className="absolute left-3.5 top-3 text-slate-400" />
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="Lead">Lead</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Primary Contact</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Alex Morgan"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Company</label>
              <div className="relative">
                <FiBriefcase className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Expected Close Date</label>
              <div className="relative">
                <FiCalendar className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="date"
                  value={formData.expectedCloseDate}
                  onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-darkbg-border mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl font-extrabold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkbg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-royal-600 to-indigo-600 hover:from-royal-700 hover:to-indigo-700 text-white font-extrabold rounded-xl shadow-royal transition-all flex items-center gap-2"
            >
              <FiCheckCircle className="w-4 h-4" /> Save Deal
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}