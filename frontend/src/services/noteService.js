import api from './api';

export const noteService = {
  async getDealNotes(dealId) {
    const response = await api.get(`/deals/${dealId}/notes`);
    return response.data;
  },

  async createDealNote(dealId, content) {
    const response = await api.post(`/deals/${dealId}/notes`, { content });
    return response.data;
  },

  async deleteNote(noteId) {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
  },
};