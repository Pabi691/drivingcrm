import axios from './axios';

export const bookingService = {
  getAll(instructor_id) {
    console.log('id here ',instructor_id)
    return axios.get(`/ds/bookings/${instructor_id}`);
  },

  getAllOFAllInstructos() {
    return axios.get(`/ds/bookings`);
  },

    create(data) {
    return axios.post(`/ds/bookings/`,data);
  },


  
};
