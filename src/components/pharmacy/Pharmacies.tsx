import { useContext, useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { DataTable } from "@/components/ui/data-table.tsx";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import LoaderContext from "@/context/LoaderProvider.tsx";
import ErrorContext from "@/context/ErrorProvider.tsx";
import { AxiosError } from "axios";
import { Pharmacy } from "@/types/pharmacy.ts";
import InvitePharmacyModal from "@/components/pharmacy/InvitePharmacyModal.tsx";
import { Clock } from "lucide-react";

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
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.getValue("id"),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name");
      return name ? String(name) : "NOT_INITIALISED";
    },
  },
  {
    accessorKey: "ownerEmail",
    header: "Owner email",
    cell: ({ row }) => {
      const email = row.getValue("ownerEmail");
      return email ? String(email) : "NOT_INITIALISED";
    },
  },
  {
    id: "isActive",
    cell: ({ row }) =>
      !row.original.isActive && (
        <div className="ml-auto flex w-min items-center justify-center rounded-full border border-yellow-400 bg-yellow-300 px-2 py-1 text-center text-xs text-nowrap space-x-1.5">
          <Clock className="h-4 w-4" />
          <p>Inactive</p>
        </div>
      ),
  },
];

const Pharmacies = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorContext);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);

  const fetchPharmacies = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get<Pharmacy[]>(`/pharmacy`);
      setPharmacies(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status !== 404) {
          setError(error.response?.data);
        }
      } else {
        setError("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const handleDelete = async (ids: number[]) => {
    setLoading(true);
    try {
      await Promise.all(
        ids.map((id) => axiosPrivate.delete(`/pharmacy/${id}`)),
      );
      setPharmacies((prevPharmacies) =>
        prevPharmacies.filter((pharmacy) => !ids.includes(pharmacy.id)),
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data || "An error occurred while deleting the items",
        );
      } else {
        setError("Unexpected error occurred while deleting the items");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Pharmacies</h1>
        <InvitePharmacyModal onPharmacyInvited={fetchPharmacies}/>
      </div>
      <DataTable
        name="Pharmacies"
        columns={columns}
        data={pharmacies}
        isLoading={false}
        onDelete={handleDelete}
      />
    </div>
  );
};
export default Pharmacies;
