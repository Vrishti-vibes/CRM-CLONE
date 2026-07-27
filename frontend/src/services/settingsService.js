import api from './api';

export const settingsService = {
  async updateProfile(fullName) {
    const response = await api.put('/settings/profile', { full_name: fullName });
    return response.data;
  },

  async changePassword(currentPassword, newPassword) {
    const response = await api.put('/settings/password', {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response.data;
  },

  async getTeamUsers() {
    const response = await api.get('/settings/users');
    return response.data;
  },

  async updateUserRBAC(userId, role, isActive) {
    const response = await api.patch(`/settings/users/${userId}/role`, {
      role,
      is_active: isActive,
    });
    return response.data;
  },
};