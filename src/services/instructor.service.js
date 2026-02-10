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
    return axios.get(`/ds/instructor-working-days/${instructor_id}`)
  },
  
  instructorWorkingDayCreateAndUpdate(data){
    console.log('data',data)
     return axios.post(
    `/ds/instructor-working-days/upsert`,data
  );
  },

  remove(id) {
    return axios.get(`/ds/instructor-masters/delete/${id}`);
  },
};