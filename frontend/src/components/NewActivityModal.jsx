import React, { useState } from 'react';
import { 
  FiX, FiCalendar, FiCheckSquare, FiPhoneCall, 
  FiClock, FiUser, FiMapPin, FiAlignLeft, FiCheckCircle 
} from 'react-icons/fi';

export default function NewActivityModal({ isOpen, onClose, onAddActivity }) {
  const [activityType, setActivityType] = useState('Task'); // 'Task' | 'Event' | 'Call'
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    contact: '',
    location: '',
    duration: '15 mins',
    priority: 'Medium',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const newActivity = {
      id: Date.now(),
      type: activityType,
      title: formData.title,
      date: formData.date || new Date().toLocaleDateString(),
      time: formData.time || '10:00 AM',
      contact: formData.contact || 'N/A',
      location: formData.location || 'Online',
      duration: formData.duration,
      priority: formData.priority,
      notes: formData.notes,
      status: 'Open'
    };

    if (onAddActivity) onAddActivity(newActivity);
    setFormData({
      title: '',
      date: '',
      time: '',
      contact: '',
      location: '',
      duration: '15 mins',
      priority: 'Medium',
      notes: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white dark:bg-darkbg-card border border-slate-200/80 dark:border-darkbg-border rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header with Type Selector */}
        <div className="p-5 border-b border-slate-100 dark:border-darkbg-border bg-slate-50/50 dark:bg-darkbg/50 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white">Schedule New Activity</h3>
            <button 
              onClick={onClose} 
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-darkbg transition-all"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Type Toggle Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-darkbg p-1 rounded-xl">
            {[
              { id: 'Task', label: 'Task', icon: FiCheckSquare },
              { id: 'Event', label: 'Event', icon: FiCalendar },
              { id: 'Call', label: 'Call', icon: FiPhoneCall },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivityType(tab.id)}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                    activityType === tab.id
                      ? 'bg-gradient-to-r from-royal-600 to-indigo-600 text-white shadow-royal'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">
              {activityType} Subject / Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder={`e.g., ${activityType === 'Call' ? 'Follow up on proposal' : activityType === 'Event' ? 'Client Strategy Demo' : 'Review Q3 Contract'}`}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Date</label>
              <div className="relative">
                <FiCalendar className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Time</label>
              <div className="relative">
                <FiClock className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            </div>
          </div>

          {/* Conditional Fields based on Activity Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Related Contact</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ted Watson"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            </div>

            {activityType === 'Event' ? (
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Location / Link</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Google Meet or Office Room"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              </div>
            ) : activityType === 'Call' ? (
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Call Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="15 mins">15 mins</option>
                  <option value="30 mins">30 mins</option>
                  <option value="45 mins">45 mins</option>
                  <option value="60 mins">1 hour</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1.5">Notes & Details</label>
            <div className="relative">
              <FiAlignLeft className="absolute left-3.5 top-3 text-slate-400" />
              <textarea
                rows="3"
                placeholder="Add meeting agenda or call notes..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-darkbg-border bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
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
              <FiCheckCircle className="w-4 h-4" /> Save {activityType}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}