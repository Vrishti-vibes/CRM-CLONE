import api from './api';

export const contactService = {
  async getContacts(params = {}) {
    const response = await api.get('/contacts', { params });
    return response.data;
  },

  async createContact(data) {
    const response = await api.post('/contacts', data);
    return response.data;
  },

  async updateContact(id, data) {
    const response = await api.put(`/contacts/${id}`, data);
    return response.data;
  },

  async deleteContact(id) {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },
};