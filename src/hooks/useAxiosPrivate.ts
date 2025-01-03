import { useContext, useEffect } from "react";
import { axiosPrivate } from "../services/api-client.ts";
import AuthProvider from "../context/AuthProvider.tsx";
import useRefreshToken from "./useRefreshToken.ts";

const useAxiosPrivate = () => {
  const refreshToken = useRefreshToken();
  const { user, logout } = useContext(AuthProvider);

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.withCredentials) {
          config.withCredentials = true;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;

        if (error.response?.status === 401 && !prevRequest._retry) {
          prevRequest._retry = true;
          try {
            const newToken = await refreshToken();
            prevRequest.headers.Authorization = `Bearer ${newToken}`;

            return axiosPrivate(prevRequest);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }

        if (error.response?.status === 401) {
          logout();
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [user, refreshToken, logout]);

  return axiosPrivate;
};

export default useAxiosPrivate;
