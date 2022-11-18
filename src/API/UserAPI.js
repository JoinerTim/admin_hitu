const { default: axiosClient } = require("./axiosClient");
const UserAPI = {
  postLoginUser(obj) {
    const url = "auth/login";
    return axiosClient.post(url, obj);
  },
};
export default UserAPI;
