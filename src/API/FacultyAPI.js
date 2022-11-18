const { default: axiosClient } = require("./axiosClient");
const FacultyAPI = {
  getALLFaculty(status) {
    const url = `v1/faculties/all?status=${status}`;
    return axiosClient.get(url);
  },
};

export default FacultyAPI;
