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
<<<<<<< HEAD
    return axios.get(`/ds/areas/delete/${id}`);
=======
    return axios.post(`/ds/areas/delete/${id}`);
>>>>>>> a3701af76df2e566162b0d15cd929984eef5dad4
  },
};
