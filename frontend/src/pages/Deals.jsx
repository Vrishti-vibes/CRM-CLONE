import React, { useState, useEffect } from 'react';
import { 
  FiSearch, FiPlus, FiFilter, FiX, FiGrid, FiList, 
  FiMessageSquare, FiUsers, FiChevronDown, FiStar, FiChevronLeft, FiSend, FiMinimize2, FiEdit2, FiTrash2 
} from 'react-icons/fi';

export default function Deals() {
  const [subPipelines, setSubPipelines] = useState(() => {
    const saved = localStorage.getItem('crm_sub_pipelines');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'standard', name: 'Standard Pipeline', stages: ['QUALIFICATION', 'NEEDS ANALYSIS', 'PROPOSAL QUOTE', 'NEGOTIATION', 'CLOSED WON'] }
    ];
  });

  const [currentSubPipeline, setCurrentSubPipeline] = useState('Standard Pipeline');
  const [viewMode, setViewMode] = useState('kanban'); 
  
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [filterProperty, setFilterProperty] = useState('Touched Records');
  const [filterValue, setFilterValue] = useState('');
  const [filterOwner, setFilterOwner] = useState('All');

  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [selectedView, setSelectedView] = useState('All Deals');
  const [viewTab, setViewTab] = useState('all');

  const [showCtrlKModal, setShowCtrlKModal] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const [collapsedStages, setCollapsedStages] = useState({});

  const [activeBottomDrawer, setActiveBottomDrawer] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello! How can I assist you with your pipeline today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const [deals, setDeals] = useState(() => {
    const saved = localStorage.getItem('crm_deals');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, title: 'Website Development', value: '₹70,000', stage: 'NEEDS ANALYSIS', contact: 'Tech Solutions', company: 'Tech Solutions', owner: 'Elena Rostova', date: 'Jul 31' },
      { id: 2, title: 'Cloud Migration Setup', value: '₹1,50,000', stage: 'PROPOSAL QUOTE', contact: 'Cyberdyne', company: 'Cyberdyne', owner: 'Elena Rostova', date: 'Aug 02' },
      { id: 3, title: 'Enterprise Software License', value: '₹2,50,000', stage: 'NEGOTIATION', contact: 'Continental', company: 'Continental', owner: 'Alex Morgan', date: 'Aug 05' },
      { id: 4, title: 'Zylker Yearly Subscription', value: '₹5,671', stage: 'QUALIFICATION', contact: 'Zylker Corp', company: 'Zylker Corp', owner: 'Alex Morgan', date: 'Today' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('crm_deals', JSON.stringify(deals));
  }, [deals]);

  useEffect(() => {
    localStorage.setItem('crm_sub_pipelines', JSON.stringify(subPipelines));
  }, [subPipelines]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowCtrlKModal(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowCtrlKModal(false);
        setShowFilterDrawer(false);
        setShowViewDropdown(false);
        setActiveBottomDrawer(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newDeal, setNewDeal] = useState({ title: '', value: '', stage: '', contact: '', company: '', owner: 'Elena Rostova' });

  const activeSpObj = subPipelines.find(sp => sp.name === currentSubPipeline);
  const stages = activeSpObj ? activeSpObj.stages : ['QUALIFICATION', 'NEEDS ANALYSIS', 'PROPOSAL QUOTE', 'NEGOTIATION', 'CLOSED WON'];

  const handleDragStart = (e, dealId) => {
    e.dataTransfer.setData('dealId', dealId);
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    const dealId = Number(e.dataTransfer.getData('dealId'));
    if (!dealId) return;
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: targetStage } : d));
  };

  const handleAddDeal = (e) => {
    e.preventDefault();
    if (!newDeal.title.trim()) return;
    const targetStage = newDeal.stage || stages[0];
    setDeals(prev => [{ id: Date.now(), ...newDeal, stage: targetStage, date: 'Today' }, ...prev]);
    setNewDeal({ title: '', value: '', stage: '', contact: '', company: '', owner: 'Elena Rostova' });
    setShowAddModal(false);
  };

  const handleDeleteDeal = (e, dealId) => {
    e.stopPropagation();
    setDeals(prev => prev.filter(d => d.id !== dealId));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'ai', text: `Processed your request regarding "${userMsg}".` }]);
    }, 600);
  };

  const toggleCollapse = (stage) => {
    setCollapsedStages(prev => ({ ...prev, [stage]: !prev[stage] }));
  };

  const filteredDeals = deals.filter(d => {
    if (filterOwner !== 'All' && d.owner !== filterOwner) return false;
    if (filterValue) {
      const valLower = filterValue.toLowerCase();
      const matchTitle = d.title.toLowerCase().includes(valLower);
      const matchCompany = d.company.toLowerCase().includes(valLower);
      const matchContact = d.contact.toLowerCase().includes(valLower);
      if (!matchTitle && !matchCompany && !matchContact) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full w-full bg-[#f8f9fa] dark:bg-darkbg text-slate-800 dark:text-slate-100 overflow-hidden select-none relative">
      
      {/* Top Bar */}
      <div className="h-14 bg-white dark:bg-darkbg-card border-b border-slate-200 dark:border-darkbg-border px-4 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.history.back()}
            title="Go Back"
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
          >
            <FiChevronLeft className="w-5 h-5 font-bold" />
          </button>

          <div className="relative">
            <button 
              onClick={() => setShowViewDropdown(!showViewDropdown)}
              className="flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-full text-xs hover:bg-slate-200 transition-all cursor-pointer"
            >
              <span>{selectedView}</span>
              <FiChevronDown className="w-3.5 h-3.5" />
            </button>

            {showViewDropdown && (
              <div className="absolute top-9 left-0 w-64 bg-white dark:bg-darkbg-card border border-slate-200 dark:border-darkbg-border rounded-2xl shadow-xl z-50 p-3 text-xs">
                <div className="flex border-b border-slate-100 dark:border-slate-800 pb-2 mb-2 gap-4 font-bold text-slate-500">
                  <button onClick={() => setViewTab('all')} className={`cursor-pointer ${viewTab === 'all' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-0.5' : ''}`}>All Views</button>
                  <button onClick={() => setViewTab('favorites')} className={`cursor-pointer flex items-center gap-1 ${viewTab === 'favorites' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-0.5' : ''}`}>
                    <FiStar className="w-3 h-3 text-amber-500 fill-amber-500" /> Favorites
                  </button>
                </div>
                {viewTab === 'all' ? (
                  <div className="space-y-1 font-semibold text-slate-700 dark:text-slate-200">
                    {['All Deals', 'Closing Next Month', 'Closing This Month', 'My Deals', 'Recently Created Deals'].map((v) => (
                      <div 
                        key={v} 
                        onClick={() => { setSelectedView(v); setShowViewDropdown(false); }}
                        className={`p-2 rounded-lg cursor-pointer ${selectedView === v ? 'bg-slate-100 text-indigo-600 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                      >
                        {v}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-slate-400 py-3 text-center font-medium">No favorite views saved yet</div>
                )}
              </div>
            )}
          </div>

          <div className="text-xs font-bold uppercase text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-darkbg px-3 py-1.5 rounded-xl border border-slate-200 dark:border-darkbg-border">
            SALES PIPELINE STANDARD
          </div>
        </div>

        <div className="flex items-center gap-3 relative">
          <button 
            onClick={() => setShowCtrlKModal(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl text-xs text-slate-400 font-medium hover:border-slate-300 cursor-pointer"
          >
            <FiSearch className="w-3.5 h-3.5" />
            <span>Search (Ctrl + K)</span>
          </button>

          <div className="flex items-center bg-slate-100 dark:bg-darkbg p-1 rounded-xl text-xs font-bold gap-1">
            <button onClick={() => setViewMode('kanban')} title="Kanban" className={`p-1.5 rounded-lg cursor-pointer ${viewMode === 'kanban' ? 'bg-slate-900 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}><FiGrid className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('list')} title="List" className={`p-1.5 rounded-lg cursor-pointer ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}><FiList className="w-4 h-4" /></button>
          </div>

          <button 
            onClick={() => setShowFilterDrawer(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <FiFilter className="w-3.5 h-3.5" /> Filter
          </button>

          <button 
            onClick={() => { setNewDeal({ title: '', value: '', stage: stages[0], contact: '', company: '', owner: 'Elena Rostova' }); setShowAddModal(true); }}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
          >
            <FiPlus className="w-4 h-4" /> Deal
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-x-auto overflow-y-auto">
        
        {/* KANBAN VIEW (Longer columns: h-[650px]) */}
        {viewMode === 'kanban' && (
          <div className="flex gap-4 h-full min-w-max pb-4 items-start">
            {stages.map(stage => {
              const stageDeals = filteredDeals.filter(d => d.stage === stage);
              const totalVal = stageDeals.reduce((acc, d) => acc + parseInt(d.value.replace(/[^0-9]/g, '') || 0), 0);
              const isCollapsed = collapsedStages[stage];

              if (isCollapsed) {
                return (
                  <div 
                    key={stage}
                    onClick={() => toggleCollapse(stage)}
                    className="w-12 bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border flex flex-col items-center py-4 cursor-pointer hover:bg-slate-50 transition-all shrink-0 h-[650px]"
                  >
                    <span className="text-[10px] font-black uppercase text-slate-400 [writing-mode:vertical-lr] rotate-180 tracking-wider mb-4">
                      {stage}
                    </span>
                    <span className="w-6 h-6 bg-slate-100 text-slate-700 font-bold text-[10px] rounded-full flex items-center justify-center border border-slate-200">
                      {stageDeals.length}
                    </span>
                  </div>
                );
              }

              return (
                <div 
                  key={stage} 
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage)}
                  className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border flex flex-col w-72 shrink-0 shadow-xs h-[650px]"
                >
                  <div className="p-3.5 border-b border-slate-200 dark:border-darkbg-border flex items-center justify-between shrink-0 bg-white rounded-t-2xl">
                    <div>
                      <h4 className="text-[11px] font-black uppercase text-slate-800 dark:text-slate-100 tracking-wide">{stage}</h4>
                      <span className="text-[10px] font-bold text-slate-500">₹{totalVal.toLocaleString('en-IN')} · {stageDeals.length} Deal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => toggleCollapse(stage)}
                        title="Collapse Column"
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded cursor-pointer"
                      >
                        <FiMinimize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 flex-1 overflow-y-auto space-y-3">
                    {stageDeals.map(deal => (
                      <div 
                        key={deal.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, deal.id)}
                        className="group bg-white dark:bg-darkbg p-3.5 rounded-xl border border-slate-200 dark:border-darkbg-border shadow-2xs hover:shadow-md transition-all cursor-grab active:cursor-grabbing relative"
                      >
                        {/* Hover Action Buttons (Appears only when cursor hovers over this deal card) */}
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-white dark:bg-darkbg px-1.5 py-1 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            title="Edit Deal"
                            onClick={(e) => { e.stopPropagation(); }}
                            className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded cursor-pointer"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            title="Delete Deal"
                            onClick={(e) => handleDeleteDeal(e, deal.id)}
                            className="p-1 text-rose-500 hover:text-rose-700 rounded cursor-pointer"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-1 pr-10">{deal.title}</h5>
                        <p className="text-[11px] font-semibold text-slate-600 mb-2">{deal.company}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-800 dark:text-slate-100">
                          <span>{deal.value}</span>
                          <span className="text-[10px] font-medium text-slate-400">{deal.date}</span>
                        </div>
                      </div>
                    ))}
                    {stageDeals.length === 0 && (
                      <div className="h-32 flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-bold text-slate-400">
                        This stage is empty
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 border-t border-slate-200 dark:border-darkbg-border bg-white rounded-b-2xl shrink-0">
                    <button 
                      onClick={() => {
                        setNewDeal({ title: '', value: '', stage, contact: '', company: '', owner: 'Elena Rostova' });
                        setShowAddModal(true);
                      }}
                      className="w-full flex items-center justify-center gap-1 py-1.5 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <FiPlus className="w-3.5 h-3.5" /> Deal
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {viewMode === 'list' && (
          <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-darkbg-border bg-slate-50 text-[11px] font-bold uppercase text-slate-400">
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
                  <tr key={deal.id} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{deal.title}</td>
                    <td className="p-4"><span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-bold text-[10px]">{deal.stage}</span></td>
                    <td className="p-4 font-semibold text-slate-600">{deal.company}</td>
                    <td className="p-4 font-medium text-slate-600">{deal.contact}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{deal.value}</td>
                    <td className="p-4 font-medium text-slate-500">{deal.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Bottom Footer Bar */}
      <div className="h-10 bg-white dark:bg-darkbg-card border-t border-slate-200 dark:border-darkbg-border px-6 flex items-center justify-between shrink-0 text-xs font-bold z-10">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveBottomDrawer(activeBottomDrawer === 'chat' ? null : 'chat')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg cursor-pointer transition-colors ${activeBottomDrawer === 'chat' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <FiMessageSquare className="w-3.5 h-3.5" /> AI Chat Assistant
          </button>
          <button 
            onClick={() => setActiveBottomDrawer(activeBottomDrawer === 'contacts' ? null : 'contacts')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg cursor-pointer transition-colors ${activeBottomDrawer === 'contacts' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <FiUsers className="w-3.5 h-3.5" /> Contacts
          </button>
        </div>
        <span className="text-[10px] font-bold text-slate-400">Smart Chat (Ctrl+Space)</span>
      </div>

      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-start" onClick={() => setShowFilterDrawer(false)}>
          <div className="w-full max-w-sm bg-white dark:bg-darkbg-card h-full shadow-2xl border-r border-slate-200 p-6 flex flex-col justify-between" onClick={e => e.stopPropagation()}>
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-sm font-bold uppercase text-slate-900 dark:text-white">Filter Sales Pipeline</h3>
                <button onClick={() => setShowFilterDrawer(false)} className="cursor-pointer text-slate-400 hover:text-slate-600"><FiX className="w-4 h-4" /></button>
              </div>
              
              <div className="py-4 space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Choose a Property</label>
                  <select 
                    value={filterProperty} onChange={(e) => setFilterProperty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium outline-none cursor-pointer"
                  >
                    <option value="Touched Records">Touched Records</option>
                    <option value="Untouched Records">Untouched Records</option>
                    <option value="Record Action">Record Action</option>
                    <option value="Related Record Action">Related Record Action</option>
                    <option value="Latest Email Status">Latest Email Status</option>
                    <option value="Activities">Activities</option>
                    <option value="Notes">Notes</option>
                    <option value="Deal Owner">Deal Owner</option>
                    <option value="Deal Name">Deal Name</option>
                    <option value="Company Name">Company Name</option>
                    <option value="Contact Name">Contact Name</option>
                    <option value="Sub-Pipeline">Sub-Pipeline</option>
                    <option value="Stage">Stage</option>
                    <option value="Amount">Amount</option>
                    <option value="Closing Date">Closing Date</option>
                    <option value="Tag">Tag</option>
                    <option value="Description">Description</option>
                    <option value="Created By">Created By</option>
                    <option value="Modified By">Modified By</option>
                    <option value="Created Time">Created Time</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Filter Keyword / Value</label>
                  <input 
                    type="text" placeholder="Search by name, company..."
                    value={filterValue} onChange={(e) => setFilterValue(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Owner Filter</label>
                  <select 
                    value={filterOwner} onChange={(e) => setFilterOwner(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium outline-none cursor-pointer"
                  >
                    <option value="All">All Owners</option>
                    <option value="Elena Rostova">Elena Rostova</option>
                    <option value="Alex Morgan">Alex Morgan</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-between gap-2">
              <button type="button" onClick={() => { setFilterValue(''); setFilterOwner('All'); }} className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold cursor-pointer">Reset</button>
              <button type="button" onClick={() => setShowFilterDrawer(false)} className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">Apply Filter</button>
            </div>
          </div>
        </div>
      )}

      {showCtrlKModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-20" onClick={() => setShowCtrlKModal(false)}>
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-3 border-b border-slate-200 flex items-center gap-2">
              <FiSearch className="w-4 h-4 text-slate-400" />
              <input 
                type="text" autoFocus placeholder="Search deals, contacts, or commands..." 
                value={commandQuery} onChange={(e) => setCommandQuery(e.target.value)}
                className="w-full text-xs font-medium outline-none bg-transparent text-slate-800" 
              />
              <button onClick={() => setShowCtrlKModal(false)} className="text-[10px] text-slate-400 font-bold px-1.5 py-0.5 bg-slate-100 rounded cursor-pointer">ESC</button>
            </div>
            <div className="p-3 text-slate-500 text-xs">
              <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">Quick Actions</div>
              <div onClick={() => { setShowAddModal(true); setShowCtrlKModal(false); }} className="p-2 hover:bg-slate-100 rounded-lg cursor-pointer font-bold text-slate-700">
                + Add New Deal
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-sm font-bold uppercase text-slate-900">Add New Deal</h3>
              <button onClick={() => setShowAddModal(false)} className="cursor-pointer text-slate-400 hover:text-slate-600"><FiX className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAddDeal} className="py-4 space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Deal Title</label>
                <input 
                  type="text" required placeholder="e.g. Cloud Setup"
                  value={newDeal.title} onChange={(e) => setNewDeal({...newDeal, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Value (₹)</label>
                <input 
                  type="text" placeholder="e.g. ₹50,000"
                  value={newDeal.value} onChange={(e) => setNewDeal({...newDeal, value: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Stage</label>
                <select 
                  value={newDeal.stage} onChange={(e) => setNewDeal({...newDeal, stage: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium outline-none cursor-pointer"
                >
                  {stages.map(st => <option key={st} value={st}>{st}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Company</label>
                <input 
                  type="text" placeholder="e.g. Cyberdyne"
                  value={newDeal.company} onChange={(e) => setNewDeal({...newDeal, company: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium outline-none"
                />
              </div>
              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md">Save Deal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeBottomDrawer && (
        <div className="absolute bottom-12 right-6 w-96 h-[420px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <h4 className="text-xs font-bold uppercase text-slate-900 flex items-center gap-2">
              {activeBottomDrawer === 'chat' ? <><FiMessageSquare /> AI Assistant</> : <><FiUsers /> Quick Contacts</>}
            </h4>
            <button onClick={() => setActiveBottomDrawer(null)} className="cursor-pointer text-slate-400 hover:text-slate-600"><FiX className="w-4 h-4" /></button>
          </div>

          {activeBottomDrawer === 'chat' ? (
            <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {chatMessages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium ${m.sender === 'user' ? 'bg-slate-900 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-100">
                <input 
                  type="text" placeholder="Ask AI about pipeline..."
                  value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium outline-none"
                />
                <button type="submit" className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl cursor-pointer shadow-sm"><FiSend className="w-4 h-4" /></button>
              </form>
            </div>
          ) : (
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {[
                { name: 'Ted Watson', role: 'CTO, Zylker Corp', email: 'ted@zylker.com' },
                { name: 'Sarah Connor', role: 'Director, Cyberdyne', email: 'sarah@cyberdyne.io' },
                { name: 'John Wick', role: 'Owner, Continental', email: 'john@continental.com' }
              ].map((c, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{c.name}</h5>
                    <p className="text-[10px] text-slate-500">{c.role}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-700">{c.email}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}