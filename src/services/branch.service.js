import axios from './axios';

export const BranchService = {
  getAll() {
    return axios.get('/branchs');
  },

  getOne(id) {
    return axios.get(`/branchs/${id}`);
  },

  create(data) {
    return axios.post('/branchs', data);
  },

  update(id, data) {
    return axios.put(`/branchs/${id}`, data);
  },

  remove(id) {
    return axios.delete(`/branchs/delete/${id}`);
  },
};
