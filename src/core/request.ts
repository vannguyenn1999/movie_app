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

export const deleteMultiItem = (query: string, ids: Array<ID>) => {
  return axios.delete(`${query}`, { data: { ids: ids } }).then((d) => {
    return d.data;
  });
};


export const createData = (query: string, data: unknown) => {
  return axios.post(`${query}`, data).then((d) => {
    return d.data
  })
}

export const updateData = (query: string, data: { id: ID } & Record<string, unknown>) => {
  return axios.patch(`${query}${data.id}/`, data).then((d) => {
    return d.data
  })
}

export const updateData2 = (query: string, id: ID, data: any, config: any) => {
  return axios.patch(`${query}${id}/`, data, config).then((d) => {
    return d.data
  })
}

export const createData2 = (query: string, data: unknown, config: any) => {
  return axios.post(`${query}`, data, config).then((d) => {
    return d.data
  })
}





