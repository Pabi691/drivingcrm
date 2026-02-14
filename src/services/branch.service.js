import axios from './axios';

export const BranchService = {
  getAll() {
    return axios.get('/ds/areas');
  },

  getOne(id) {
    return axios.get(`/ds/areas/${id}`);
  },

  createBranch(data) {
    return axios.post('/ds/areas',data);
  },

  update(id, data) {
    return axios.post(`/ds/areas/${id}`, data);
  },

  remove(id) {
    return axios.get(`/ds/areas/delete/${id}`);
  },
};
