import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default accounts for demonstration & quick testing
  const DEMO_ACCOUNTS = {
    admin: {
      id: 'usr-001',
      name: 'Elena Rostova',
      email: 'admin@enterprise.io',
      role: 'admin',
      title: 'Chief Revenue Officer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      permissions: ['all', 'manage_team', 'system_config', 'export_reports']
    },
    user: {
      id: 'usr-002',
      name: 'Ted Watson',
      email: 'ted@enterprise.io',
      role: 'sales_rep',
      title: 'Senior Account Executive',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      permissions: ['view_deals', 'edit_deals', 'create_tasks']
    }
  };

  useEffect(() => {
    // Check saved session on app startup
    const savedSession = localStorage.getItem('crm_active_user');
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch {
        setUser(DEMO_ACCOUNTS.admin);
      }
    } else {
      // Default initial login as Admin
      setUser(DEMO_ACCOUNTS.admin);
      localStorage.setItem('crm_active_user', JSON.stringify(DEMO_ACCOUNTS.admin));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error('Please provide valid credentials.'));
          return;
        }

        const isAdmin = email.toLowerCase().includes('admin');
        const loggedUser = isAdmin ? DEMO_ACCOUNTS.admin : {
          id: `usr-${Date.now()}`,
          name: email.split('@')[0].replace('.', ' '),
          email: email,
          role: 'sales_rep',
          title: 'Account Executive',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          permissions: ['view_deals', 'edit_deals']
        };

        setUser(loggedUser);
        localStorage.setItem('crm_active_user', JSON.stringify(loggedUser));
        resolve(loggedUser);
      }, 600);
    });
  };

  const switchRole = (targetRole) => {
    const updatedUser = targetRole === 'admin' ? DEMO_ACCOUNTS.admin : DEMO_ACCOUNTS.user;
    setUser(updatedUser);
    localStorage.setItem('crm_active_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crm_active_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, switchRole }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);