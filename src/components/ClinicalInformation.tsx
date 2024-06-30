import { Button } from "@/components/ui/button.tsx";
import {
  Edit,
  AlertCircle,
  Pill,
  Clipboard,
  Route,
  AlertOctagon,
  ShieldAlert,
} from "lucide-react";
import { Link } from "react-router-dom";

const ClinicalInformation = () => {
  const cards = [
    {
      title: "Allergies",
      description:
        "Information about potential allergens present in the product, crucial for patients with specific sensitivities.",
      icon: AlertCircle,
      link: "allergies",
    },
    {
      title: "Dosage Form",
      description:
        "Details on the physical form of the medication, such as tablets, capsules, liquids, or injections.",
      icon: Pill,
      link: "dosage-form",
    },
    {
      title: "Indication",
      description:
        "Conditions or diseases for which the product is intended and approved to treat or manage.",
      icon: Clipboard,
      link: "indication",
    },
    {
      title: "Route Of Administration",
      description:
        "Methods by which the medication is delivered to the body, such as oral, intravenous, or topical routes.",
      icon: Route,
      link: "route-of-administration",
    },
    {
      title: "Side Effect",
      description:
        "Possible adverse reactions or unwanted effects that patients may experience when using the product.",
      icon: AlertOctagon,
      link: "side-effect",
    },
    {
      title: "Usage Warning",
      description:
        "Important warnings and precautions to be aware of when using the product, including contraindications and special considerations.",
      icon: ShieldAlert,
      link: "usage-warning",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-medium text-[#233D4C]">
          Clinical Information
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white border-2 border-accent-secondary rounded-lg p-6 shadow-sm
                       hover:shadow-md transition-all duration-300 ease-in-out
                       group flex flex-col justify-between
                       hover:bg-gradient-to-br from-white to-accent-secondary/10"
          >
            <div className="flex items-center mb-4 transform group-hover:translate-x-1 transition-transform duration-300">
              <card.icon className="w-6 h-6 mr-3 text-accent" />
              <h2 className="text-lg font-semibold text-accent">
                {card.title}
              </h2>
            </div>
            <p className="text-gray-600 mb-4 text-sm group-hover:text-gray-700 transition-colors duration-300">
              {card.description}
            </p>
            <Link to={card.link} className="ml-auto">
              <Button variant="outline" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClinicalInformation;
