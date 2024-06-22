import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

const PortalSelector = () => {
  return (
    <div className="flex gap-2 w-full mt-20 justify-center text-white">
      <div className="w-1/4 h-[300px] bg-accent-secondary p-4 rounded-md flex flex-col justify-between">
        <div className="grid gap-1">
          <h2 className="text-2xl font-medium">
            Access the Storefront Admin Panel
          </h2>
          <p className="text-sm">Oversee User Activities and Orders </p>
        </div>
        <Link to="/storefront">
          <Button>Select</Button>
        </Link>
      </div>
      <div className="w-1/4 h-[300px] bg-accent p-4 rounded-md flex flex-col justify-between">
        <div className="grid gap-1">
          <h2 className="text-2xl font-medium">
            Access the Pharmacy Admin Panel
          </h2>
          <p className="text-sm">Manage Pharmacy Listings and Inventory </p>
        </div>
        <Link to="/pharmaciess">
          <Button>Select</Button>
        </Link>
      </div>
    </div>
  );
};

export default PortalSelector;
