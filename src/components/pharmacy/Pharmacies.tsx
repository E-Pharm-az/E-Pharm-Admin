import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { DataTable } from "@/components/ui/data-table.tsx";
import {Plus} from "lucide-react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import LoaderContext from "@/context/LoaderProvider.tsx";
import ErrorContext from "@/context/ErrorProvider.tsx";
import {AxiosError} from "axios";

interface Pharmacy {
  id: number;
  name: string;
  tin: string;
  phone: string;
  email: string;
  address: string;
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
  const axiosPrivate = useAxiosPrivate();
  const { setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorContext);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get<Pharmacy[]>(`/pharmacy`);
        setPharmacies(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            if (error.response.status !== 404) {
              setError(error.response?.data);
            }
          }
        } else {
          setError("Unexpected error");
        }
      }
      finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-6 space-y-6 h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Pharmacies</h1>
        <Button asChild>
          <Link to="/dashboard/pharmacies/invite-pharmacy">
            <Plus className="w-4 h-4" />
            <p>Add Pharmacy</p>
          </Link>
        </Button>
      </div>
      <DataTable
        name="Pharmacies"
        columns={columns}
        data={pharmacies}
        isLoading={false}
      />
    </div>
  );
};
export default Pharmacies;
