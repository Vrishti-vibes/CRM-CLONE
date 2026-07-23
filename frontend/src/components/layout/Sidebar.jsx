import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiGrid,
  FiUsers,
  FiBriefcase,
  FiTrendingUp,
  FiCheckSquare,
  FiCalendar,
  FiBox,
  FiBarChart2,
  FiSettings,
  FiX,
} from 'react-icons/fi';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
  { name: 'Contacts', path: '/contacts', icon: FiUsers },
  { name: 'Companies', path: '/companies', icon: FiBriefcase },
  { name: 'Deals Pipeline', path: '/deals', icon: FiTrendingUp },
  { name: 'Tasks', path: '/tasks', icon: FiCheckSquare },
  { name: 'Calendar', path: '/calendar', icon: FiCalendar },
  { name: 'Products', path: '/products', icon: FiBox },
  { name: 'Reports', path: '/reports', icon: FiBarChart2 },
  { name: 'Settings', path: '/settings', icon: FiSettings },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Branding */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-brand-600/30">
              CRM
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-wide block">Bigin Clone</span>
              <span className="text-[10px] text-brand-400 uppercase font-semibold tracking-wider">Enterprise</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Workspace Footer Info */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 text-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span>Status</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="font-medium text-slate-200">System v1.0 Operational</p>
          </div>
        </div>
      </aside>
    </>
  );
}