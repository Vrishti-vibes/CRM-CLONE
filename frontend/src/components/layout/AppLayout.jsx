import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  FiDollarSign, 
  FiUsers, 
  FiBriefcase, 
  FiBox, 
  FiCalendar, 
  FiBarChart2, 
  FiSettings, 
  FiLogOut, 
  FiSun, 
  FiMoon, 
  FiBell, 
  FiFileText, 
  FiSearch,
  FiPlus
} from 'react-icons/fi';

export default function AppLayout({ children, onAddDeal, onOpenSignals, onOpenNotebook }) {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  const [dealTitle, setDealTitle] = useState('');
  const [dealAmount, setDealAmount] = useState('');

  const handleCreateDealSubmit = (e) => {
    e.preventDefault();
    if (!dealTitle.trim()) return;
    if (onAddDeal) {
      onAddDeal({
        title: dealTitle,
        amount: Number(dealAmount) || 0,
        contactName: 'New Contact',
        closingDate: '2026-08-15'
      }, 'qualification');
    }
    setDealTitle('');
    setDealAmount('');
    setShowAddModal(false);
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-darkbg text-slate-800 dark:text-slate-100 overflow-hidden font-sans select-none">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 dark:bg-darkbg-card border-r border-slate-800 dark:border-darkbg-border flex flex-col justify-between z-20">
        <div>
          {/* Logo Brand */}
          <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800 dark:border-darkbg-border">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-600/30">
              C
            </div>
            <div>
              <h1 className="text-sm font-black text-white tracking-wide">CRM Enterprise</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sales Platform</p>
            </div>
          </div>

          {/* Navigation links */}
          <div className="p-4 space-y-1">
            <p className="px-3 pb-2 text-[10px] font-black uppercase text-slate-500 tracking-wider">Main Navigation</p>
            
            <NavLink to="/deals" className={({isActive}) => `flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
              <FiDollarSign className="w-4 h-4" /> Deals Pipeline
            </NavLink>

            <NavLink to="/contacts" className={({isActive}) => `flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
              <FiUsers className="w-4 h-4" /> Contacts
            </NavLink>

            <NavLink to="/companies" className={({isActive}) => `flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
              <FiBriefcase className="w-4 h-4" /> Companies
            </NavLink>

            <NavLink to="/products" className={({isActive}) => `flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
              <FiBox className="w-4 h-4" /> Products
            </NavLink>

            <NavLink to="/calendar" className={({isActive}) => `flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
              <FiCalendar className="w-4 h-4" /> Activities / Calendar
            </NavLink>

            <NavLink to="/dashboard" className={({isActive}) => `flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
              <FiBarChart2 className="w-4 h-4" /> Analytics Dashboard
            </NavLink>

            <NavLink to="/settings" className={({isActive}) => `flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
              <FiSettings className="w-4 h-4" /> Settings & RBAC
            </NavLink>
          </div>
        </div>

        {/* User Footer Profile */}
        <div className="p-4 border-t border-slate-800 dark:border-darkbg-border flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-xs uppercase shrink-0">
              {user?.name ? user.name[0] : 'E'}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">{user?.name || 'Elena Rostova'}</h4>
              <p className="text-[10px] text-slate-400 truncate">{user?.email || 'admin@enterprise.io'}</p>
            </div>
          </div>
          <button onClick={logout} className="p-2 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer" title="Logout">
            <FiLogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-darkbg-card border-b border-slate-200 dark:border-darkbg-border px-8 flex items-center justify-between shrink-0 z-30 relative">
          
          {/* Global Search Bar */}
          <div className="relative w-96">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search deals, contacts, tasks..." 
              className="w-full pl-10 pr-16 py-2 rounded-xl bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 border border-slate-300 dark:border-slate-700">Ctrl K</span>
          </div>

          {/* Header Action Tools - Explicit z-index & pointer-events */}
          <div className="flex items-center gap-3 relative z-50 pointer-events-auto">
            
            {/* Quick Add Deal Button */}
            <button 
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <FiPlus className="w-4 h-4" /> Add Deal
            </button>

            {/* Signals / Notifications Bell */}
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenSignals) onOpenSignals();
              }}
              className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkbg rounded-xl relative transition-colors cursor-pointer"
              title="Notifications & Signals"
            >
              <FiBell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            </button>

            {/* Notebook Quick Drawer Toggle */}
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenNotebook) onOpenNotebook();
              }}
              className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkbg rounded-xl transition-colors cursor-pointer"
              title="Scratchpad Notebook"
            >
              <FiFileText className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle Button */}
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleDarkMode();
              }}
              className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkbg rounded-xl transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {darkMode ? <FiSun className="w-5 h-5 text-amber-400" /> : <FiMoon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* User Profile Badge */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-darkbg-border">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                {user?.name ? user.name[0] : 'E'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">{user?.name || 'Elena Rostova'}</p>
                <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">System Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-darkbg relative">
          {children}
        </main>
      </div>

      {/* Quick Add Deal Modal Overlay */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-darkbg-card rounded-3xl shadow-2xl border border-slate-200 dark:border-darkbg-border p-6 animate-in zoom-in-95 duration-150">
            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4">Create New Deal Opportunity</h3>
            <form onSubmit={handleCreateDealSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Deal Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Enterprise License Upgrade"
                  value={dealTitle}
                  onChange={(e) => setDealTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Deal Amount (₹)</label>
                <input 
                  type="number" 
                  placeholder="50000"
                  value={dealAmount}
                  onChange={(e) => setDealAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-darkbg text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  Save Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}