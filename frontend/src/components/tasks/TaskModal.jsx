import React, { useEffect, useState } from 'react';
import { FiAlertCircle, FiX } from 'react-icons/fi';

const emptyForm = {
  title: '',
  description: '',
  type: 'TASK',
  priority: 'MEDIUM',
  due_date: '',
};

export default function TaskModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      title: initialData?.title || '',
      description: initialData?.description || '',
      type: initialData?.type || 'TASK',
      priority: initialData?.priority || 'MEDIUM',
      due_date: initialData?.due_date ? initialData.due_date.slice(0, 16) : '',
    });
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        due_date: formData.due_date || null,
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save activity.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <h2 className="text-lg font-bold text-white">
            {initialData ? 'Edit Activity' : 'Schedule Activity'}
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:text-white" aria-label="Close">
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-400">
              <FiAlertCircle className="shrink-0" />
              {error}
            </div>
          )}

          <label className="block text-xs font-semibold text-slate-300">Title
            <input name="title" required value={formData.title} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-brand-500 focus:outline-none" />
          </label>

          <label className="block text-xs font-semibold text-slate-300">Description
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1.5 w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-brand-500 focus:outline-none" />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block text-xs font-semibold text-slate-300">Type
              <select name="type" value={formData.type} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-brand-500 focus:outline-none">
                <option value="TASK">Task</option>
                <option value="CALL">Call</option>
                <option value="MEETING">Meeting</option>
              </select>
            </label>
            <label className="block text-xs font-semibold text-slate-300">Priority
              <select name="priority" value={formData.priority} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-brand-500 focus:outline-none">
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </label>
          </div>

          <label className="block text-xs font-semibold text-slate-300">Due date
            <input type="datetime-local" name="due_date" value={formData.due_date} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-brand-500 focus:outline-none" />
          </label>

          <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
            <button type="button" onClick={onClose} className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700">Cancel</button>
            <button type="submit" disabled={submitting} className="rounded-xl bg-brand-600 px-5 py-2 text-xs font-semibold text-white hover:bg-brand-500 disabled:opacity-50">
              {submitting ? 'Saving...' : initialData ? 'Update Activity' : 'Save Activity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
