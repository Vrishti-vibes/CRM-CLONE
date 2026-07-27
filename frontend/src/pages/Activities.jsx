import React, { useState } from 'react';
import { FiSearch, FiPlus, FiClock, FiCheckCircle, FiX, FiPhone, FiVideo, FiList, FiCalendar } from 'react-icons/fi';

export default function Activities() {
  const [activities, setActivities] = useState([
    { id: 1, title: 'Introductory Call with Zylker Corp', type: 'Call', date: '2026-07-27', time: '2:30 PM', status: 'Pending', deal: 'Zylker Yearly Subscription' },
    { id: 2, title: 'Technical Architecture Review', type: 'Meeting', date: '2026-07-28', time: '11:00 AM', status: 'Upcoming', deal: 'Cloud Migration Setup' },
    { id: 3, title: 'Send revised enterprise proposal', type: 'Task', date: '2026-07-30', time: '5:00 PM', status: 'Completed', deal: 'Enterprise Software License' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [showAddModal, setShowAddModal] = useState(false);
  const [newActivity, setNewActivity] = useState({ title: '', type: 'Call', date: '2026-07-27', time: '10:00 AM', deal: '' });

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newActivity.title.trim()) return;
    setActivities(prev => [{ id: Date.now(), ...newActivity, status: 'Pending' }, ...prev]);
    setNewActivity({ title: '', type: 'Call', date: '2026-07-27', time: '10:00 AM', deal: '' });
    setShowAddModal(false);
  };

  const toggleComplete = (id) => {
    setActivities(prev => prev.map(act => act.id === id ? { ...act, status: act.status === 'Completed' ? 'Pending' : 'Completed' } : act));
  };

  const filteredActivities = activities.filter(act => {
    if (activeTab !== 'All' && act.type !== activeTab) return false;
    return act.title.toLowerCase().includes(searchTerm.toLowerCase()) || act.deal.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Simple calendar days generator for July 2026
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-darkbg text-slate-800 dark:text-slate-100 overflow-hidden select-none">
      
      {/* Top Header Bar */}
      <div className="h-14 bg-white dark:bg-darkbg-card border-b border-slate-200 dark:border-darkbg-border px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search activities..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl text-xs font-semibold outline-none w-56"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-darkbg p-1 rounded-xl text-xs font-bold">
            {['All', 'Call', 'Meeting', 'Task'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-darkbg p-1 rounded-xl text-xs font-bold">
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg cursor-pointer ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
              <FiList className="w-3.5 h-3.5" /> List
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg cursor-pointer ${viewMode === 'calendar' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
              <FiCalendar className="w-3.5 h-3.5" /> Calendar
            </button>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
          >
            <FiPlus className="w-4 h-4" /> Add Activity
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {viewMode === 'list' ? (
          <div className="space-y-3 max-w-4xl mx-auto">
            {filteredActivities.map(act => (
              <div key={act.id} className="bg-white dark:bg-darkbg-card p-4 rounded-2xl border border-slate-200 dark:border-darkbg-border shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleComplete(act.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${act.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}
                  >
                    {act.status === 'Completed' && <FiCheckCircle className="w-4 h-4" />}
                  </button>
                  <div>
                    <h4 className={`text-xs font-black ${act.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                      {act.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        {act.type === 'Call' ? <FiPhone className="w-3 h-3 text-indigo-500" /> : <FiVideo className="w-3 h-3 text-indigo-500" />}
                        {act.type}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><FiClock className="w-3 h-3" /> {act.date} at {act.time}</span>
                      <span>•</span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{act.deal}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${act.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/50'}`}>
                    {act.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Calendar Grid View */
          <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase">July 2026 Calendar View</h3>
              <span className="text-xs font-bold text-indigo-600">Total Activities: {activities.length}</span>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-[11px] font-black uppercase text-slate-400 py-2">
                  {day}
                </div>
              ))}
              {/* Offset for start of month */}
              <div className="h-24 bg-slate-50/50 dark:bg-darkbg/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800"></div>
              <div className="h-24 bg-slate-50/50 dark:bg-darkbg/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800"></div>
              
              {calendarDays.map(day => {
                const dayStr = `2026-07-${day < 10 ? '0' + day : day}`;
                const dayActivities = activities.filter(a => a.date === dayStr);

                return (
                  <div key={day} className="h-28 bg-slate-50 dark:bg-darkbg rounded-xl border border-slate-200 dark:border-darkbg-border p-2 overflow-y-auto">
                    <span className={`text-xs font-black ${day === 27 ? 'bg-indigo-600 text-white px-1.5 py-0.5 rounded-md' : 'text-slate-700 dark:text-slate-300'}`}>
                      {day}
                    </span>
                    <div className="mt-1.5 space-y-1">
                      {dayActivities.map(act => (
                        <div key={act.id} className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 p-1 rounded truncate">
                          {act.time} - {act.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add Activity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-darkbg-card rounded-3xl shadow-2xl border border-slate-200 dark:border-darkbg-border p-6 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-darkbg-border">
              <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white">Schedule Activity</h3>
              <button onClick={() => setShowAddModal(false)} className="cursor-pointer"><FiX className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAddActivity} className="py-4 space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Activity Title</label>
                <input 
                  type="text" required placeholder="e.g. Follow-up demo call"
                  value={newActivity.title} onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Type</label>
                  <select 
                    value={newActivity.type} onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none cursor-pointer"
                  >
                    <option value="Call">Call</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Task">Task</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Date</label>
                  <input 
                    type="date" 
                    value={newActivity.date} onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2 text-xs font-semibold outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Time</label>
                  <input 
                    type="text" placeholder="e.g. 2:30 PM"
                    value={newActivity.time} onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Associated Deal</label>
                  <input 
                    type="text" placeholder="e.g. Zylker Subscription"
                    value={newActivity.deal} onChange={(e) => setNewActivity({...newActivity, deal: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 dark:bg-darkbg text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}