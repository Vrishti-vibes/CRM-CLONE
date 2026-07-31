import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { 
  FiSearch, FiPlus, FiFilter, FiX, FiSliders, FiMaximize2, FiMinimize2, FiChevronDown, FiUser, FiDollarSign, FiCalendar, FiBriefcase, FiCheck 
} from 'react-icons/fi';

const INITIAL_DEALS = [
  { id: 1, title: 'Website Development', company: 'Tech Solutions', value: 70000, stage: 'Qualification', owner: 'Ted Watson', date: 'Today', description: 'Client needs a full stack web portal.' },
  { id: 2, title: 'Zylker Yearly Subscription', company: 'Zylker Corp', value: 5671, stage: 'Needs Analysis', owner: 'Ted Watson', date: 'Jul 27', description: 'Annual SaaS renewal discussion.' },
  { id: 3, title: 'Cloud Migration Setup', company: 'Cyberdyne', value: 150000, stage: 'Proposal/Price Quote', owner: 'Sarah Connor', date: 'Aug 02', description: 'AWS infrastructure migration.' },
  { id: 4, title: 'Enterprise Software License', company: 'Continental', value: 250000, stage: 'Negotiation/Review', owner: 'System Admin', date: 'Aug 05', description: 'Enterprise deal review in progress.' },
];

const STAGES = ['Qualification', 'Proposal/Price Quote', 'Needs Analysis', 'Negotiation/Review', 'Closed Won', 'Closed Lost'];

const Deals = forwardRef(({ onRegisterRef }, ref) => {
  const [deals, setDeals] = useState(() => {
    const saved = localStorage.getItem('bigin_deals_v3');
    return saved ? JSON.parse(saved) : INITIAL_DEALS;
  });

  useEffect(() => {
    localStorage.setItem('bigin_deals_v3', JSON.stringify(deals));
  }, [deals]);

  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortOrder, setSortOrder] = useState('Desc');
  const [sortBy, setSortBy] = useState('Created Time');

  // Filter States
  const [filterOwner, setFilterOwner] = useState('All');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const [expandedColumn, setExpandedColumn] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [targetStage, setTargetStage] = useState('Qualification');
  const [newDeal, setNewDeal] = useState({ title: '', company: '', value: '', owner: 'Ted Watson', description: '' });
  const [selectedDeal, setSelectedDeal] = useState(null);

  const handleAddDealDirect = (dealData, stageId) => {
    const dealToAdd = {
      id: Date.now(),
      title: dealData.title || 'Untitled Deal',
      company: dealData.company || 'Unknown Corp',
      value: Number(dealData.value) || 0,
      stage: stageId || 'Qualification',
      owner: dealData.owner || 'Ted Watson',
      date: 'Today',
      description: dealData.description || ''
    };
    setDeals(prev => [...prev, dealToAdd]);
  };

  useImperativeHandle(ref, () => ({
    handleAddDealDirect
  }));

  useEffect(() => {
    if (onRegisterRef) {
      onRegisterRef({ handleAddDealDirect });
    }
  }, [onRegisterRef]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newDeal.title.trim()) return;
    handleAddDealDirect(newDeal, targetStage);
    setNewDeal({ title: '', company: '', value: '', owner: 'Ted Watson', description: '' });
    setShowAddModal(false);
  };

  const updateDealStage = (dealId, newStage) => {
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: newStage } : d));
    if (selectedDeal && selectedDeal.id === dealId) {
      setSelectedDeal(prev => ({ ...prev, stage: newStage }));
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, dealId) => {
    e.dataTransfer.setData('text/plain', dealId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, stageName) => {
    e.preventDefault();
    const dealId = Number(e.dataTransfer.getData('text/plain'));
    if (dealId) {
      updateDealStage(dealId, stageName);
    }
  };

  // Filtering & Sorting Logic
  const filteredDeals = deals.filter(deal => {
    if (filterOwner !== 'All' && deal.owner !== filterOwner) return false;
    if (minAmount && deal.value < Number(minAmount)) return false;
    if (maxAmount && deal.value > Number(maxAmount)) return false;
    return true;
  });

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (sortBy === 'Amount') {
      return sortOrder === 'Asc' ? a.value - b.value : b.value - a.value;
    }
    return sortOrder === 'Asc' ? a.id - b.id : b.id - a.id;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f4f6f9] text-slate-800 text-xs font-sans overflow-hidden relative select-none">
      
      {/* VIEW SUB-HEADER CONTROL BAR */}
      <div className="h-12 border-b border-slate-200 px-4 flex items-center justify-between bg-white shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowFilterDrawer(prev => !prev)} 
            className={`p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center gap-1.5 font-bold ${showFilterDrawer || filterOwner !== 'All' || minAmount || maxAmount ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'text-slate-600'}`}
          >
            <FiFilter className="w-4 h-4" />
            <span>Filter</span>
          </button>

          <div className="relative">
            <button 
              onClick={() => setShowViewDropdown(prev => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 border border-indigo-500 text-indigo-700 rounded-full font-bold bg-white hover:bg-indigo-50 transition-all text-xs shadow-sm"
            >
              <span>All Deals</span>
              <FiChevronDown className="w-3.5 h-3.5" />
            </button>

            {showViewDropdown && (
              <div className="absolute top-10 left-0 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 text-xs">
                <div className="flex border-b border-slate-100 pb-1.5 mb-2 gap-4 text-slate-500 font-semibold px-2">
                  <span className="text-indigo-600 border-b-2 border-indigo-600 pb-0.5 cursor-pointer">All Views</span>
                </div>
                <div className="space-y-1 text-slate-700 font-medium max-h-48 overflow-y-auto">
                  <div className="px-2 py-1.5 bg-indigo-50 text-indigo-700 font-bold rounded cursor-pointer">All Deals</div>
                  <div className="px-2 py-1.5 hover:bg-slate-100 rounded cursor-pointer">My Deals</div>
                </div>
              </div>
            )}
          </div>
        </div>

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

          <div className="relative">
            <button 
              onClick={() => setShowSortMenu(prev => !prev)}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center"
            >
              <FiSliders className="w-4 h-4" />
            </button>

            {showSortMenu && (
              <div className="absolute right-0 top-9 w-28 bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1">
                <button onClick={() => { setSortOrder('Asc'); setShowSortMenu(false); }} className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 ${sortOrder === 'Asc' ? 'font-bold text-indigo-600 bg-indigo-50' : ''}`}>Ascending</button>
                <button onClick={() => { setSortOrder('Desc'); setShowSortMenu(false); }} className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 ${sortOrder === 'Desc' ? 'font-bold text-indigo-600 bg-indigo-50' : ''}`}>Descending</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KANBAN BOARD CONTAINER WITH DRAG AND DROP */}
      <div className="flex-1 overflow-x-auto p-4 flex gap-3 items-start relative">
        {STAGES.map((stage) => {
          const stageDeals = sortedDeals.filter(d => d.stage === stage);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.value, 0);
          const isExpanded = expandedColumn === stage;

          return (
            <div 
              key={stage} 
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
              className={`bg-white border border-slate-200 rounded-xl flex flex-col transition-all h-full shadow-sm ${isExpanded ? 'w-[400px]' : 'w-[260px] min-w-[260px]'}`}
            >
              <div className="p-3 border-b border-slate-200 flex flex-col gap-1 bg-slate-50/50 rounded-t-xl">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="truncate">{stage}</span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 font-normal bg-slate-200/60 px-1.5 py-0.5 rounded">
                    <span>{stageDeals.length} Deal{stageDeals.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                <div className="text-xs font-black text-slate-900">₹{stageTotal.toLocaleString('en-IN')}</div>
              </div>

              <div className="p-2.5 flex-1 overflow-y-auto space-y-2.5">
                {stageDeals.map(deal => (
                  <div 
                    key={deal.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, deal.id)}
                    onClick={() => setSelectedDeal(deal)}
                    className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm hover:border-indigo-500 hover:shadow-md transition-all group cursor-grab active:cursor-grabbing"
                  >
                    <div className="font-bold text-slate-900 mb-1">{deal.title}</div>
                    <div className="text-slate-500 text-[11px] font-medium flex items-center gap-1">
                      <FiBriefcase className="w-3 h-3 text-slate-400" /> {deal.company}
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 font-extrabold text-slate-800">
                      <span>₹{deal.value.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-amber-600 font-semibold">{deal.date}</span>
                    </div>
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div className="h-32 flex flex-col items-center justify-center text-slate-400 text-[11px] font-medium border-2 border-dashed border-slate-100 rounded-lg m-1">
                    Drop deals here or empty
                  </div>
                )}
              </div>

              <div className="p-2.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between rounded-b-xl text-slate-500">
                <button onClick={() => { setTargetStage(stage); setShowAddModal(true); }} className="flex items-center gap-1 text-indigo-600 font-bold hover:bg-indigo-50 px-2 py-1 rounded transition-all">
                  <FiPlus className="w-3.5 h-3.5" /><span>Deal</span>
                </button>
                <button onClick={() => setExpandedColumn(isExpanded ? null : stage)} className="p-1 hover:bg-slate-200 rounded text-slate-600">
                  {isExpanded ? <FiMinimize2 className="w-3.5 h-3.5" /> : <FiMaximize2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FILTER DRAWER WITH FULL OPTIONS */}
      {showFilterDrawer && (
        <div className="absolute left-0 top-0 bottom-0 w-80 bg-white border-r border-slate-200 shadow-2xl z-40 p-5 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <h3 className="font-black text-slate-900 text-sm flex items-center gap-2"><FiFilter className="text-indigo-600"/> Filter Deals</h3>
            <button onClick={() => setShowFilterDrawer(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><FiX className="w-4 h-4"/></button>
          </div>
          
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Deal Owner</label>
              <select 
                value={filterOwner} 
                onChange={(e) => setFilterOwner(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2 font-semibold text-slate-700 outline-none focus:border-indigo-500 bg-slate-50"
              >
                <option value="All">All Owners</option>
                <option value="Ted Watson">Ted Watson</option>
                <option value="Sarah Connor">Sarah Connor</option>
                <option value="System Admin">System Admin</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Min Amount (₹)</label>
                <input 
                  type="number" 
                  value={minAmount} 
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="0" 
                  className="w-full border border-slate-200 rounded-lg p-2 font-semibold text-slate-700 outline-none focus:border-indigo-500 bg-slate-50" 
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Max Amount (₹)</label>
                <input 
                  type="number" 
                  value={maxAmount} 
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="500000" 
                  className="w-full border border-slate-200 rounded-lg p-2 font-semibold text-slate-700 outline-none focus:border-indigo-500 bg-slate-50" 
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center gap-2">
            <button onClick={() => { setFilterOwner('All'); setMinAmount(''); setMaxAmount(''); }} className="flex-1 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold rounded-lg">Reset</button>
            <button onClick={() => setShowFilterDrawer(false)} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg shadow-sm">Apply</button>
          </div>
        </div>
      )}

      {/* DEAL DETAILS SLIDE-OVER DRAWER */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex justify-end">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{selectedDeal.company}</span>
                <h2 className="font-black text-slate-900 text-base">{selectedDeal.title}</h2>
              </div>
              <button onClick={() => setSelectedDeal(null)} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500"><FiX className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-100">
                <label className="text-[11px] font-bold text-indigo-900 block mb-2">Current Pipeline Stage</label>
                <select 
                  value={selectedDeal.stage} 
                  onChange={(e) => updateDealStage(selectedDeal.id, e.target.value)}
                  className="w-full bg-white border border-indigo-300 rounded-lg p-2 font-bold text-indigo-700 outline-none cursor-pointer"
                >
                  {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1 flex items-center gap-1"><FiDollarSign /> Deal Value</span>
                  <span className="text-sm font-black text-slate-900">₹{selectedDeal.value.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1 flex items-center gap-1"><FiUser /> Deal Owner</span>
                  <span className="text-xs font-bold text-slate-800">{selectedDeal.owner}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-700 mb-2">Description & Notes</h3>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-xs min-h-[80px]">
                  {selectedDeal.description || 'No description provided for this deal.'}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button onClick={() => setSelectedDeal(null)} className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-sm">Done</button>
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
            <form onSubmit={handleFormSubmit} className="py-4 space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1">Deal Title *</label>
                <input required type="text" value={newDeal.title} onChange={e => setNewDeal({...newDeal, title: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2 font-medium outline-none focus:border-indigo-500" placeholder="e.g. Enterprise License" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Company Name</label>
                  <input type="text" value={newDeal.company} onChange={e => setNewDeal({...newDeal, company: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2 font-medium outline-none focus:border-indigo-500" placeholder="Zylker Corp" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Amount (₹)</label>
                  <input type="number" value={newDeal.value} onChange={e => setNewDeal({...newDeal, value: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2 font-medium outline-none focus:border-indigo-500" placeholder="50000" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1">Description</label>
                <textarea value={newDeal.description} onChange={e => setNewDeal({...newDeal, description: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2 font-medium outline-none focus:border-indigo-500 h-20 resize-none" placeholder="Add deal summary..." />
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
});

export default Deals;