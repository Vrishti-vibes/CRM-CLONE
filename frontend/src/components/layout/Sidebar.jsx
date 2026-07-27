import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Pipelines', path: '/deals', icon: '📊' },
  { name: 'Contacts', path: '/contacts', icon: '👤' },
  { name: 'Companies', path: '/companies', icon: '🏢' },
  { name: 'Products', path: '/products', icon: '📦' },
  { name: 'Activities', path: '/calendar', icon: '📅' },
  { name: 'Dashboard', path: '/dashboard', icon: '📈' },
];

export default function Sidebar() {
  return (
    <aside className="w-16 md:w-52 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between shrink-0 h-[calc(100vh-3.5rem)] sticky top-14">
      <div className="py-3 px-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border-l-2 border-indigo-600 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                }`
              }
            >
              <span className="text-sm">{item.icon}</span>
              <span className="hidden md:inline">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 text-center font-medium">
        <span className="hidden md:inline">Aura Workspace</span>
      </div>
    </aside>
  );
}