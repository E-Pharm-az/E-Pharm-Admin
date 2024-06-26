import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

const Meds = () => {
    return (
      <>
        <div className="flex item-center justify-between w-full p-2">
          <h1 className="text-3xl font-medium">Meds</h1>
          <div className="w-min">
            <Link to="/dashboard/pharmacies/invite-pharmacy">
              <Button>Add meds</Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2 w-full">
          <div className="bg-blue-300 h-[200px] rounded-md p-2 flex flex-col justify-between items-center">
            <label>Allergies</label>
            <Button>Manage allergies</Button>
          </div>

          <div className="bg-green-300 h-[200px] rounded-md p-2 flex flex-col justify-between items-center">
            <label>Dosage forms</label>
            <Button>Manage dosage forms</Button>
          </div>
        </div>
      </>
    );
}
export default Meds
