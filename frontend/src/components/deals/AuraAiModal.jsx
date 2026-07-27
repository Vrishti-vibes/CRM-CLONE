import React, { useState } from 'react';
import { analyzePipelineWithAI } from '../../services/aiServices';

export default function AuraAiModal({ isOpen, onClose }) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const data = await analyzePipelineWithAI(prompt);
      setResponse(data.analysis);
    } catch (err) {
      setResponse('Failed to fetch AI analysis. Ensure backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-slate-800 dark:text-white">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2">
            ✨ Aura AI Assistant
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Aura AI about stage conversion rates, revenue pipeline, or follow-ups..."
            className="w-full h-24 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:border-sky-500"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded border border-slate-300 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="px-4 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Generate Insight'}
            </button>
          </div>
        </form>

        {response && (
          <div className="mt-4 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed whitespace-pre-line">
            {response}
          </div>
        )}
      </div>
    </div>
  );
}