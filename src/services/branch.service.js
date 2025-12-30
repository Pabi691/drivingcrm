import axios from './axios';

export const BranchService = {
  getAllBranches() {
    return axios.get('/branchs');
  },
};
