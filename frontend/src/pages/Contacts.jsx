import React, { useState } from 'react';
import { FiSearch, FiPlus, FiMail, FiPhone, FiX } from 'react-icons/fi';

export default function Contacts() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Ted Watson', email: 'ted.watson@zylker.com', phone: '+91 98765 43210', company: 'Zylker Corp', deals: 'Zylker Yearly Subscription' },
    { id: 2, name: 'Sarah Connor', email: 's.connor@cyberdyne.com', phone: '+91 91234 56789', company: 'Cyberdyne', deals: 'Cloud Migration Setup' },
    { id: 3, name: 'John Wick', email: 'john@continental.org', phone: '+91 99887 76655', company: 'Continental', deals: 'Enterprise Software License' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', company: '', deals: '' });

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContact.name.trim()) return;
    setContacts(prev => [{ id: Date.now(), ...newContact }, ...prev]);
    setNewContact({ name: '', email: '', phone: '', company: '', deals: '' });
    setShowAddModal(false);
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-darkbg text-slate-800 dark:text-slate-100 overflow-hidden select-none">
      
      {/* Top Header Bar */}
      <div className="h-14 bg-white dark:bg-darkbg-card border-b border-slate-200 dark:border-darkbg-border px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search contacts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl text-xs font-semibold outline-none w-64"
            />
          </div>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
        >
          <FiPlus className="w-4 h-4" /> Add Contact
        </button>
      </div>

      {/* Contacts Table View */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-darkbg-border bg-slate-50/50 dark:bg-darkbg text-[11px] font-black uppercase text-slate-400">
                <th className="p-4">Contact Name</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Company</th>
                <th className="p-4">Associated Deal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredContacts.map(contact => (
                <tr key={contact.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      {contact.name.charAt(0)}
                    </div>
                    {contact.name}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5">
                    <FiMail className="w-3.5 h-3.5 text-slate-400" /> {contact.email}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 font-medium">
                    <span className="flex items-center gap-1.5"><FiPhone className="w-3.5 h-3.5 text-slate-400" /> {contact.phone}</span>
                  </td>
                  <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400">{contact.company}</td>
                  <td className="p-4 font-semibold text-slate-500">{contact.deals}</td>
                </tr>
              ))}
              {filteredContacts.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400 font-bold">No contacts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-darkbg-card rounded-3xl shadow-2xl border border-slate-200 dark:border-darkbg-border p-6 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-darkbg-border">
              <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white">Add New Contact</h3>
              <button onClick={() => setShowAddModal(false)} className="cursor-pointer"><FiX className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAddContact} className="py-4 space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Contact Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Email</label>
                <input 
                  type="email" 
                  placeholder="e.g. john@example.com"
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Phone</label>
                <input 
                  type="text" 
                  placeholder="e.g. +91 98765 43210"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Company</label>
                <input 
                  type="text" 
                  placeholder="e.g. Acme Inc"
                  value={newContact.company}
                  onChange={(e) => setNewContact({...newContact, company: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Associated Deal</label>
                <input 
                  type="text" 
                  placeholder="e.g. Annual Subscription"
                  value={newContact.deals}
                  onChange={(e) => setNewContact({...newContact, deals: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 dark:bg-darkbg text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">Save Contact</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}