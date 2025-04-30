import axios from "axios";

const axiosWithConfig = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default axiosWithConfig;
