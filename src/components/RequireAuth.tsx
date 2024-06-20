import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthFormProvider.tsx";

const RequireAuth = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      {isAuthenticated() ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
