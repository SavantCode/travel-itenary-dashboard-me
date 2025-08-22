import axios from '../lib/axios';

export const searchAccommodations = (query: string) => {
  return axios.get('/api/v1/masters/accommodation/search', {
    params: { q: query },
  });
};
