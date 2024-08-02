import {Outlet, useNavigate} from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthProvider from "@/context/AuthProvider.tsx";

const RequireAuth = () => {
  const { isAuthenticated, isRefreshing } = useContext(AuthProvider);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRefreshing && !isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  }, [isRefreshing, isAuthenticated, navigate]);

  if (isRefreshing) {
    return <></>;
  }

  return isAuthenticated() ? <Outlet /> : null;
};

export default RequireAuth;