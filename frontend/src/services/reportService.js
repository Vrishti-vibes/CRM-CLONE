import api from './api';

export const reportService = {
  async getAnalytics(params = {}) {
    const response = await api.get('/reports/analytics', { params });
    return response.data;
  },
};