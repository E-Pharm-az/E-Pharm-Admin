import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { DataTable } from "@/components/data-table.tsx";
import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import LoaderContext from "@/context/LoaderProvider.tsx";
import ErrorContext from "@/context/ErrorProvider.tsx";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useForm } from "react-hook-form";

interface Allergy {
  id: number;
  name: string;
}

interface FormData {
  name: string;
}

const columns: ColumnDef<Allergy>[] = [
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
];

const Allergies = () => {
  const axiosPrivate = useAxiosPrivate();
  const { loading, setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorContext);
  const [allergies, setAllergies] = useState<Allergy[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormData>();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get<Allergy[]>(`/allergy`);
        setAllergies(response.data);
        setLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status !== 404) {
            setError(error.message);
          }
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await axiosPrivate.post<Allergy>(`/allergy`, data);
      setAllergies([...allergies, response.data]);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div className="flex item-center justify-between w-full mb-8">
        <h1 className="text-3xl font-medium">Allergies</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Allergy</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Allergy</DialogTitle>
              <DialogDescription>
                Add a new global allergy for pharmacies to use.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input label="Allergy name" />
            </div>
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <DataTable
          name="Allergies"
          columns={columns}
          data={allergies}
          isLoading={loading}
        />
      </div>
    </>
  );
};
export default Allergies;
