import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import apiClient, { axiosPrivate } from "@/services/api-client.ts";
import { jwtDecode } from "jwt-decode";

export interface TokenResponse {
  token: string;
  refreshToken: string;
  validTo: string;
}

export interface TokenPayload {
  jti: string;
  email: string;
  sub: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstname: string;
}

interface AuthContextType {
  auth: AuthUser | null;
  setAuth: Dispatch<SetStateAction<AuthUser | null>>;
  isAuthenticated: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isRefreshing: boolean;
  setIsRefreshing: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
  isAuthenticated: () => false,
  login: () => Promise.resolve(),
  logout: () => {},
  isRefreshing: true,
  setIsRefreshing: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthUser | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const isAuthenticated = (): boolean => {
    return !!auth;
  };

  const login = async (email: string, password: string) => {
    const response = await axiosPrivate.post("/auth/pharmacy/login", {
      email,
      password,
    });

    const decodedToken = jwtDecode<TokenPayload>(response.data.token);

    setAuth({
      id: decodedToken.jti,
      email: decodedToken.email,
      firstname: decodedToken.sub,
    });
  };

  const logout = async () => {
    setAuth(null);
    await apiClient.get("/auth/logout", { withCredentials: true });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isAuthenticated,
        login,
        logout,
        isRefreshing,
        setIsRefreshing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;