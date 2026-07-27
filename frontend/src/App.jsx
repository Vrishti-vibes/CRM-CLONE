import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';
import Settings from './pages/Settings';

import Login from './pages/Login';
import Deals from './pages/Deals';
import Contacts from './pages/Contacts';
import Companies from './pages/Companies';
import Products from './pages/Products';
import Activities from './pages/Activities';
import Dashboard from './pages/Dashboard';

import SignalsModal from './components/SignalsModal';
import NotebookWidget from './components/NotebookWidget';

function ProtectedRoutes() {
  const { user } = useAuth();
  const [dealsRef, setDealsRef] = useState(null);
  
  const [isSignalsOpen, setIsSignalsOpen] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleGlobalAddDeal = (dealData, stageId) => {
    if (dealsRef && dealsRef.handleAddDealDirect) {
      dealsRef.handleAddDealDirect(dealData, stageId);
    }
  };

  return (
    <AppLayout 
      onAddDeal={handleGlobalAddDeal}
      onOpenSignals={() => setIsSignalsOpen(true)}
      onOpenNotebook={() => setIsNotebookOpen(!isNotebookOpen)}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/deals" replace />} />
        <Route path="/deals" element={<Deals onRegisterRef={setDealsRef} />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/products" element={<Products />} />
        <Route path="/calendar" element={<Activities />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Navigate to="/deals" replace />} />
        <Route path="*" element={<Navigate to="/deals" replace />} />
      </Routes>

      <SignalsModal isOpen={isSignalsOpen} onClose={() => setIsSignalsOpen(false)} />
      <NotebookWidget isOpen={isNotebookOpen} onClose={() => setIsNotebookOpen(false)} />
    </AppLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<ProtectedRoutes />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}