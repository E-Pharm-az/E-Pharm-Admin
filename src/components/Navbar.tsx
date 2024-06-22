import Logo from "@/assets/logo.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <main className="flex flex-col h-screen overflow-hidden">
      <nav className="bg-white h-22 py-4 px-4 flex items-center">
        <div className="h-full items-center mr-6">
          <img
            src={Logo}
            alt="logo"
            className="h-10 w-10 pointer-events-none"
          />
        </div>
        <div className="flex h-full justify-between w-full items-center">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select portal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Storefront</SelectItem>
              <SelectItem value="dark">Pharmacies</SelectItem>
            </SelectContent>
          </Select>
          <button className="border-2 border-input py-1 px-3 text-muted-foreground rounded-md hover:bg-neutral-100 hover:text-neutral-800 transition-colors">
            Settings
          </button>
        </div>
      </nav>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default Navbar;
