import React, { useState } from 'react';
import { FiSearch, FiPlus, FiGlobe, FiUsers, FiDollarSign, FiX } from 'react-icons/fi';

export default function Companies() {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Zylker Corp', industry: 'SaaS / Technology', employees: 250, revenue: '₹5.67 Cr', owner: 'Elena Rostova' },
    { id: 2, name: 'Cyberdyne', industry: 'Artificial Intelligence', employees: 500, revenue: '₹15.0 Cr', owner: 'Elena Rostova' },
    { id: 3, name: 'Continental', industry: 'Security Services', employees: 1200, revenue: '₹25.0 Cr', owner: 'Alex Morgan' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', industry: '', employees: '', revenue: '', owner: 'Elena Rostova' });

  const handleAddCompany = (e) => {
    e.preventDefault();
    if (!newCompany.name.trim()) return;
    setCompanies(prev => [{ id: Date.now(), ...newCompany }, ...prev]);
    setNewCompany({ name: '', industry: '', employees: '', revenue: '', owner: 'Elena Rostova' });
    setShowAddModal(false);
  };

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-darkbg text-slate-800 dark:text-slate-100 overflow-hidden select-none">
      
      {/* Top Header Bar */}
      <div className="h-14 bg-white dark:bg-darkbg-card border-b border-slate-200 dark:border-darkbg-border px-6 flex items-center justify-between shrink-0">
        <div className="relative">
          <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search companies..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl text-xs font-semibold outline-none w-64"
          />
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
        >
          <FiPlus className="w-4 h-4" /> Add Company
        </button>
      </div>

      {/* Companies Table View */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-darkbg-border bg-slate-50/50 dark:bg-darkbg text-[11px] font-black uppercase text-slate-400">
                <th className="p-4">Company Name</th>
                <th className="p-4">Industry</th>
                <th className="p-4">Employees</th>
                <th className="p-4">Annual Revenue</th>
                <th className="p-4">Account Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredCompanies.map(comp => (
                <tr key={comp.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      {comp.name.charAt(0)}
                    </div>
                    {comp.name}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5">
                    <FiGlobe className="w-3.5 h-3.5 text-slate-400" /> {comp.industry}
                  </td>
                  <td className="p-4 font-semibold text-slate-500 flex items-center gap-1.5">
                    <FiUsers className="w-3.5 h-3.5 text-slate-400" /> {comp.employees}
                  </td>
                  <td className="p-4 font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <FiDollarSign className="w-3.5 h-3.5" /> {comp.revenue}
                  </td>
                  <td className="p-4 font-bold text-slate-700 dark:text-slate-300">{comp.owner}</td>
                </tr>
              ))}
              {filteredCompanies.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400 font-bold">No companies found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Company Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-darkbg-card rounded-3xl shadow-2xl border border-slate-200 dark:border-darkbg-border p-6 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-darkbg-border">
              <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white">Add New Company</h3>
              <button onClick={() => setShowAddModal(false)} className="cursor-pointer"><FiX className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAddCompany} className="py-4 space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Company Name</label>
                <input 
                  type="text" required placeholder="e.g. Acme Inc"
                  value={newCompany.name} onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Industry</label>
                <input 
                  type="text" placeholder="e.g. SaaS"
                  value={newCompany.industry} onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Employees</label>
                <input 
                  type="number" placeholder="e.g. 150"
                  value={newCompany.employees} onChange={(e) => setNewCompany({...newCompany, employees: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Annual Revenue</label>
                <input 
                  type="text" placeholder="e.g. ₹2.5 Cr"
                  value={newCompany.revenue} onChange={(e) => setNewCompany({...newCompany, revenue: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 dark:bg-darkbg text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">Save Company</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}