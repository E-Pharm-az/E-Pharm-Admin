import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import {useState} from "react";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {DataTable} from "@/components/data-table.tsx";

interface Pharmacy {
  id: number;
  name: string;
  tin: string;
  phone: string;
  email: string;
  address: string
}

const columns: ColumnDef<Pharmacy>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
];

const Pharmacies = () => {
    const [pharmacies, setPharamcies] = useState<Pharmacy[]>([
      {
        id: 1,
        name: "Company",
        tin: "123",
        phone: "123123",
        email: "email@gmail.com",
        address: "Address 1",
      },
    ]);

  return (
    <>
      <div className="flex item-center justify-between w-full p-2">
        <h1 className="text-3xl font-medium">Pharmacies</h1>
        <div className="w-min">
          <Link to="/dashboard/pharmacies/invite-pharmacy">
            <Button>Add pharmacy</Button>
          </Link>
        </div>
      </div>
      <div>
        <DataTable
          name="Pharmacies"
          columns={columns}
          data={pharmacies}
          isLoading={false}
        />
      </div>
    </>
  );
};
export default Pharmacies;
