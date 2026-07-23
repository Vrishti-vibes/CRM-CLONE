import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiPlus,
  FiLogOut,
  FiChevronDown,
  FiUser,
  FiShield,
} from 'react-icons/fi';

export default function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <FiMenu className="w-6 h-6" />
        </button>

        {/* Global Search Input */}
        <div className="relative w-full hidden sm:block">
          <FiSearch className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search deals, contacts, companies..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-slate-200 placeholder-slate-400 text-sm focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick Action Button */}
        <button className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all">
          <FiPlus className="w-4 h-4" />
          <span>Quick Create</span>
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white font-bold text-sm flex items-center justify-center">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="hidden md:block text-left">
              <span className="text-xs font-semibold text-slate-200 block leading-tight">
                {user?.full_name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">{user?.role}</span>
            </div>
            <FiChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-700/60">
                <p className="text-xs font-bold text-white truncate">{user?.full_name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>

              <div className="py-1">
                <div className="px-4 py-2 text-xs text-slate-300 flex items-center gap-2">
                  <FiShield className="text-brand-400" />
                  <span>Role: <strong>{user?.role}</strong></span>
                </div>
              </div>

              <div className="border-t border-slate-700/60 pt-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-slate-700/50 flex items-center gap-2 transition-colors font-medium"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}