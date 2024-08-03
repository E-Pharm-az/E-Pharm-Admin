import { Separator } from "@/components/ui/separator.tsx";
import { Link, useLocation } from "react-router-dom";
import { Building2, Package, Pill } from "lucide-react";
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
      <Link
        to="/dashboard/analytics"
        className={`flex justify-center items-center p-3 rounded-lg transition-colors hover:text-primary ${
          location.pathname === "/dashboard/analytics"
            ? "bg-brand-secondary text-white text-primary hover:text-white"
            : "text-muted-foreground"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-chart-no-axes-column"
        >
          <line x1="18" x2="18" y1="20" y2="10" />
          <line x1="12" x2="12" y1="20" y2="4" />
          <line x1="6" x2="6" y1="20" y2="14" />
        </svg>
      </Link>
    </nav>
  );
};

export default Sidebar;
