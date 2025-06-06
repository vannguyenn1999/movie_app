import type { AxiosInstance } from "axios";

import type { AuthModel } from "./models";

const AUTH_LOCAL_STORAGE_KEY = "kt-auth-react-v";
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return;
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!lsValue) {
    return;
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel;
    if (auth) {
      // You can easily check auth_token expiration also
      return auth;
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(auth);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};

export function setupAxios(axiosInstance: AxiosInstance) {
  axiosInstance.defaults.baseURL = import.meta.env.VITE_REACT_APP_IS_DEV === "true" ? import.meta.env.VITE_REACT_APP_API_URL_DEV : import.meta.env.VITE_REACT_APP_API_URL_PRODUCT;
  axiosInstance.defaults.headers.Accept = "application/json";

  axiosInstance?.interceptors?.request.use(
    (config) => {
      const auth = getAuth();
      if (auth && auth.access) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${auth.access}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
}

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY };
