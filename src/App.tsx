import { Navigate, Route, Routes } from "react-router-dom";
import PersistLogin from "@/components/PersistLogin.tsx";
import RequireAuth from "@/components/RequireAuth.tsx";
import StorefrontLayout from "@/components/StorefrontLayout.tsx";
import Login from "@/components/Login.tsx";
import NotFound from "@/components/NotFound.tsx";
import AuthLayout from "@/components/AuthLayout.tsx";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />

        <Route element={<RequireAuth />}>
          <Route path="/storefront" element={<StorefrontLayout />}>
            <Route path="" element={<h1>Storefront</h1>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
