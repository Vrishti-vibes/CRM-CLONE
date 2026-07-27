import api from './api';

export const analyzePipelineWithAI = async (prompt, context = '') => {
  try {
    const response = await api.post('/api/v1/ai/analyze', { prompt, context });
    return response.data;
  } catch (error) {
    console.error('Error querying Aura AI service:', error);
    throw error;
  }
};