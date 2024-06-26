import { Navigate, Route, Routes } from "react-router-dom";
import PersistLogin from "@/components/PersistLogin.tsx";
import RequireAuth from "@/components/RequireAuth.tsx";
import Login from "@/components/Login.tsx";
import NotFound from "@/components/NotFound.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import DashboardLayout from "@/layouts/DashboardLayout.tsx";
import { RemoveTrailingSlash } from "@/components/RemoveTrailingSlash.tsx";
import Pharmacies from "@/components/Pharmacies.tsx";
import InvitePharmacy from "@/components/InvitePharmacy.tsx";
import RegisterPharmacy from "@/components/RegisterPharmacy.tsx";
import ClinicalInformation from "@/components/ClinicalInformation.tsx";
import Allergies from "@/components/Allergies.tsx";

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
          <Route index element={<h1>Dashboard</h1>} />
          <Route path="pharmacies" element={<Pharmacies />} />
          <Route path="pharmacies/invite-pharmacy" element={<InvitePharmacy />}/>
          <Route path="pharmacies/register" element={<RegisterPharmacy />} />
          <Route path="clinical-info" element={<ClinicalInformation />} />
          <Route path="clinical-info/allergies" element={<Allergies />} />
        </Route>
        </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
