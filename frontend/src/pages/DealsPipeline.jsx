import React, { useState } from 'react';
import { FiSearch, FiPlus, FiFilter, FiX, FiGrid, FiList, FiColumns, FiLayout, FiChevronDown } from 'react-icons/fi';

export default function DealsPipeline() {
  const [subPipelines, setSubPipelines] = useState(['Standard Pipeline', 'Partner Channel', 'Enterprise Sales']);
  const [currentSubPipeline, setCurrentSubPipeline] = useState('Standard Pipeline');
  
  // View Modes: 'kanban', 'list', 'split-horizontal', 'split-vertical'
  const [viewMode, setViewMode] = useState('kanban');
  
  const [showCreateSubPipeline, setShowCreateSubPipeline] = useState(false);
  const [newSubPipelineName, setNewSubPipelineName] = useState('');
  const [openStages, setOpenStages] = useState(['Qualification', 'Needs Analysis', 'Proposal Quote', 'Negotiation']);
  const [closedStages, setClosedStages] = useState(['Closed Won', 'Closed Lost']);

  const [deals, setDeals] = useState([
    { id: 1, title: 'Zylker Yearly Subscription', value: '₹5,671', stage: 'Qualification', contact: 'Ted Watson', company: 'Zylker Corp', owner: 'Elena Rostova', date: 'Today' },
    { id: 2, title: 'Website Development', value: '₹70,000', stage: 'Needs Analysis', contact: 'Ted Watson', company: 'Tech Solutions', owner: 'Alex Morgan', date: 'Jul 31' },
    { id: 3, title: 'Cloud Migration Setup', value: '₹1,50,000', stage: 'Proposal Quote', contact: 'Sarah Connor', company: 'Cyberdyne', owner: 'Elena Rostova', date: 'Aug 02' },
    { id: 4, title: 'Enterprise Software License', value: '₹2,50,000', stage: 'Negotiation', contact: 'John Wick', company: 'Continental', owner: 'Alex Morgan', date: 'Aug 05' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newDeal, setNewDeal] = useState({ title: '', value: '', stage: 'Qualification', contact: '', company: '', owner: 'Elena Rostova' });

  const stages = ['Qualification', 'Needs Analysis', 'Proposal Quote', 'Negotiation', 'Closed Won'];

  const handleAddDeal = (e) => {
    e.preventDefault();
    if (!newDeal.title.trim()) return;
    setDeals(prev => [{ id: Date.now(), ...newDeal, date: 'Today' }, ...prev]);
    setNewDeal({ title: '', value: '', stage: 'Qualification', contact: '', company: '', owner: 'Elena Rostova' });
    setShowAddModal(false);
  };

  const handleCreateSubPipeline = (e) => {
    e.preventDefault();
    if (!newSubPipelineName.trim()) return;
    setSubPipelines(prev => [...prev, newSubPipelineName]);
    setCurrentSubPipeline(newSubPipelineName);
    setNewSubPipelineName('');
    setShowCreateSubPipeline(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-darkbg text-slate-800 dark:text-slate-100 overflow-hidden select-none">
      
      {/* Top Header Bar */}
      <div className="h-14 bg-white dark:bg-darkbg-card border-b border-slate-200 dark:border-darkbg-border px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-darkbg px-3 py-1.5 rounded-xl border border-slate-200 dark:border-darkbg-border text-xs font-bold">
            <span className="text-slate-400 font-normal">Pipeline:</span>
            <span className="font-black text-slate-900 dark:text-white">Sales Pipeline Standard</span>
          </div>

          {/* Sub-Pipeline Selector Dropdown with Create Option */}
          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-900 text-xs font-bold">
            <span className="text-indigo-400 font-normal">Sub-Pipeline:</span>
            <select 
              value={currentSubPipeline}
              onChange={(e) => {
                if (e.target.value === 'CREATE_NEW') {
                  setShowCreateSubPipeline(true);
                } else {
                  setCurrentSubPipeline(e.target.value);
                }
              }}
              className="bg-transparent outline-none font-black text-indigo-600 dark:text-indigo-400 cursor-pointer"
            >
              {subPipelines.map(sp => (
                <option key={sp} value={sp}>{sp}</option>
              ))}
              <option value="CREATE_NEW" className="font-black text-indigo-600 bg-white dark:bg-darkbg">+ Create Sub-Pipeline...</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggles: Kanban, List, Horizontal Sheet, Vertical Sheet */}
          <div className="flex items-center bg-slate-100 dark:bg-darkbg p-1 rounded-xl text-xs font-bold gap-1">
            <button 
              onClick={() => setViewMode('kanban')}
              title="Kanban Board View"
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${viewMode === 'kanban' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              title="List View"
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
              <FiList className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('split-horizontal')}
              title="Horizontal Split Sheet View"
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${viewMode === 'split-horizontal' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
              <FiColumns className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('split-vertical')}
              title="Vertical Split Sheet View"
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${viewMode === 'split-vertical' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
              <FiLayout className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
          >
            <FiPlus className="w-4 h-4" /> Add Deal
          </button>
        </div>
      </div>

      {/* Main Content View Switcher */}
      <div className="flex-1 p-6 overflow-x-auto overflow-y-auto">
        
        {/* 1. KANBAN BOARD VIEW */}
        {viewMode === 'kanban' && (
          <div className="flex gap-4 h-full min-w-max pb-4">
            {stages.map(stage => {
              const stageDeals = deals.filter(d => d.stage === stage);
              const totalVal = stageDeals.reduce((acc, d) => acc + parseInt(d.value.replace(/[^0-9]/g, '') || 0), 0);
              return (
                <div key={stage} className="w-72 bg-slate-100/70 dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border flex flex-col max-h-full">
                  <div className="p-3.5 border-b border-slate-200 dark:border-darkbg-border flex items-center justify-between shrink-0">
                    <div>
                      <h4 className="text-[11px] font-black uppercase text-slate-700 dark:text-slate-200">{stage}</h4>
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">₹{totalVal.toLocaleString('en-IN')}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-white dark:bg-darkbg text-[10px] font-black rounded-full border border-slate-200 dark:border-darkbg-border">
                      {stageDeals.length} Deal{stageDeals.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="p-3 flex-1 overflow-y-auto space-y-3">
                    {stageDeals.map(deal => (
                      <div key={deal.id} className="bg-white dark:bg-darkbg p-4 rounded-xl border border-slate-200 dark:border-darkbg-border shadow-xs hover:shadow-md transition-shadow">
                        <h5 className="text-xs font-black text-slate-900 dark:text-white mb-1">{deal.title}</h5>
                        <p className="text-[11px] font-bold text-indigo-600 mb-2">{deal.company}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-extrabold text-slate-800 dark:text-slate-100">
                          <span>{deal.value}</span>
                          <span className="text-[10px] font-bold text-slate-400">{deal.date}</span>
                        </div>
                      </div>
                    ))}
                    {stageDeals.length === 0 && (
                      <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-[11px] font-bold text-slate-400">
                        No Deals
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. LIST VIEW */}
        {viewMode === 'list' && (
          <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-darkbg-border bg-slate-50/50 dark:bg-darkbg text-[11px] font-black uppercase text-slate-400">
                  <th className="p-4">Deal Name</th>
                  <th className="p-4">Stage</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {deals.map(deal => (
                  <tr key={deal.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-black text-slate-900 dark:text-white">{deal.title}</td>
                    <td className="p-4"><span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-full font-bold text-[10px]">{deal.stage}</span></td>
                    <td className="p-4 font-bold text-indigo-600">{deal.company}</td>
                    <td className="p-4 font-semibold text-slate-600 dark:text-slate-300">{deal.contact}</td>
                    <td className="p-4 font-extrabold text-slate-900 dark:text-white">{deal.value}</td>
                    <td className="p-4 font-semibold text-slate-500">{deal.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. HORIZONTAL SPLIT SHEET VIEW */}
        {viewMode === 'split-horizontal' && (
          <div className="flex flex-col h-full gap-4">
            <div className="h-1/2 bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border p-4 overflow-y-auto shadow-sm">
              <h3 className="text-xs font-black uppercase text-slate-400 mb-3">Pipeline Stages Overview ({currentSubPipeline})</h3>
              <div className="grid grid-cols-4 gap-4">
                {stages.slice(0, 4).map(st => (
                  <div key={st} className="p-3 bg-slate-50 dark:bg-darkbg rounded-xl border border-slate-200 dark:border-darkbg-border">
                    <span className="text-[10px] font-black text-slate-400 uppercase">{st}</span>
                    <p className="text-sm font-black text-indigo-600 mt-1">{deals.filter(d => d.stage === st).length} Deals</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-1/2 bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border p-4 overflow-y-auto shadow-sm">
              <h3 className="text-xs font-black uppercase text-slate-400 mb-3">All Deals Table Sheet</h3>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b text-[10px] uppercase text-slate-400 font-black">
                    <th className="pb-2">Deal Name</th>
                    <th className="pb-2">Stage</th>
                    <th className="pb-2">Company</th>
                    <th className="pb-2">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {deals.map(d => (
                    <tr key={d.id}>
                      <td className="py-2 font-bold">{d.title}</td>
                      <td className="py-2 text-indigo-600 font-semibold">{d.stage}</td>
                      <td className="py-2 text-slate-500">{d.company}</td>
                      <td className="py-2 font-extrabold">{d.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. VERTICAL SPLIT SHEET VIEW */}
        {viewMode === 'split-vertical' && (
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border p-4 overflow-y-auto shadow-sm">
              <h3 className="text-xs font-black uppercase text-slate-400 mb-3">Quick Deal List ({currentSubPipeline})</h3>
              <div className="space-y-2">
                {deals.map(d => (
                  <div key={d.id} className="p-3 bg-slate-50 dark:bg-darkbg rounded-xl border border-slate-200 dark:border-darkbg-border flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-black">{d.title}</h4>
                      <span className="text-[10px] text-indigo-600 font-bold">{d.company}</span>
                    </div>
                    <span className="text-xs font-extrabold">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border p-4 overflow-y-auto shadow-sm">
              <h3 className="text-xs font-black uppercase text-slate-400 mb-3">Analytics & Summary</h3>
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl">
                  <span className="text-xs font-bold text-indigo-600">Total Pipeline Value</span>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">₹4,85,671</h2>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl">
                  <span className="text-xs font-bold text-emerald-600">Active Sub-Pipeline</span>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white mt-1">{currentSubPipeline}</h2>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* CREATE SUB-PIPELINE DRAWER MODAL */}
      {showCreateSubPipeline && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-darkbg-card h-full shadow-2xl border-l border-slate-200 dark:border-darkbg-border p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-darkbg-border">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white">Create Sub-Pipeline</h3>
                </div>
                <button onClick={() => setShowCreateSubPipeline(false)} className="cursor-pointer"><FiX className="w-4 h-4" /></button>
              </div>
              
              <form onSubmit={handleCreateSubPipeline} className="py-4 space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Sub-Pipeline Name</label>
                  <input 
                    type="text" required placeholder="e.g. Enterprise Channel"
                    value={newSubPipelineName} onChange={(e) => setNewSubPipelineName(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-3 text-xs font-semibold outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Open Stages</label>
                  <div className="space-y-2">
                    {openStages.map((st, i) => (
                      <input key={i} type="text" defaultValue={st} className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none" />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Closed Stages</label>
                  <div className="space-y-2">
                    {closedStages.map((st, i) => (
                      <input key={i} type="text" defaultValue={st} className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none" />
                    ))}
                  </div>
                </div>
              </form>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-darkbg-border flex justify-end gap-2">
              <button type="button" onClick={() => setShowCreateSubPipeline(false)} className="px-5 py-2.5 bg-slate-100 dark:bg-darkbg text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer">Cancel</button>
              <button type="button" onClick={handleCreateSubPipeline} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Deal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-darkbg-card rounded-3xl shadow-2xl border border-slate-200 dark:border-darkbg-border p-6 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-darkbg-border">
              <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white">Add New Deal</h3>
              <button onClick={() => setShowAddModal(false)} className="cursor-pointer"><FiX className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAddDeal} className="py-4 space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Deal Title</label>
                <input 
                  type="text" required placeholder="e.g. Cloud Setup"
                  value={newDeal.title} onChange={(e) => setNewDeal({...newDeal, title: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Value (₹)</label>
                <input 
                  type="text" placeholder="e.g. ₹50,000"
                  value={newDeal.value} onChange={(e) => setNewDeal({...newDeal, value: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Stage</label>
                <select 
                  value={newDeal.stage} onChange={(e) => setNewDeal({...newDeal, stage: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none cursor-pointer"
                >
                  {stages.map(st => <option key={st} value={st}>{st}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Company</label>
                <input 
                  type="text" placeholder="e.g. Acme Inc"
                  value={newDeal.company} onChange={(e) => setNewDeal({...newDeal, company: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 dark:bg-darkbg text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">Save Deal</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}