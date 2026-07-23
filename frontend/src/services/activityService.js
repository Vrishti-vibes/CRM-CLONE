import api from './api';

export const activityService = {
  async getDealActivities(dealId) {
    const response = await api.get(`/deals/${dealId}/activities`);
    return response.data;
  },
};