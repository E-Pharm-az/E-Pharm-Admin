import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table.tsx";
import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import LoaderContext from "@/context/LoaderProvider.tsx";
import ErrorProvider from "@/context/ErrorProvider.tsx";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useForm } from "react-hook-form";

interface ClinicalInfoItem {
  id: number;
  name: string;
}

interface ClinicalInfoTableProps {
  title: string;
  endpoint: string;
  columns: ColumnDef<ClinicalInfoItem>[];
}

const ClinicalInfoTable = ({
  title,
  endpoint,
  columns,
}: ClinicalInfoTableProps) => {
  const axiosPrivate = useAxiosPrivate();
  const { loading, setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorProvider);
  const [items, setItems] = useState<ClinicalInfoItem[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<{ name: string }>();

  useEffect(() => {
    setFocus("name");
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get<ClinicalInfoItem[]>(
          `/${endpoint}`,
        );
        setItems(response.data);
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
  }, [endpoint]);

  const onSubmit = async (data: { name: string }) => {
    setLoading(true);
    try {
      const response = await axiosPrivate.post<ClinicalInfoItem>(
        `/${endpoint}`,
        {
          name: data.name,
        },
      );
      setItems([...items, response.data]);
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
        <h1 className="text-3xl font-medium">{title}</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add {title.slice(0, -1)}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Add {title.slice(0, -1)}</DialogTitle>
                <DialogDescription>
                  Add a new global {title.toLowerCase()} for pharmacies to use.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-1 py-4">
                <Input
                  {...register("name", { required: "Required" })}
                  label={`${title.slice(0, -1)} name`}
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
          name={title}
          columns={columns}
          data={items}
          isLoading={loading}
        />
      </div>
    </>
  );
};

export default ClinicalInfoTable;
