import axios from "axios";
import { makeUseAxios } from "axios-hooks";

const api = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});

export const useAxios = makeUseAxios({ axios: api });

export default api;
