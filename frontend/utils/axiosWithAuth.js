import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: "http://localhost:3003/api",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
