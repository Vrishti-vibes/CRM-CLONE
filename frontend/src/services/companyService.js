import api from './api';

export const companyService = {
  async getCompanies(params = {}) {
    const response = await api.get('/companies', { params });
    return response.data;
  },

  async createCompany(data) {
    const response = await api.post('/companies', data);
    return response.data;
  },

  async updateCompany(id, data) {
    const response = await api.put(`/companies/${id}`, data);
    return response.data;
  },

  async deleteCompany(id) {
    const response = await api.delete(`/companies/${id}`);
    return response.data;
  },
};