const { default: axiosClient } = require("./axiosClient");

const NotificationAPI = {
  getNotificationIdAPI(code) {
    const url = `v1/notifications/${code}`;
    return axiosClient.get(url);
  },
  postNotificationAPI(query) {
    const url = `v1/notifications`;
    return axiosClient.post(url, query);
  },
};

export default NotificationAPI;

