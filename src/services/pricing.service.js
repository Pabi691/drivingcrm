import axios from './axios';

export const PricingService = {
  getAll() {
    return axios.get('/ds/price-masters');
  },

  getOne(id) {
    return axios.get(`/ds/price-masters/${id}`);
  },

  create(data) {
    return axios.post('/ds/price-masters', data);
  },

  update(id, data) {
    return axios.patch(`/ds/price-masters/${id}`, data);
  },

  remove(id) {
    return axios.delete(`/ds/price-masters/${id}`);
  },
};
