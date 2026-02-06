import axios from './axios';

export const PricingService = {
  getAll() {
    return axios.get('/ds/price-masters');
  },

  create(data) {
    console.log('data',data)
    return axios.post('/ds/price-masters', data);
  },

  update(id, data) {
    return axios.post(`/ds/price-masters/${id}`, data);
  },

  remove(id) {
    console.log('id',id)
    return axios.get(`/ds/price-masters/delete/${id}`);
  },
};
