import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiFilter, FiX, FiGrid, FiList, FiColumns, FiLayout, FiMessageSquare, FiUsers, FiCheck, FiSliders, FiSend } from 'react-icons/fi';

export default function Deals({ onRegisterRef }) {
  const [subPipelines, setSubPipelines] = useState(() => {
    const saved = localStorage.getItem('crm_sub_pipelines');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'standard', name: 'Standard Pipeline', stages: ['Qualification', 'Needs Analysis', 'Proposal Quote', 'Negotiation', 'Closed Won'] },
      { id: 'partner', name: 'Partner Channel', stages: ['Lead', 'Evaluation', 'Agreement', 'Won'] },
      { id: 'enterprise', name: 'Enterprise Sales', stages: ['Discovery', 'Demo', 'Security Review', 'Contract', 'Closed'] }
    ];
  });

  const [currentSubPipeline, setCurrentSubPipeline] = useState('Standard Pipeline');
  
  // View Modes: 'kanban', 'list', 'split-horizontal', 'split-vertical'
  const [viewMode, setViewMode] = useState('kanban');
  
  // Modals & Drawers state
  const [showCreateSubPipeline, setShowCreateSubPipeline] = useState(false);
  const [newSubPipelineName, setNewSubPipelineName] = useState('');
  const [openStages, setOpenStages] = useState(['Qualification', 'Needs Analysis', 'Proposal Quote', 'Negotiation']);
  const [closedStages, setClosedStages] = useState(['Closed Won', 'Closed Lost']);

  // Filter Menu state
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filterOwner, setFilterOwner] = useState('All');

  // Bottom Footer Drawers state
  const [activeBottomDrawer, setActiveBottomDrawer] = useState(null); // 'chat' | 'contacts' | null
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello Elena! How can I assist you with your pipeline today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Deals state with localStorage persistence so positions survive page refresh
  const [deals, setDeals] = useState(() => {
    const saved = localStorage.getItem('crm_deals');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, title: 'Zylker Yearly Subscription', value: '₹5,671', stage: 'Qualification', contact: 'Ted Watson', company: 'Zylker Corp', owner: 'Elena Rostova', date: 'Today' },
      { id: 2, title: 'Website Development', value: '₹70,000', stage: 'Needs Analysis', contact: 'Ted Watson', company: 'Tech Solutions', owner: 'Alex Morgan', date: 'Jul 31' },
      { id: 3, title: 'Cloud Migration Setup', value: '₹1,50,000', stage: 'Proposal Quote', contact: 'Sarah Connor', company: 'Cyberdyne', owner: 'Elena Rostova', date: 'Aug 02' },
      { id: 4, title: 'Enterprise Software License', value: '₹2,50,000', stage: 'Negotiation', contact: 'John Wick', company: 'Continental', owner: 'Alex Morgan', date: 'Aug 05' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('crm_deals', JSON.stringify(deals));
  }, [deals]);

  useEffect(() => {
    localStorage.setItem('crm_sub_pipelines', JSON.stringify(subPipelines));
  }, [subPipelines]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newDeal, setNewDeal] = useState({ title: '', value: '', stage: 'Qualification', contact: '', company: '', owner: 'Elena Rostova' });

  // Get active stages based on selected sub-pipeline
  const activeSpObj = subPipelines.find(sp => sp.name === currentSubPipeline);
  const stages = activeSpObj ? activeSpObj.stages : ['Qualification', 'Needs Analysis', 'Proposal Quote', 'Negotiation', 'Closed Won'];

  // Drag and Drop Handlers
  const handleDragStart = (e, dealId) => {
    e.dataTransfer.setData('dealId', dealId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    const dealId = Number(e.dataTransfer.getData('dealId'));
    if (!dealId) return;
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: targetStage } : d));
  };

  const handleAddDeal = (e) => {
    e.preventDefault();
    if (!newDeal.title.trim()) return;
    setDeals(prev => [{ id: Date.now(), ...newDeal, date: 'Today' }, ...prev]);
    setNewDeal({ title: '', value: '', stage: stages[0] || 'Qualification', contact: '', company: '', owner: 'Elena Rostova' });
    setShowAddModal(false);
  };

  const handleCreateSubPipeline = (e) => {
    e.preventDefault();
    if (!newSubPipelineName.trim()) return;
    const allStages = [...openStages, ...closedStages];
    setSubPipelines(prev => [...prev, { id: newSubPipelineName.toLowerCase().replace(/\s+/g, '-'), name: newSubPipelineName, stages: allStages }]);
    setCurrentSubPipeline(newSubPipelineName);
    setNewSubPipelineName('');
    setShowCreateSubPipeline(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'ai', text: `Got it! I am processing your request regarding "${userMsg}".` }]);
    }, 600);
  };

  // Filtered Deals
  const filteredDeals = deals.filter(d => {
    if (filterOwner !== 'All' && d.owner !== filterOwner) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-darkbg text-slate-800 dark:text-slate-100 overflow-hidden select-none relative">
      
      {/* Top Bar with Sub-Pipeline & View Toggles */}
      <div className="h-14 bg-white dark:bg-darkbg-card border-b border-slate-200 dark:border-darkbg-border px-6 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div className="text-xs font-black uppercase text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-darkbg px-3 py-1.5 rounded-xl border border-slate-200 dark:border-darkbg-border">
            Sales Pipeline Standard
          </div>

          {/* Sub-Pipeline Selector Dropdown */}
          <div className="flex items-center gap-2 bg-indigo-50/50 dark:bg-darkbg px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-darkbg-border text-xs font-bold">
            <span className="text-slate-500 font-normal">Sub-Pipeline:</span>
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
                <option key={sp.id} value={sp.name}>{sp.name}</option>
              ))}
              <option value="CREATE_NEW" className="font-bold text-indigo-600 bg-white dark:bg-darkbg">+ Create Sub-Pipeline...</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 relative">
          {/* View Toggles: Kanban, List, Horizontal Split, Vertical Split */}
          <div className="flex items-center bg-slate-100 dark:bg-darkbg p-1 rounded-xl text-xs font-bold gap-1">
            <button 
              onClick={() => setViewMode('kanban')}
              title="Kanban Board View"
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${viewMode === 'kanban' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              title="List View"
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              <FiList className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('split-horizontal')}
              title="Horizontal Split Sheet View"
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${viewMode === 'split-horizontal' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              <FiColumns className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('split-vertical')}
              title="Vertical Split Sheet View"
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${viewMode === 'split-vertical' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              <FiLayout className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Button & Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <FiFilter className="w-3.5 h-3.5" /> Filter {filterOwner !== 'All' && '(1)'}
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-darkbg-card rounded-2xl shadow-xl border border-slate-200 dark:border-darkbg-border p-3 z-30 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                  <span className="text-[11px] font-black uppercase text-slate-400">Filter Deals</span>
                  <button onClick={() => setShowFilterDropdown(false)} className="text-slate-400 hover:text-slate-600"><FiX className="w-3.5 h-3.5" /></button>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 block">Owner</label>
                  <select 
                    value={filterOwner} 
                    onChange={(e) => setFilterOwner(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2 text-xs font-semibold outline-none cursor-pointer"
                  >
                    <option value="All">All Owners</option>
                    <option value="Elena Rostova">Elena Rostova</option>
                    <option value="Alex Morgan">Alex Morgan</option>
                  </select>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                  <button onClick={() => { setFilterOwner('All'); setShowFilterDropdown(false); }} className="text-[11px] font-bold text-slate-400 hover:underline">Reset</button>
                  <button onClick={() => setShowFilterDropdown(false)} className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[11px] font-bold">Apply</button>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
          >
            <FiPlus className="w-4 h-4" /> Add Deal
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-x-auto overflow-y-auto">
        
        {/* 1. KANBAN BOARD VIEW */}
        {viewMode === 'kanban' && (
          <div className="flex gap-4 h-full min-w-max pb-4">
            {stages.map(stage => {
              const stageDeals = filteredDeals.filter(d => d.stage === stage);
              const totalVal = stageDeals.reduce((acc, d) => acc + parseInt(d.value.replace(/[^0-9]/g, '') || 0), 0);
              return (
                <div 
                  key={stage} 
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage)}
                  className="w-72 bg-slate-100/70 dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border flex flex-col max-h-full"
                >
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
                      <div 
                        key={deal.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, deal.id)}
                        className="bg-white dark:bg-darkbg p-4 rounded-xl border border-slate-200 dark:border-darkbg-border shadow-xs hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
                      >
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
                        Drop deals here
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
                {filteredDeals.map(deal => (
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
              <h3 className="text-xs font-black uppercase text-slate-400 mb-3">Pipeline Stage Summary ({currentSubPipeline})</h3>
              <div className="grid grid-cols-4 gap-4">
                {stages.slice(0, 4).map(st => (
                  <div key={st} className="p-3 bg-slate-50 dark:bg-darkbg rounded-xl border border-slate-200 dark:border-darkbg-border">
                    <span className="text-[10px] font-black text-slate-400 uppercase">{st}</span>
                    <p className="text-sm font-black text-indigo-600 mt-1">{filteredDeals.filter(d => d.stage === st).length} Deals</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-1/2 bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border p-4 overflow-y-auto shadow-sm">
              <h3 className="text-xs font-black uppercase text-slate-400 mb-3">Deals Sheet View</h3>
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
                  {filteredDeals.map(d => (
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
              <h3 className="text-xs font-black uppercase text-slate-400 mb-3">Quick Deal Cards</h3>
              <div className="space-y-2">
                {filteredDeals.map(d => (
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
              <h3 className="text-xs font-black uppercase text-slate-400 mb-3">Pipeline Performance Metrics</h3>
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl">
                  <span className="text-xs font-bold text-indigo-600">Active Sub-Pipeline</span>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white mt-1">{currentSubPipeline}</h2>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl">
                  <span className="text-xs font-bold text-emerald-600">Total Deals Value</span>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">₹4,85,671</h2>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Footer Bar */}
      <div className="h-10 bg-white dark:bg-darkbg-card border-t border-slate-200 dark:border-darkbg-border px-6 flex items-center justify-between shrink-0 text-xs font-bold z-10">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveBottomDrawer(activeBottomDrawer === 'chat' ? null : 'chat')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg cursor-pointer transition-colors ${activeBottomDrawer === 'chat' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <FiMessageSquare className="w-3.5 h-3.5" /> AI Chat Assistant
          </button>
          <button 
            onClick={() => setActiveBottomDrawer(activeBottomDrawer === 'contacts' ? null : 'contacts')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg cursor-pointer transition-colors ${activeBottomDrawer === 'contacts' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <FiUsers className="w-3.5 h-3.5" /> Contacts
          </button>
        </div>
        <span className="text-[10px] font-bold text-slate-400">Smart Chat (Ctrl+Space)</span>
      </div>

      {/* INTERACTIVE BOTTOM DRAWER MODALS */}
      {activeBottomDrawer && (
        <div className="absolute bottom-12 right-6 w-96 h-[420px] bg-white dark:bg-darkbg-card rounded-3xl shadow-2xl border border-slate-200 dark:border-darkbg-border flex flex-col z-50 animate-in slide-in-from-bottom duration-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-darkbg-border flex items-center justify-between bg-slate-50 dark:bg-darkbg">
            <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white flex items-center gap-2">
              {activeBottomDrawer === 'chat' ? <><FiMessageSquare className="text-indigo-600" /> AI Assistant</> : <><FiUsers className="text-indigo-600" /> Quick Contacts</>}
            </h4>
            <button onClick={() => setActiveBottomDrawer(null)} className="cursor-pointer text-slate-400 hover:text-slate-600"><FiX className="w-4 h-4" /></button>
          </div>

          {activeBottomDrawer === 'chat' ? (
            <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {chatMessages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-semibold ${m.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-100 dark:bg-darkbg text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-darkbg-border'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <input 
                  type="text" placeholder="Ask AI about pipeline..."
                  value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
                <button type="submit" className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer shadow-sm"><FiSend className="w-4 h-4" /></button>
              </form>
            </div>
          ) : (
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {[
                { name: 'Ted Watson', role: 'CTO, Zylker Corp', email: 'ted@zylker.com' },
                { name: 'Sarah Connor', role: 'Director, Cyberdyne', email: 'sarah@cyberdyne.io' },
                { name: 'John Wick', role: 'Owner, Continental', email: 'john@continental.com' }
              ].map((c, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-darkbg rounded-xl border border-slate-200 dark:border-darkbg-border flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-black">{c.name}</h5>
                    <p className="text-[10px] text-slate-500">{c.role}</p>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600">{c.email}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CREATE SUB-PIPELINE DRAWER MODAL */}
      {showCreateSubPipeline && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-darkbg-card h-full shadow-2xl border-l border-slate-200 dark:border-darkbg-border p-6 flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-darkbg-border">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white">Create Sub-Pipeline</h3>
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold">Sales Pipeline</span>
                </div>
                <button onClick={() => setShowCreateSubPipeline(false)} className="cursor-pointer text-slate-400 hover:text-slate-600"><FiX className="w-4 h-4" /></button>
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
                    <button type="button" onClick={() => setOpenStages([...openStages, 'New Stage'])} className="text-xs font-bold text-indigo-600 hover:underline">+ Stage</button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Closed Stages</label>
                  <div className="space-y-2">
                    {closedStages.map((st, i) => (
                      <input key={i} type="text" defaultValue={st} className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none" />
                    ))}
                    <button type="button" onClick={() => setClosedStages([...closedStages, 'New Closed Stage'])} className="text-xs font-bold text-indigo-600 hover:underline">+ Stage</button>
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
              <button onClick={() => setShowAddModal(false)} className="cursor-pointer text-slate-400 hover:text-slate-600"><FiX className="w-4 h-4" /></button>
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