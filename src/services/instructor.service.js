import axios from './axios';

export const InstructorService = {
  getAll() {
    return axios.get("/ds/instructor-masters");
  },
  approveInstructor(id)
  {
    console.log('calling approove',id)
    return axios.get(`/ds/instructor-masters/status/${id}`,{"businessName":"Drive4Pass"})
  },

  getOne(id) {
    return axios.get(`/ds/instructor-masters/${id}`);
  },

  create(data) {
    return axios.post("/ds/instructor-masters", data);
  },

  update(id, data) {
    return axios.post(`/ds/instructor-masters/${id}`, data);
  },

  instructorWorkingDays(instructor_id){
    return axios.get(`ds/instructor-working-days/${instructor_id}`)
  },
  instructorWorkingHours(instructorId,dayOfWeek){
     return axios.get(
    `ds/instructor-working-hours/${instructorId}?day_of_week=${dayOfWeek}`
  );
  },

  remove(id) {
    return axios.delete(`/ds/instructor-masters/${id}`);
  },
};