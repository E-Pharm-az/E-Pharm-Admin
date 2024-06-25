import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

const Pharmacies = () => {
  return (
    <>
      <header className="flex item-center justify-between w-full p-2">
        <h1 className="text-3xl font-medium">Pharmacies</h1>
        <div className="w-min">
          <Link to="/dashboard/pharmacies/invite-pharmacy">
            <Button>Add Pharmacy</Button>
          </Link>
        </div>
      </header>
    </>
  );
};
export default Pharmacies;
