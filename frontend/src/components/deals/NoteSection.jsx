import React, { useState } from 'react';
import { FiMessageSquare, FiSend, FiTrash2 } from 'react-icons/fi';

export default function NoteSection({ notes, onCreateNote, onDeleteNote }) {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      await onCreateNote(content);
      setContent('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center gap-2 text-white font-bold text-base">
        <FiMessageSquare className="text-brand-500" />
        <h3>Notes & Discussion</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add internal deal notes, call takeaways, or customer feedback..."
          className="w-full p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-brand-500 transition-colors resize-none placeholder-slate-500"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all disabled:opacity-40"
          >
            <FiSend className="w-3.5 h-3.5" />
            <span>{submitting ? 'Posting...' : 'Post Note'}</span>
          </button>
        </div>
      </form>

      <div className="space-y-3 pt-2 border-t border-slate-800">
        {notes.length === 0 ? (
          <p className="text-center py-6 text-xs text-slate-500 font-medium">
            No notes logged for this deal yet.
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-start justify-between gap-4 group"
            >
              <div className="space-y-1 min-w-0">
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>
                <p className="text-[10px] text-slate-400">
                  {new Date(note.created_at).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => onDeleteNote(note.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition-all"
                title="Delete Note"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}