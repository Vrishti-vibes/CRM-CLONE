import React, { useEffect, useState, useCallback } from 'react';
import { contactService } from '../services/contactService';
import ContactModal from '../components/contacts/ContactModal';
import {
  FiUsers,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await contactService.getContacts({
        page,
        size: 8,
        search: search || undefined,
        status: statusFilter || undefined,
      });
      setContacts(res.items);
      setTotalPages(res.pages);
      setTotalItems(res.total);
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleCreateOrUpdate = async (formData) => {
    if (editingContact) {
      await contactService.updateContact(editingContact.id, formData);
    } else {
      await contactService.createContact(formData);
    }
    fetchContacts();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.deleteContact(id);
        fetchContacts();
      } catch (err) {
        console.error('Failed to delete contact:', err);
      }
    }
  };

  const openCreateModal = () => {
    setEditingContact(null);
    setModalOpen(true);
  };

  const openEditModal = (contact) => {
    setEditingContact(contact);
    setModalOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CUSTOMER':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'PROSPECT':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <FiUsers className="text-brand-500" />
            <span>Contacts Directory</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage your sales leads, prospects, and customer relationships ({totalItems} total)
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-brand-600/30 transition-all self-start sm:self-auto"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, email, company..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-slate-200 placeholder-slate-400 text-xs focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-44 px-3 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="">All Statuses</option>
            <option value="LEAD">Leads</option>
            <option value="PROSPECT">Prospects</option>
            <option value="CUSTOMER">Customers</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-slate-300 text-xs">
            <thead className="bg-slate-800/60 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Company & Title</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-slate-400 font-medium">
                    Loading contacts directory...
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-slate-400">
                    No contacts found matching criteria.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-600/20 text-brand-400 border border-brand-500/30 font-bold flex items-center justify-center">
                          {contact.first_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {contact.first_name} {contact.last_name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="flex items-center gap-1.5 text-slate-300">
                          <FiMail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{contact.email}</span>
                        </p>
                        {contact.phone && (
                          <p className="flex items-center gap-1.5 text-slate-400">
                            <FiPhone className="w-3.5 h-3.5" />
                            <span>{contact.phone}</span>
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="font-medium text-slate-200">
                          {contact.company_name || 'N/A'}
                        </p>
                        <p className="flex items-center gap-1 text-slate-400 text-[11px]">
                          <FiBriefcase className="w-3 h-3" />
                          <span>{contact.job_title || 'N/A'}</span>
                        </p>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold border ${getStatusBadge(
                          contact.status
                        )}`}
                      >
                        {contact.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(contact)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Edit Contact"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors"
                          title="Delete Contact"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="p-2 rounded-lg bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-white transition-colors"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="p-2 rounded-lg bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-white transition-colors"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Form */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={editingContact}
      />
    </div>
  );
}