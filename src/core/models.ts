/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormikProps } from "formik";
import type { JSX } from "react";

export interface AuthModel {
  access: string;
  refresh: string;
  user?: {
    id: number;
    email: string;
    username: string;
    image: string;
    is_staff?: boolean;
  };
}

export type AxiosInstance = {
  defaults: {
    baseURL: string | undefined;
    headers: {
      Accept: string;
    };
  };
  interceptors: {
    request: {
      use: (
        onFulfilled: (
          config: AxiosRequestConfig
        ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
        onRejected?: (error: unknown) => unknown
      ) => number;
    };
  };
};

export interface AxiosRequestConfig {
  headers: {
    Authorization?: string;
  };
}

export type QueryRequestContextProps = {
  state: string;
  updateState: (updates: Partial<string>) => void;
};

export const initialQueryRequest: QueryRequestContextProps = {
  state: "",
  updateState: () => { },
};


export type OptionType = { label: string; value: string; labelText: string };

export type OptionType2 = { label: string; value: JSX.Element; labelText: string }

export type MovieOtherDataProps = {
  formik: FormikProps<any>;
}; 