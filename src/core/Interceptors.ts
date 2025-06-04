import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import * as authHelper from "../core/AuthHelpers";

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  //   console.info(`[request] [${JSON.stringify(config)}]`)
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // console.info(`[response] [${JSON.stringify(response)}]`)
  return response;
};

const onResponseError = (error: AxiosError) => {
  const originalRequest = error.config;

  // console.log("originalRequest", originalRequest);

  if (typeof error.response === "undefined") {
    return {
      status: 400,
      data: [],
    };
  }
  if (
    error.status === 400 &&
    (originalRequest?.url === "auth/register/" ||
      originalRequest?.url === "auth/user/1/" ||
      originalRequest?.url?.includes("/top-movies/"))
  ) {
    return {
      status: 400,
      data: error?.response?.data,
    };
  }

  if (error.status === 400 && originalRequest?.url === "/auth/refresh/") {
    authHelper.removeAuth();
    // window.location.href = "/auth/login";
    return Promise.reject(error);
  }

  if (error.status === 401 && originalRequest?.url === "auth/login/") {
    return {
      status: 401,
    };
  }

  if (error.status === 404) {
    return {
      status: 404,
    };
  }

  if (error.status === 500) {
    return {
      status: 500,
    };
  }

  if (
    typeof error.response?.data === "object" &&
    (error.response?.data as { code: string }).code === "token_not_valid" &&
    error.response?.status === 401 &&
    error.response?.statusText === "Unauthorized"
  ) {
    const auth = authHelper.getAuth();
    const refreshToken = auth?.refresh;

    if (refreshToken) {
      return axios
        .post("auth/refresh/", { refresh: refreshToken })
        .then((response) => {
          authHelper.removeAuth();
          // console.log("authHelper.setAuth(response.data)", response.data);
          authHelper.setAuth(response.data);
          // return axios(originalRequest);
        })
        .catch((err) => {
          console.log("auth/refresh/ :", err);
        });
    } else {
      console.log("Refresh token not available.");
      // window.location.href = "/auth/login/";
    }
  }

  // specific error handling done elsewhere
  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
