import React, { createContext, useContext, useState } from 'react';

const CRMContext = createContext();

const initialDeals = [
  { id: 'd1', name: 'Zylker Yearly Subscription', company: 'Ted Watson', amount: '₹5,671', date: 'Today', stage: 'qual' },
  { id: 'd2', name: 'Website Redesign & Dev', company: 'Acme Corp', amount: '₹70,000', date: 'Jul 31', stage: 'needs' },
  { id: 'd3', name: 'Cloud SaaS Migration', company: 'TechCorp', amount: '₹1,20,000', date: 'Aug 05', stage: 'prop' }
];

const initialContacts = [
  { id: 'c1', name: 'Ted Watson', email: 'ted@watson.com', phone: '+91 98765 43210', company: 'Watson Ltd' },
  { id: 'c2', name: 'Sarah Jenkins', email: 'sarah@acme.com', phone: '+91 91234 56789', company: 'Acme Corp' }
];

const initialCompanies = [
  { id: 'co1', name: 'Acme Corp', industry: 'Technology', value: '₹1,90,000', dealsCount: 2 },
  { id: 'co2', name: 'Watson Ltd', industry: 'Logistics', value: '₹5,671', dealsCount: 1 }
];

const initialProducts = [
  { id: 'p1', name: 'SaaS Enterprise Tier', price: '₹50,000 / yr', sku: 'SKU-001', category: 'Software' },
  { id: 'p2', name: 'Custom API Integration', price: '₹25,000', sku: 'SKU-002', category: 'Services' }
];

const initialActivities = [
  { id: 'a1', title: 'Product Demo Call', date: 'Today, 4:00 PM', type: 'Call', status: 'Pending' },
  { id: 'a2', title: 'Contract Signing', date: 'Tomorrow, 11:00 AM', type: 'Meeting', status: 'Upcoming' }
];

export const CRMProvider = ({ children }) => {
  const [deals, setDeals] = useState(initialDeals);
  const [contacts, setContacts] = useState(initialContacts);
  const [companies, setCompanies] = useState(initialCompanies);
  const [products, setProducts] = useState(initialProducts);
  const [activities, setActivities] = useState(initialActivities);
  const [activePipeline, setActivePipeline] = useState('Primary Pipeline');

  const addDeal = (newDeal) => {
    setDeals(prev => [...prev, { ...newDeal, id: `d-${Date.now()}` }]);
  };

  const moveDeal = (dealId, targetStage) => {
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: targetStage } : d));
  };

  return (
    <CRMContext.Provider value={{
      deals,
      addDeal,
      moveDeal,
      contacts,
      companies,
      products,
      activities,
      activePipeline,
      setActivePipeline
    }}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => useContext(CRMContext);