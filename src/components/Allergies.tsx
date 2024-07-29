import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { DataTable } from "@/components/data-table.tsx";
import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import LoaderContext from "@/context/LoaderProvider.tsx";
import ErrorProvider from "@/context/ErrorProvider.tsx";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
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
  {
    id: "related-products",
    cell: () => <Button variant="outline">Products with this allergy</Button>,
  },
];

const Allergies = () => {
  const axiosPrivate = useAxiosPrivate();
  const { loading, setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorProvider);
  const [allergies, setAllergies] = useState<Allergy[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<FormData>();

  useEffect(() => {
    setFocus("name");
  }, []);

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

  // TODO: Add soner when adding new allergy
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await axiosPrivate.post<Allergy>(`/allergy`, {
        name: data.name,
      });
      setAllergies([...allergies, response.data]);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
      setValue("name", "");
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Add Allergy</DialogTitle>
                <DialogDescription>
                  Add a new global allergy for pharmacies to use.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-1 py-4">
                <Input
                  {...register("name", { required: "Required" })}
                  label="Allergy name"
                />
                <label className="w-full h-3 text-xs text-red-500">
                  {errors.name?.type === "required" && "Required"}
                </label>
              </div>
              <DialogFooter>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </form>
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
