import axios from "axios";
import { setupInterceptorsTo } from "./Interceptors";
import { type ID } from "@/helpers/models";

setupInterceptorsTo(axios);

export const getCategory = (query: string) => {
  return axios.get(`${query}`).then((d) => {
    return d.data;
  });
};

export const getData = (query: string) => {
  return axios.get(`${query}`).then((d) => {
    return d.data;
  });
};

export const deleteMultiItem = (query: string, data: Array<ID>) => {
  return axios.delete(`${query}`, { data }).then((d) => {
    return d.data;
  });
};

export const getDataStatistical = () => {
  return axios.get(`auth/user/statistical/`).then((d) => {
    return d.data;
  });
};
