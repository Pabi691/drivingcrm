import axios from './axios';

export const PackageService = {
  getAll() {
    return axios.get('/packages');
  },

  getOne(id) {
    return axios.get(`/packages/${id}`);
  },

  create(data) {
    return axios.post('/packages', data);
  },

  update(id, data) {
    return axios.put(`/packages/${id}`, data);
  },

  remove(id) {
    return axios.delete(`/packages/${id}`);
  },
};
