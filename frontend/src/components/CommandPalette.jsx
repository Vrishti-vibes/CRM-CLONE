import React, { useState, useEffect, useRef } from 'react';
import { 
  FiSearch, FiDollarSign, FiUser, FiBriefcase, 
  FiPlus, FiPieChart, FiCheckSquare, FiMoon, FiSun, FiX, FiArrowRight 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function CommandPalette({ isOpen, onClose, onOpenDealModal, onOpenActivityModal }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Search Items Registry
  const searchItems = [
    // Quick Actions
    {
      id: 'act-1',
      type: 'Action',
      title: 'Create New Deal',
      category: 'Quick Actions',
      icon: FiPlus,
      action: () => { onOpenDealModal?.(); onClose(); }
    },
    {
      id: 'act-2',
      type: 'Action',
      title: 'Schedule New Activity / Task',
      category: 'Quick Actions',
      icon: FiCheckSquare,
      action: () => { onOpenActivityModal?.(); onClose(); }
    },
    
    // Navigation
    {
      id: 'nav-1',
      type: 'Navigation',
      title: 'Go to Reports & Analytics Dashboard',
      category: 'Navigation',
      icon: FiPieChart,
      action: () => { navigate('/reports'); onClose(); }
    },
    {
      id: 'nav-2',
      type: 'Navigation',
      title: 'Go to Contacts Directory',
      category: 'Navigation',
      icon: FiUser,
      action: () => { navigate('/contacts'); onClose(); }
    },
    {
      id: 'nav-3',
      type: 'Navigation',
      title: 'Go to Enterprise Companies',
      category: 'Navigation',
      icon: FiBriefcase,
      action: () => { navigate('/companies'); onClose(); }
    },

    // Sample Deals
    {
      id: 'deal-1',
      type: 'Deal',
      title: 'Enterprise Cyberdyne Security Suite',
      subtitle: '$120,000 • Negotiation Stage',
      category: 'Deals',
      icon: FiDollarSign,
      action: () => { navigate('/deals'); onClose(); }
    },
    {
      id: 'deal-2',
      type: 'Deal',
      title: 'Nexus Cloud Fleet Renewal',
      subtitle: '$85,000 • Proposal Sent Stage',
      category: 'Deals',
      icon: FiDollarSign,
      action: () => { navigate('/deals'); onClose(); }
    },

    // Sample Contacts
    {
      id: 'cnt-1',
      type: 'Contact',
      title: 'Sarah Connor (Cyberdyne Systems)',
      subtitle: 'sarah.c@cyberdyne.io',
      category: 'Contacts',
      icon: FiUser,
      action: () => { navigate('/contacts'); onClose(); }
    },
    {
      id: 'cnt-2',
      type: 'Contact',
      title: 'Alexander Wright (Nexus Global)',
      subtitle: 'a.wright@nexuscorp.com',
      category: 'Contacts',
      icon: FiUser,
      action: () => { navigate('/contacts'); onClose(); }
    },
  ];

  // Filter items based on query
  const filteredItems = searchItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard Navigation inside Command Palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-darkbg-card border border-slate-200/80 dark:border-darkbg-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-darkbg-border bg-slate-50/50 dark:bg-darkbg/50">
          <FiSearch className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, search deals, contacts, or actions..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-slate-900 dark:text-white font-semibold text-sm focus:outline-none placeholder:text-slate-400"
          />
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-darkbg transition-all ml-2"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-100/50 dark:divide-darkbg-border/30">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No matching records or commands found for "<strong className="text-slate-600 dark:text-slate-200">{query}</strong>".
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all text-xs ${
                    isSelected 
                      ? 'bg-gradient-to-r from-royal-600 to-indigo-600 text-white shadow-royal' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-darkbg-hover'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="font-extrabold truncate">{item.title}</p>
                      {item.subtitle && (
                        <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-darkbg text-slate-400'
                    }`}>
                      {item.category}
                    </span>
                    <FiArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Keyboard Hints */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-darkbg/80 border-t border-slate-100 dark:border-darkbg-border text-[11px] text-slate-400 font-semibold">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-darkbg-border rounded text-[10px] text-slate-700 dark:text-slate-300">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-darkbg-border rounded text-[10px] text-slate-700 dark:text-slate-300">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-darkbg-border rounded text-[10px] text-slate-700 dark:text-slate-300">↵</kbd>
              Select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-darkbg-border rounded text-[10px] text-slate-700 dark:text-slate-300">ESC</kbd>
            Close
          </span>
        </div>

      </div>
    </div>
  );
}