import {
  AlertCircle,
  AlertOctagon,
  Clipboard,
  Pill,
  Route,
  ShieldAlert,
} from "lucide-react";
import ClinicalComponent from "@/components/clinical/ClinicalComponent.tsx";
import {AllergiesForm} from "@/components/clinical/forms/AllergiesForm.tsx";
import {Allergy} from "@/types/product-attributes.ts";

const ClinicalInfo = () => {
  return (
    <div className="p-6 space-y-6 h-full">
      <h1 className="text-lg font-semibold md:text-2xl">Clinical Info</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ClinicalComponent<Allergy>
          title="Allergies"
          description="Information about potential allergies present in the product, crucial for patients with specific sensitivities."
          icon={AlertCircle}
          link="allergies"
          route="allergies"
          form={AllergiesForm}
        />
        {/*<ClinicalComponent*/}
        {/*  title="Dosage Form"*/}
        {/*  description="Details on the physical form of the medication, such as tablets, capsules, liquids, or injections."*/}
        {/*  icon={Pill}*/}
        {/*  link="dosage-form"*/}
        {/*  route="dosage-form"*/}
        {/*/>*/}
        {/*<ClinicalComponent*/}
        {/*  title="Indication"*/}
        {/*  description="Conditions or diseases for which the product is intended and approved to treat or manage."*/}
        {/*  icon={Clipboard}*/}
        {/*  link="indication"*/}
        {/*  route="indication"*/}
        {/*/>*/}
        {/*<ClinicalComponent*/}
        {/*  title="Route Of Administration"*/}
        {/*  description="Methods by which the medication is delivered to the body, such as oral, intravenous, or topical routes."*/}
        {/*  icon={Route}*/}
        {/*  link="route-of-administration"*/}
        {/*  route="route-of-administration"*/}
        {/*/>*/}
        {/*<ClinicalComponent*/}
        {/*  title="Side Effect"*/}
        {/*  description="Possible adverse reactions or unwanted effects that patients may experience when using the product."*/}
        {/*  icon={AlertOctagon}*/}
        {/*  link="side-effect"*/}
        {/*  route="side-effect"*/}
        {/*/>*/}
        {/*<ClinicalComponent*/}
        {/*  title="Usage Warning"*/}
        {/*  description="Important warnings and precautions to be aware of when using the product, including contraindications and special considerations."*/}
        {/*  icon={ShieldAlert}*/}
        {/*  link="usage-warning"*/}
        {/*  route="usage-warning"*/}
        {/*/>*/}
      </div>
    </div>
  );
};

export default ClinicalInfo;