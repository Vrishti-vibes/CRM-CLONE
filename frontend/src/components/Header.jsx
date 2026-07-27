import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import AddDealModal from './AddDealModal';
import NewActivityModal from './NewActivityModal';

export default function Header() {
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const handleAddDeal = (dealData) => {
    console.log('New Deal Added:', dealData);
    // TODO: Send to backend API or update state
  };

  const handleAddActivity = (activityData) => {
    console.log('New Activity Scheduled:', activityData);
    // TODO: Send to backend API or update state
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {/* Add Deal Button */}
        <button
          onClick={() => setIsDealModalOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-royal-600 to-indigo-600 hover:from-royal-700 hover:to-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-royal transition-all flex items-center gap-1.5"
        >
          <FiPlus className="w-4 h-4" /> Add Deal
        </button>

        {/* New Activity Button */}
        <button
          onClick={() => setIsActivityModalOpen(true)}
          className="px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-darkbg-card hover:bg-slate-50 dark:hover:bg-darkbg-hover text-slate-800 dark:text-slate-100 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5"
        >
          <FiPlus className="w-4 h-4" /> New Activity
        </button>
      </div>

      {/* Modals */}
      <AddDealModal
        isOpen={isDealModalOpen}
        onClose={() => setIsDealModalOpen(false)}
        onAddDeal={handleAddDeal}
      />

      <NewActivityModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        onAddActivity={handleAddActivity}
      />
    </>
  );
}