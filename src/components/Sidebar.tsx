import { Separator } from "@/components/ui/separator.tsx";
import { Link, useLocation } from "react-router-dom";
import {Building2, Home, Package, Pill} from "lucide-react";
import Logo from "@/assets/logo.png";

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className="grid bg-white gap-5 items-center text-sm font-medium m-4">
      <div className="items-center flex justify-center">
        <img src={Logo} alt="logo" className="h-10 w-10 pointer-events-none" />
      </div>
      <Separator />
      <Link
        to="/dashboard"
        className={`flex justify-center items-center p-3 rounded-lg transition-colors hover:text-primary ${
          location.pathname === "/dashboard"
            ? "bg-brand-secondary text-white text-primary hover:text-white"
            : "text-muted-foreground"
        }`}
      >
        <Home className="h-7 w-6" />
      </Link>
      <Link
        to="/dashboard/pharmacies"
        className={`flex justify-center items-center p-3 rounded-lg transition-colors hover:text-primary ${
          location.pathname === "/dashboard/pharmacies"
            ? "bg-brand-secondary text-white text-primary hover:text-white"
            : "text-muted-foreground"
        }`}
      >
        <Building2 className="h-6 w-6" />
      </Link>
      <Link
        to="/dashboard/products"
        className={`flex justify-center items-center p-3 rounded-lg transition-colors hover:text-primary ${
          location.pathname === "/dashboard/products"
            ? "bg-brand-secondary text-white text-primary hover:text-white"
            : "text-muted-foreground"
        }`}
      >
        <Package className="h-6 w-6" />
      </Link>
      <Link
        to="/dashboard/clinical-info"
        className={`flex justify-center items-center p-3 rounded-lg transition-colors hover:text-primary ${
          location.pathname === "/dashboard/clinical-info"
            ? "bg-brand-secondary text-white text-primary hover:text-white"
            : "text-muted-foreground"
        }`}
      >
        <Pill className="h-6 w-6" />
      </Link>
    </nav>
  );
};

export default Sidebar;
