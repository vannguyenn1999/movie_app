/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { setupInterceptorsTo } from "./Interceptors";
import { type ID } from "@/helpers/models";

setupInterceptorsTo(axios);

export const getData = (query: string) => {
  return axios.get(`${query}`).then((d) => {
    return d.data ? d.data : d;
  });
};

export const deleteMultiItem = (query: string, data: Array<ID>) => {
  return axios.delete(`${query}`, { data }).then((d) => {
    return d.data;
  });
};


