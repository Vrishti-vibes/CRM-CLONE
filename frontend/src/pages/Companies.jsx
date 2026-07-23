import React, { useEffect, useState, useCallback } from 'react';
import { companyService } from '../services/companyService';
import CompanyModal from '../components/companies/CompanyModal';
import {
  FiBriefcase,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiGlobe,
  FiPhone,
  FiUsers,
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await companyService.getCompanies({
        page,
        size: 8,
        search: search || undefined,
        industry: industryFilter || undefined,
      });
      setCompanies(res.items);
      setTotalPages(res.pages);
      setTotalItems(res.total);
    } catch (err) {
      console.error('Failed to fetch companies:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search, industryFilter]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleCreateOrUpdate = async (formData) => {
    if (editingCompany) {
      await companyService.updateCompany(editingCompany.id, formData);
    } else {
      await companyService.createCompany(formData);
    }
    fetchCompanies();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company profile?')) {
      try {
        await companyService.deleteCompany(id);
        fetchCompanies();
      } catch (err) {
        console.error('Failed to delete company:', err);
      }
    }
  };

  const openCreateModal = () => {
    setEditingCompany(null);
    setModalOpen(true);
  };

  const openEditModal = (company) => {
    setEditingCompany(company);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <FiBriefcase className="text-brand-500" />
            <span>Companies Directory</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage your target accounts and corporate client accounts ({totalItems} total)
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-brand-600/30 transition-all self-start sm:self-auto"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Company</span>
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
            placeholder="Search by name, website, industry..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-slate-200 placeholder-slate-400 text-xs focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            value={industryFilter}
            onChange={(e) => {
              setIndustryFilter(e.target.value);
              setPage(1);
            }}
            placeholder="Filter by industry..."
            className="w-full sm:w-48 px-3.5 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-slate-200 placeholder-slate-400 text-xs focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-slate-300 text-xs">
            <thead className="bg-slate-800/60 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Company Name</th>
                <th className="p-4">Industry & Web</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Size & Revenue</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-slate-400 font-medium">
                    Loading companies directory...
                  </td>
                </tr>
              ) : companies.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-slate-400">
                    No companies found matching criteria.
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr key={company.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-bold flex items-center justify-center">
                          {company.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{company.name}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="font-medium text-slate-200">
                          {company.industry || 'General Industry'}
                        </p>
                        {company.website && (
                          <a
                            href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-brand-400 hover:underline text-[11px]"
                          >
                            <FiGlobe className="w-3 h-3" />
                            <span>{company.website}</span>
                          </a>
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      {company.phone ? (
                        <p className="flex items-center gap-1.5 text-slate-300">
                          <FiPhone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{company.phone}</span>
                        </p>
                      ) : (
                        <span className="text-slate-500">N/A</span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="space-y-1 text-[11px]">
                        <p className="flex items-center gap-1.5 text-slate-300">
                          <FiUsers className="w-3 h-3 text-slate-400" />
                          <span>
                            {company.employee_count ? `${company.employee_count} employees` : 'N/A'}
                          </span>
                        </p>
                        <p className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <FiDollarSign className="w-3 h-3" />
                          <span>
                            {company.annual_revenue
                              ? `$${company.annual_revenue.toLocaleString()}`
                              : 'N/A'}
                          </span>
                        </p>
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(company)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Edit Company"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(company.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors"
                          title="Delete Company"
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
      <CompanyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={editingCompany}
      />
    </div>
  );
}