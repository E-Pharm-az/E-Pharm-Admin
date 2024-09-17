import { useContext } from "react";
import apiClient from "../services/api-client.ts";
import AuthProvider, { User } from "../context/AuthProvider.tsx";

const useRefreshToken = () => {
  const { setUser } = useContext(AuthProvider);

  const refresh = async () => {
    try {
      const response = await apiClient.get<User>("/auth/admin/refresh-token", {
        withCredentials: true,
      });
      setUser(() => {
        return response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return refresh;
};

export default useRefreshToken;
