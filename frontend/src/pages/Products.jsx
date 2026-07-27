import React, { useState } from 'react';
import { FiSearch, FiPlus, FiTag, FiBox, FiDollarSign, FiX } from 'react-icons/fi';

export default function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Enterprise Software License', code: 'SW-ENT-01', price: '₹2,50,000', category: 'Software', status: 'Active' },
    { id: 2, name: 'Cloud Migration Setup', code: 'SRV-CLD-02', price: '₹1,50,000', category: 'Professional Services', status: 'Active' },
    { id: 3, name: 'Zylker Yearly Subscription', code: 'SUB-ZYL-03', price: '₹5,671', category: 'Subscription', status: 'Active' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', code: '', price: '', category: 'Software', status: 'Active' });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;
    setProducts(prev => [{ id: Date.now(), ...newProduct }, ...prev]);
    setNewProduct({ name: '', code: '', price: '', category: 'Software', status: 'Active' });
    setShowAddModal(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-darkbg text-slate-800 dark:text-slate-100 overflow-hidden select-none">
      
      {/* Top Header Bar */}
      <div className="h-14 bg-white dark:bg-darkbg-card border-b border-slate-200 dark:border-darkbg-border px-6 flex items-center justify-between shrink-0">
        <div className="relative">
          <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl text-xs font-semibold outline-none w-64"
          />
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
        >
          <FiPlus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Products Table View */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white dark:bg-darkbg-card rounded-2xl border border-slate-200 dark:border-darkbg-border shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-darkbg-border bg-slate-50/50 dark:bg-darkbg text-[11px] font-black uppercase text-slate-400">
                <th className="p-4">Product Name</th>
                <th className="p-4">SKU / Code</th>
                <th className="p-4">Category</th>
                <th className="p-4">Unit Price</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredProducts.map(prod => (
                <tr key={prod.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      <FiBox className="w-3.5 h-3.5" />
                    </div>
                    {prod.name}
                  </td>
                  <td className="p-4 font-mono text-slate-500">{prod.code}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                    <FiTag className="w-3.5 h-3.5 text-slate-400" /> {prod.category}
                  </td>
                  <td className="p-4 font-extrabold text-indigo-600 dark:text-indigo-400">
                    {prod.price}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                      {prod.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400 font-bold">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-darkbg-card rounded-3xl shadow-2xl border border-slate-200 dark:border-darkbg-border p-6 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-darkbg-border">
              <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white">Add New Product</h3>
              <button onClick={() => setShowAddModal(false)} className="cursor-pointer"><FiX className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAddProduct} className="py-4 space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Product Name</label>
                <input 
                  type="text" required placeholder="e.g. Enterprise License"
                  value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">SKU / Code</label>
                <input 
                  type="text" placeholder="e.g. SW-ENT-04"
                  value={newProduct.code} onChange={(e) => setNewProduct({...newProduct, code: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Category</label>
                <input 
                  type="text" placeholder="e.g. Software / Services"
                  value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Unit Price</label>
                <input 
                  type="text" placeholder="e.g. ₹50,000"
                  value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-darkbg border border-slate-200 dark:border-darkbg-border rounded-xl p-2.5 text-xs font-semibold outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 dark:bg-darkbg text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}