import React, { FC } from "react";
import {Routes, Route, Link} from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { BaseEntity } from "@/types/base-entity.ts";

interface Props<T extends BaseEntity> {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  form: React.ComponentType<{ onSubmit: (data: Partial<T>) => Promise<void> }>;
  route: string;
}

const ClinicalInfoTable = React.lazy(() => import("./ClinicalInfoTable"));

const ClinicalComponent = <T extends BaseEntity>({
  title,
  description,
  icon: Icon,
  link,
  route,
  form,
}: Props<T>) => {

  const Card: FC = () => (
    <div className="bg-white border-2 border-brand-secondary grid gap-4  rounded-lg p-6 shadow-sm">
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

  return (
    <Routes>
      <Route index element={<Card />} />
      <Route
        path={route}
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <ClinicalInfoTable<T> title={title} endpoint={route} form={form} />
          </React.Suspense>
        }
      />
    </Routes>
  );
};

export default ClinicalComponent;
