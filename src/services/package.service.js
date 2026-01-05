import axios from './axios';

export const PackageService = {
  getAll() {
    return axios.get('/ds/package-masters');
  },

  getOne(id) {
    return axios.get(`/ds/package-masters/${id}`);
  },

  create(data) {
    return axios.post('/ds/package-masters', data);
  },

  update(id, data) {
    return axios.patch(`/ds/package-masters/${id}`, data);
  },

  remove(id) {
    return axios.delete(`/ds/package-masters/${id}`);
  },
};
