import axios from './axios';

export const bookingService = {
  getAll(instructor_id) {
    return axios.get(`/ds/booking/${instructor_id}`);
  },

    create(data) {
    return axios.post(`/ds/booking/`,data);
  },


  
};
