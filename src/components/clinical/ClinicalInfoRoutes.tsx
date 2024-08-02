import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import ClinicalInfo from "@/components/clinical/ClinicalInfo.tsx";
import { AlertCircle } from "lucide-react";
import { AllergiesForm } from "@/components/clinical/forms/AllergiesForm.tsx";
import ClinicalComponent from "@/components/clinical/ClinicalComponent.tsx";
import {Allergy} from "@/types/product-attributes.ts";

export const ClinicalInfoRoutes: FC = () => {
  return (
    <Routes>
      <Route index element={<ClinicalInfo />} />
      <Route
        path="allergies/*"
        element={
          <ClinicalComponent<Allergy>
            title="Allergies"
            description="Information about potential allergies present in the product, crucial for patients with specific sensitivities."
            icon={AlertCircle}
            link="allergies"
            route="allergies"
            form={AllergiesForm}
          />
        }
      />
      {/* Add more clinical info routes here */}
    </Routes>
  );
};
