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
  updateState: () => {},
};
