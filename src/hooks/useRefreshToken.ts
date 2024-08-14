import { useContext } from "react";
import apiClient from "../services/api-client.ts";
import { jwtDecode } from "jwt-decode";
import AuthProvider, {
  TokenPayload,
  TokenResponse,
} from "../context/AuthProvider.tsx";

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthProvider);

  const refresh = async () => {
    const response = await apiClient.get<TokenResponse>("/auth/admin/refresh-token", {
      withCredentials: true,
    });
    const decodedToken = jwtDecode<TokenPayload>(response.data.token);

    setAuth(() => {
      return {
        tokenResponse: response.data,
        id: decodedToken.jti,
        email: decodedToken.email,
        firstname: decodedToken.sub,
      };
    });

    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
