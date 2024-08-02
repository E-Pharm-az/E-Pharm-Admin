import { Navigate, Route, Routes } from "react-router-dom";
import PersistLogin from "@/components/auth/PersistLogin.tsx";
import RequireAuth from "@/components/auth/RequireAuth.tsx";
import Login from "@/components/auth/Login.tsx";
import NotFound from "@/components/NotFound.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import DashboardLayout from "@/layouts/DashboardLayout.tsx";
import { RemoveTrailingSlash } from "@/components/RemoveTrailingSlash.tsx";
import Pharmacies from "@/components/pharmacy/Pharmacies.tsx";
import InvitePharmacy from "@/components/pharmacy/InvitePharmacy.tsx";
import RegisterPharmacy from "@/components/pharmacy/RegisterPharmacy.tsx";
import Products from "@/components/product/Products.tsx";
import { ClinicalInfoRoutes } from "@/components/clinical/ClinicalInfoRoutes.tsx";

function App() {
  return (
    <>
      <RemoveTrailingSlash />
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/dashboard/pharmacies" />} />
              <Route path="pharmacies" element={<Pharmacies />} />
              <Route
                path="pharmacies/invite-pharmacy"
                element={<InvitePharmacy />}
              />
              <Route
                path="pharmacies/register"
                element={<RegisterPharmacy />}
              />
              <Route path="products" element={<Products />} />
              <Route path="clinical-info" element={<ClinicalInfo />} />
              <Route
                path="clinical-info/allergies"
                element={
                  <ClinicalInfoPage<Allergy>
                    title="Allergies"
                    endpoint="allergies"
                    form={AllergiesForm}
                  />
                }
              />
              {/* Add more clinical info routes here */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
