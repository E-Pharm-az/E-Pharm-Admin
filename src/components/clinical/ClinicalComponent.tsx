import {FC} from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

const ClinicalComponent: FC<Props> = ({
  title,
  description,
  icon: Icon,
  link,
}) => {
  return (
    <div className="bg-white border-2 border-brand-secondary grid gap-4 rounded-lg p-6 shadow-sm">
      <div className="flex items-center">
        <Icon className="w-6 h-6 mr-3 text-brand" />
        <h2 className="text-lg font-semibold text-brand">{title}</h2>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className="flex justify-end">
        <Button variant="outline" asChild>
          <Link to={link}>
            <Edit className="mr-2 h-4 w-4" />
            <p>View and Edit</p>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ClinicalComponent;
