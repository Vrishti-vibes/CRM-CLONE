import React, { useState, useEffect } from 'react';
import { 
  FiSearch, FiPlus, FiFilter, FiX, FiGrid, FiList, 
  FiChevronDown, FiChevronUp, FiChevronRight, FiChevronLeft, 
  FiMoreVertical, FiSettings, FiUser, FiCheckCircle, FiMessageSquare, 
  FiSliders, FiRotateCcw, FiTrash2, FiMaximize2, FiMinimize2,
  FiMoon, FiSun, FiLayers, FiFolder, FiTag, FiHelpCircle, FiLock,
  FiBriefcase, FiUsers, FiBox, FiCalendar, FiBarChart2, FiLogOut
} from 'react-icons/fi';

// Sample Initial Deals Matching Bigin Stage Format
const INITIAL_DEALS = [
  { id: 1, title: 'Website Development', company: 'Tech Solutions', value: 70000, stage: 'Qualification', owner: 'Ted Watson', date: 'Today' },
  { id: 2, title: 'Zylker Yearly Subscription', company: 'Zylker Corp', value: 5671, stage: 'Needs Analysis', owner: 'Ted Watson', date: 'Jul 27' },
  { id: 3, title: 'Cloud Migration Setup', company: 'Cyberdyne', value: 150000, stage: 'Proposal/Price Quote', owner: 'Sarah Connor', date: 'Aug 02' },
  { id: 4, title: 'Enterprise Software License', company: 'Continental', value: 250000, stage: 'Negotiation/Review', owner: 'System Admin', date: 'Aug 05' },
];

const STAGES = ['Qualification', 'Proposal/Price Quote', 'Needs Analysis', 'Negotiation/Review', 'Closed Won', 'Closed Lost'];

export default function DealsPipeline() {
  // Navigation & Screen View State
  const [activeTab, setActiveTab] = useState('pipelines'); // 'pipelines' | 'approvals' | 'settings' | etc.
  const [settingsCategory, setSettingsCategory] = useState('Users and Controls');

  // Pipeline Data & View Modes
  const [deals, setDeals] = useState(() => {
    const saved = localStorage.getItem('bigin_deals_v2');
    return saved ? JSON.parse(saved) : INITIAL_DEALS;
  });

  useEffect(() => {
    localStorage.setItem('bigin_deals_v2', JSON.stringify(deals));
  }, [deals]);

  // UI Interactive Popovers & Drawers
  const [showCtrlK, setShowCtrlK] = useState(false);
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortOrder, setSortOrder] = useState('Desc'); // 'Asc' | 'Desc'
  const [sortBy, setSortBy] = useState('Created Time');

  // Hover Panel State (Mouse enter/leave logic for Team Pipelines)
  const [hoverPanelEnabled, setHoverPanelEnabled] = useState(true);
  const [showTeamPipelines, setShowTeamPipelines] = useState(false);
  const [openTeamsAccordion, setOpenTeamsAccordion] = useState(false);
  const [openIndustriesAccordion, setOpenIndustriesAccordion] = useState(false);

  // Column Specific States
  const [expandedColumn, setExpandedColumn] = useState(null);
  const [showSmartChat, setShowSmartChat] = useState(false);

  // Add Deal Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [targetStage, setTargetStage] = useState('Qualification');
  const [newDeal, setNewDeal] = useState({ title: '', company: '', value: '', owner: 'Ted Watson' });

  // Keyboard Event Listener for Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowCtrlK(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleAddDeal = (e) => {
    e.preventDefault();
    if (!newDeal.title.trim()) return;
    const dealToAdd = {
      id: Date.now(),
      title: newDeal.title,
      company: newDeal.company || 'Unknown',
      value: Number(newDeal.value) || 0,
      stage: targetStage,
      owner: newDeal.owner,
      date: 'Today'
    };
    setDeals(prev => [...prev, dealToAdd]);
    setNewDeal({ title: '', company: '', value: '', owner: 'Ted Watson' });
    setShowAddModal(false);
  };

  const sortedDeals = [...deals].sort((a, b) => {
    if (sortBy === 'Amount') {
      return sortOrder === 'Asc' ? a.value - b.value : b.value - a.value;
    }
    return sortOrder === 'Asc' ? a.id - b.id : b.id - a.id;
  });

  return (
    <div className="flex flex-col h-screen w-screen bg-[#f4f6f9] text-slate-800 text-xs font-sans overflow-hidden select-none">
      
      {/* TOP HEADER / SEARCH BAR */}
      <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-white bg-[#0f172a] px-3 py-2 rounded-lg">
            <span className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">E</span>
            <div className="flex flex-col">
              <span className="text-[11px] font-black leading-none">CRM Enterprise</span>
              <span className="text-[9px] text-slate-400 font-normal">SALES PLATFORM</span>
            </div>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowCtrlK(true)} 
              className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-500 hover:border-slate-300 transition-all w-80 text-left"
            >
              <FiSearch className="w-3.5 h-3.5 text-slate-400" />
              <span className="flex-1 text-[11px]">Search deals, contacts, tasks...</span>
              <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-mono">Ctrl K</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => { setTargetStage('Qualification'); setShowAddModal(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
            <FiPlus className="w-3.5 h-3.5" /> Add Deal
          </button>
          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
              ER
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-slate-900 text-[11px]">Elena Rostova</span>
              <span className="text-[9px] text-slate-400">SYSTEM ADMIN</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN BODY LAYOUT WITH ORIGINAL DARK SIDEBAR */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* LEFT DARK NAVIGATION SIDEBAR */}
        <aside className="w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col py-4 px-3 gap-1 shrink-0 z-10 text-slate-300">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">Main Navigation</div>
          
          <button onClick={() => setActiveTab('pipelines')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${activeTab === 'pipelines' ? 'bg-indigo-600 text-white font-bold shadow-md' : 'hover:bg-slate-800/60 text-slate-300'}`}>
            <FiBriefcase className="w-4 h-4" /> Deals Pipeline
          </button>
          <button onClick={() => setActiveTab('contacts')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${activeTab === 'contacts' ? 'bg-indigo-600 text-white font-bold shadow-md' : 'hover:bg-slate-800/60 text-slate-300'}`}>
            <FiUsers className="w-4 h-4" /> Contacts
          </button>
          <button onClick={() => setActiveTab('companies')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${activeTab === 'companies' ? 'bg-indigo-600 text-white font-bold shadow-md' : 'hover:bg-slate-800/60 text-slate-300'}`}>
            <FiFolder className="w-4 h-4" /> Companies
          </button>
          <button onClick={() => setActiveTab('products')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${activeTab === 'products' ? 'bg-indigo-600 text-white font-bold shadow-md' : 'hover:bg-slate-800/60 text-slate-300'}`}>
            <FiBox className="w-4 h-4" /> Products
          </button>
          <button onClick={() => setActiveTab('calendar')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${activeTab === 'calendar' ? 'bg-indigo-600 text-white font-bold shadow-md' : 'hover:bg-slate-800/60 text-slate-300'}`}>
            <FiCalendar className="w-4 h-4" /> Activities / Calendar
          </button>
          <button onClick={() => setActiveTab('analytics')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${activeTab === 'analytics' ? 'bg-indigo-600 text-white font-bold shadow-md' : 'hover:bg-slate-800/60 text-slate-300'}`}>
            <FiBarChart2 className="w-4 h-4" /> Analytics Dashboard
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${activeTab === 'settings' ? 'bg-indigo-600 text-white font-bold shadow-md' : 'hover:bg-slate-800/60 text-slate-300'}`}>
            <FiSettings className="w-4 h-4" /> Settings & RBAC
          </button>

          <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between px-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">ER</div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-[11px]">Elena Rostova</span>
                <span className="text-[9px] text-slate-400">admin@enterprise.io</span>
              </div>
            </div>
            <FiLogOut className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
          </div>
        </aside>

        {/* PIPELINES MAIN VIEW */}
        {activeTab === 'pipelines' && (
          <div className="flex-1 flex flex-col overflow-hidden relative">
            
            {/* VIEW SUB-HEADER CONTROL BAR */}
            <div className="h-12 border-b border-slate-200 px-4 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                
                {/* Filter Icon Button */}
                <button 
                  onClick={() => setShowFilterDrawer(true)} 
                  className={`p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 ${showFilterDrawer ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'text-slate-600'}`}
                >
                  <FiFilter className="w-4 h-4" />
                </button>

                {/* View Dropdown ("All Deals") */}
                <div className="relative">
                  <button 
                    onClick={() => setShowViewDropdown(prev => !prev)}
                    className="flex items-center gap-2 px-3 py-1.5 border border-emerald-500 text-emerald-700 rounded-full font-bold bg-white hover:bg-emerald-50 transition-all text-xs shadow-sm"
                  >
                    <span>All Deals</span>
                    <FiChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Views Popup List */}
                  {showViewDropdown && (
                    <div className="absolute top-10 left-0 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 text-xs">
                      <div className="flex border-b border-slate-100 pb-1.5 mb-2 gap-4 text-slate-500 font-semibold px-2">
                        <span className="text-emerald-600 border-b-2 border-emerald-600 pb-0.5 cursor-pointer">All Views</span>
                        <span className="hover:text-slate-800 cursor-pointer">Favorites</span>
                      </div>
                      <div className="relative mb-2">
                        <input type="text" placeholder="Search Views" className="w-full border border-slate-200 rounded px-2 py-1 text-xs outline-none focus:border-emerald-500" />
                      </div>
                      <div className="space-y-1 text-slate-700 font-medium max-h-48 overflow-y-auto">
                        <div className="px-2 py-1.5 bg-emerald-50 text-emerald-700 font-bold rounded cursor-pointer">All Deals</div>
                        <div className="px-2 py-1.5 hover:bg-slate-100 rounded cursor-pointer">All External Shared Deals</div>
                        <div className="px-2 py-1.5 hover:bg-slate-100 rounded cursor-pointer">Closing Next Month</div>
                        <div className="px-2 py-1.5 hover:bg-slate-100 rounded cursor-pointer">Closing This Month</div>
                        <div className="px-2 py-1.5 hover:bg-slate-100 rounded cursor-pointer">My Deals</div>
                        <div className="px-2 py-1.5 hover:bg-slate-100 rounded cursor-pointer">Recently Created Deals</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sorting & Order Popover Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Sort By</span>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-slate-200 bg-white rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="Created Time">Created Time</option>
                    <option value="Amount">Amount</option>
                  </select>
                </div>

                {/* Asc / Desc Dropdown Toggle */}
                <div className="relative">
                  <button 
                    onClick={() => setShowSortMenu(prev => !prev)}
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center"
                  >
                    <FiSliders className="w-4 h-4" />
                  </button>

                  {showSortMenu && (
                    <div className="absolute right-0 top-9 w-28 bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1">
                      <button 
                        onClick={() => { setSortOrder('Asc'); setShowSortMenu(false); }} 
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 ${sortOrder === 'Asc' ? 'font-bold text-emerald-600 bg-emerald-50' : ''}`}
                      >
                        Ascending
                      </button>
                      <button 
                        onClick={() => { setSortOrder('Desc'); setShowSortMenu(false); }} 
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 ${sortOrder === 'Desc' ? 'font-bold text-emerald-600 bg-emerald-50' : ''}`}
                      >
                        Descending
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* KANBAN BOARD CONTAINER */}
            <div className="flex-1 overflow-x-auto p-4 flex gap-3 items-start">
              {STAGES.map((stage) => {
                const stageDeals = sortedDeals.filter(d => d.stage === stage);
                const stageTotal = stageDeals.reduce((sum, d) => sum + d.value, 0);
                const isExpanded = expandedColumn === stage;

                return (
                  <div 
                    key={stage} 
                    className={`bg-white border border-slate-200 rounded-xl flex flex-col transition-all h-full shadow-sm ${isExpanded ? 'w-[400px]' : 'w-[260px] min-w-[260px]'}`}
                  >
                    {/* Stage Header */}
                    <div className="p-3 border-b border-slate-200 flex flex-col gap-1 bg-slate-50/50 rounded-t-xl">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span className="truncate">{stage}</span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-normal bg-slate-200/60 px-1.5 py-0.5 rounded">
                          <span>{stageDeals.length} Deal{stageDeals.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      <div className="text-xs font-black text-slate-900">
                        ₹{stageTotal.toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* Stage Card List */}
                    <div className="p-2.5 flex-1 overflow-y-auto space-y-2.5">
                      {stageDeals.map(deal => (
                        <div key={deal.id} className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all group">
                          <div className="font-bold text-slate-900 mb-1">{deal.title}</div>
                          <div className="text-slate-500 text-[11px] font-medium">{deal.owner}</div>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 font-extrabold text-slate-800">
                            <span>₹{deal.value.toLocaleString('en-IN')}</span>
                            <span className="text-[10px] text-amber-600 font-semibold">{deal.date}</span>
                          </div>
                          <div className="mt-2 text-[10px] text-slate-400 border border-dashed border-slate-200 p-1.5 rounded hover:bg-slate-50 cursor-pointer text-center">
                            Add a Description for this stage
                          </div>
                        </div>
                      ))}

                      {stageDeals.length === 0 && (
                        <div className="h-32 flex flex-col items-center justify-center text-slate-400 text-[11px] font-medium">
                          This stage is empty
                        </div>
                      )}
                    </div>

                    {/* Column Bottom Toolbar (+ Deal & Expand Button) */}
                    <div className="p-2.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between rounded-b-xl text-slate-500">
                      <button 
                        onClick={() => { setTargetStage(stage); setShowAddModal(true); }}
                        className="flex items-center gap-1 text-emerald-600 font-bold hover:bg-emerald-50 px-2.5 py-1 rounded transition-all text-xs"
                      >
                        <FiPlus className="w-3.5 h-3.5" />
                        <span>Deal</span>
                      </button>

                      <button 
                        onClick={() => setExpandedColumn(isExpanded ? null : stage)}
                        className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-all"
                        title={isExpanded ? "Collapse Column" : "Expand Column"}
                      >
                        {isExpanded ? <FiMinimize2 className="w-3.5 h-3.5" /> : <FiMaximize2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* HOVER PANEL / TEAM PIPELINES LEFT FLYOUT MENU */}
            <div 
              onMouseEnter={() => hoverPanelEnabled && setShowTeamPipelines(true)}
              onMouseLeave={() => setShowTeamPipelines(false)}
              className="absolute left-0 top-0 bottom-0 z-30 flex items-center"
            >
              {/* Trigger Handle Area */}
              <div className="w-3 h-full cursor-pointer flex items-center justify-center">
                <div className="w-1.5 h-12 bg-slate-300 rounded-full hover:bg-emerald-500 transition-all shadow" />
              </div>

              {/* Flyout Box */}
              {showTeamPipelines && (
                <div className="w-64 bg-white border border-slate-200 shadow-2xl h-full flex flex-col p-3.5 z-40 text-xs">
                  <div className="font-bold text-slate-900 mb-3 flex items-center justify-between">
                    <span>Team Pipelines</span>
                    <button className="p-1 hover:bg-slate-100 rounded text-slate-600"><FiPlus className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="p-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-lg mb-4 cursor-pointer shadow-sm">
                    Sales Pipeline
                  </div>

                  <div className="font-bold text-slate-400 text-[10px] uppercase mb-2 tracking-wider">Clone from a Template</div>
                  
                  {/* For Teams Accordion */}
                  <div className="border-b border-slate-100 py-2">
                    <button onClick={() => setOpenTeamsAccordion(!openTeamsAccordion)} className="flex items-center justify-between w-full font-bold text-slate-700">
                      <span>For Teams</span>
                      {openTeamsAccordion ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                    {openTeamsAccordion && (
                      <div className="pl-3 mt-2 space-y-2 text-slate-600 font-medium max-h-36 overflow-y-auto">
                        <div className="hover:text-emerald-600 cursor-pointer">Sales Pipeline</div>
                        <div className="hover:text-emerald-600 cursor-pointer">Customer Support</div>
                        <div className="hover:text-emerald-600 cursor-pointer">Project Tracker</div>
                        <div className="hover:text-emerald-600 cursor-pointer">Recruitment</div>
                      </div>
                    )}
                  </div>

                  {/* For Industries Accordion */}
                  <div className="border-b border-slate-100 py-2">
                    <button onClick={() => setOpenIndustriesAccordion(!openIndustriesAccordion)} className="flex items-center justify-between w-full font-bold text-slate-700">
                      <span>For Industries</span>
                      {openIndustriesAccordion ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                    {openIndustriesAccordion && (
                      <div className="pl-3 mt-2 space-y-2 text-slate-600 font-medium max-h-36 overflow-y-auto">
                        <div className="hover:text-emerald-600 cursor-pointer">Real Estate</div>
                        <div className="hover:text-emerald-600 cursor-pointer">Interior Design</div>
                        <div className="hover:text-emerald-600 cursor-pointer">Software Consulting</div>
                        <div className="hover:text-emerald-600 cursor-pointer">Insurance</div>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-3 border-t border-slate-200">
                    <button 
                      onClick={() => setHoverPanelEnabled(!hoverPanelEnabled)}
                      className="text-emerald-600 hover:underline font-bold text-[11px]"
                    >
                      {hoverPanelEnabled ? 'Disable Hover Panel' : 'Enable Hover Panel'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* FILTER SALES PIPELINE DRAWER */}
            {showFilterDrawer && (
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-white border-r border-slate-200 shadow-2xl z-40 p-4 flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                  <h3 className="font-black text-slate-800 text-sm">Filter Sales Pipeline</h3>
                  <button onClick={() => setShowFilterDrawer(false)} className="p-1 hover:bg-slate-100 rounded text-slate-500"><FiX className="w-4 h-4"/></button>
                </div>
                
                <div className="flex-1 space-y-3">
                  <label className="text-[11px] font-bold text-slate-500 block">Choose a Property</label>
                  <select className="w-full border border-slate-200 rounded-lg p-2 font-medium text-slate-700 outline-none focus:border-emerald-500">
                    <option>Touched Records</option>
                    <option>Untouched Records</option>
                    <option>Deal Owner</option>
                    <option>Company Name</option>
                    <option>Stage</option>
                    <option>Amount</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center gap-2">
                  <button onClick={() => setShowFilterDrawer(false)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg shadow-sm">
                    Apply Filter
                  </button>
                  <button onClick={() => setShowFilterDrawer(false)} className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold rounded-lg">
                    Close
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* OTHER SIDEBAR TABS VIEWS (Contacts, Companies, Products, Calendar, Analytics, Settings) */}
        {activeTab !== 'pipelines' && (
          <div className="flex-1 bg-white p-8 flex flex-col items-center justify-center">
            <div className="border border-slate-200 p-8 rounded-2xl flex flex-col items-center gap-3 max-w-sm text-center shadow-sm">
              <FiBriefcase className="w-12 h-12 text-indigo-500" />
              <h2 className="font-extrabold text-slate-800 text-base uppercase tracking-wider">{activeTab} View</h2>
              <p className="text-slate-500 text-xs">This module is fully configured and connected to your enterprise account.</p>
            </div>
          </div>
        )}

      </div>

      {/* BOTTOM TOOLBAR / SMART CHAT ASSISTANT */}
      <footer className="h-8 bg-white border-t border-slate-200 px-4 flex items-center justify-between text-[11px] text-slate-500 z-20 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => setShowSmartChat(prev => !prev)} className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-emerald-600">
            <FiMessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Here is your Smart Chat (Ctrl+Space)</span>
          </button>
        </div>
      </footer>

      {/* SMART CHAT POPUP DRAWER */}
      {showSmartChat && (
        <div className="fixed bottom-9 right-6 w-80 h-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="p-3 bg-indigo-600 text-white font-bold flex items-center justify-between">
            <span>Smart Chat</span>
            <button onClick={() => setShowSmartChat(false)} className="hover:bg-indigo-700 p-1 rounded"><FiX /></button>
          </div>
          <div className="p-3 flex-1 overflow-y-auto flex flex-col justify-center items-center text-center text-slate-400">
            <FiMessageSquare className="w-8 h-8 mb-2 text-slate-300" />
            <p>No active conversations yet.</p>
          </div>
        </div>
      )}

      {/* CTRL + K COMMAND PALETTE MODAL */}
      {showCtrlK && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-3 border-b border-slate-200 flex items-center gap-2">
              <FiSearch className="w-4 h-4 text-slate-400" />
              <input type="text" autoFocus placeholder="Type a command or search deals..." className="w-full text-xs font-semibold outline-none text-slate-800" />
              <button onClick={() => setShowCtrlK(false)} className="text-xs text-slate-500 px-1.5 py-0.5 bg-slate-100 rounded font-bold">ESC</button>
            </div>
            <div className="p-3 text-slate-500 text-xs">
              <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">Quick Links</div>
              <div className="p-2 hover:bg-slate-100 rounded cursor-pointer font-bold text-slate-700">Go to Deals Pipeline</div>
              <div className="p-2 hover:bg-slate-100 rounded cursor-pointer font-bold text-slate-700">Open Settings & RBAC</div>
            </div>
          </div>
        </div>
      )}

      {/* ADD DEAL MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-sm">Add New Deal ({targetStage})</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-slate-100 rounded text-slate-500"><FiX /></button>
            </div>
            <form onSubmit={handleAddDeal} className="py-4 space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1">Deal Title *</label>
                <input required type="text" value={newDeal.title} onChange={e => setNewDeal({...newDeal, title: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2 font-medium outline-none focus:border-indigo-500" placeholder="e.g. Enterprise License" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Amount (₹)</label>
                  <input type="number" value={newDeal.value} onChange={e => setNewDeal({...newDeal, value: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2 font-medium outline-none focus:border-indigo-500" placeholder="50000" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Owner</label>
                  <input type="text" value={newDeal.owner} onChange={e => setNewDeal({...newDeal, owner: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2 font-medium outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg font-bold text-slate-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm">Save Deal</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}