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
    return axios.post(`/branchs/${id}`, data);
  },

  remove(id) {
    return axios.get(`/branchs/delete/${id}`);
  },
};
