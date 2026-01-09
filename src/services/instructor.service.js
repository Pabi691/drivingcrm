import axios from './axios';

export const InstructorService = {
  getAll() {
    return axios.get("/ds/instructor-masters");
  },

  getOne(id) {
    return axios.get(`/ds/instructor-masters/${id}`);
  },

  create(data) {
    return axios.post("/ds/instructor-masters", data);
  },

  update(id, data) {
    return axios.patch(`/ds/instructor-masters/${id}`, data);
  },

  remove(id) {
    return axios.delete(`/ds/instructor-masters/${id}`);
  },
};