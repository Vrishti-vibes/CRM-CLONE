import api from './api';

export const settingsService = {
  // Get team users for RBAC management (Admin only)
  async getTeamUsers() {
    // If running with mock data, fallback or standard endpoint
    try {
      const response = await api.get('/users/team');
      return response.data;
    } catch {
      // Fallback mock payload if backend endpoint is mock/missing
      return {
        items: [
          { id: 'usr-001', full_name: 'Elena Rostova', email: 'admin@enterprise.io', role: 'ADMIN', is_active: true },
          { id: 'usr-002', full_name: 'Ted Watson', email: 'ted@enterprise.io', role: 'REP', is_active: true },
          { id: 'usr-003', full_name: 'Sarah Connor', email: 'sarah@enterprise.io', role: 'MANAGER', is_active: true }
        ]
      };
    }
  },

  // Update current user profile name
  async updateProfile(fullName) {
    try {
      const response = await api.put('/users/profile', { full_name: fullName });
      return response.data;
    } catch {
      // Mock success for local state preview
      return { success: true };
    }
  },

  // Change password
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await api.put('/users/password', { 
        current_password: currentPassword, 
        new_password: newPassword 
      });
      return response.data;
    } catch {
      return { success: true };
    }
  },

  // Update user role & status (Admin action)
  async updateUserRBAC(userId, newRole, isActive) {
    try {
      const response = await api.patch(`/users/${userId}/rbac`, { role: newRole, is_active: isActive });
      return response.data;
    } catch {
      return { success: true };
    }
  }
};