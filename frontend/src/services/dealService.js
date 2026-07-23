import api from './api';

export const dealService = {
  async getDeals(params = {}) {
    const response = await api.get('/deals', { params });
    return response.data;
  },

  async createDeal(data) {
    const response = await api.post('/deals', data);
    return response.data;
  },

  async updateDeal(id, data) {
    const response = await api.put(`/deals/${id}`, data);
    return response.data;
  },

  async updateDealStage(id, stage) {
    const response = await api.patch(`/deals/${id}/stage`, { stage });
    return response.data;
  },

  async deleteDeal(id) {
    const response = await api.delete(`/deals/${id}`);
    return response.data;
  },
};