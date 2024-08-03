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
import ClinicalInfo from "@/components/clinical/ClinicalInfo.tsx";
import ClinicalInfoPage from "@/components/clinical/ClinicalInfoPage.tsx";
import {
  Allergy,
  DosageForm,
  Indication,
  RouteOfAdministration,
  SideEffect,
  UsageWarning,
} from "@/types/product-attributes.ts";
import { AllergiesForm } from "@/components/clinical/forms/AllergiesForm.tsx";
import { DosageFormForm } from "@/components/clinical/forms/DosageFormForm.tsx";
import { IndicationForm } from "@/components/clinical/forms/IndicationForm.tsx";
import { RouteOfAdministrationForm } from "@/components/clinical/forms/RouteOfAdministrationForm.tsx";
import { UsageWarningForm } from "@/components/clinical/forms/UsageWarningForm.tsx";
import { SideEffectForm } from "@/components/clinical/forms/SideEffectForm.tsx";
import Analytics from "@/components/ui/Analytics.tsx";

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
              <Route
                path="clinical-info/dosage-form"
                element={
                  <ClinicalInfoPage<DosageForm>
                    title="Dosage form"
                    endpoint="dosage-forms"
                    form={DosageFormForm}
                  />
                }
              />
              <Route
                path="clinical-info/indication"
                element={
                  <ClinicalInfoPage<Indication>
                    title="Indication"
                    endpoint="indications"
                    form={IndicationForm}
                  />
                }
              />
              <Route
                path="clinical-info/route-of-administration"
                element={
                  <ClinicalInfoPage<RouteOfAdministration>
                    title="Route of administration"
                    endpoint="roa"
                    form={RouteOfAdministrationForm}
                  />
                }
              />
              <Route
                path="clinical-info/side-effect"
                element={
                  <ClinicalInfoPage<SideEffect>
                    title="Side effect"
                    endpoint="side-effects"
                    form={SideEffectForm}
                  />
                }
              />
              <Route
                path="clinical-info/usage-warning"
                element={
                  <ClinicalInfoPage<UsageWarning>
                    title="Usage warning"
                    endpoint="usage-warnings"
                    form={UsageWarningForm}
                  />
                }
              />
              <Route path="analytics" element={<Analytics />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
