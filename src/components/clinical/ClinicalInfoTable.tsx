import { ComponentType, useContext, useEffect, useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import LoaderContext from "@/context/LoaderProvider";
import ErrorProvider from "@/context/ErrorProvider";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { BaseEntity } from "@/types/base-entity";
import { Plus } from "lucide-react";

interface Props<T extends BaseEntity> {
  title: string;
  endpoint: string;
  form: ComponentType<{ onSubmit: (data: Partial<T>) => Promise<void> }>;
}

const ClinicalInfoTable = <T extends BaseEntity>({
  title,
  endpoint,
  form: Form,
}: Props<T>) => {
  const axiosPrivate = useAxiosPrivate();
  const { loading, setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorProvider);
  const [items, setItems] = useState<T[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const columns = useMemo<ColumnDef<T>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
    ],
    [],
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get<T[]>(`/${endpoint}`);
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
  }, []);

  const handleCreateSubmit = async (data: Partial<T>) => {
    setLoading(true);
    try {
      const response = await axiosPrivate.post<T>(endpoint, data);
      setItems((prevItems) => [...prevItems, response.data]);
      setShowCreateModal(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data ||
            "An error occurred while creating the attribute",
        );
      } else {
        setError("Unexpected error occurred while creating the attribute");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setShowCreateModal(true)}>
              <Plus className="mr-1 h-4 w-4 shrink-0" />
              <p>Add new</p>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new {title.toLowerCase()}</DialogTitle>
              <DialogDescription>
                Add a new global {title.toLowerCase()} for pharmacies to use.
              </DialogDescription>
            </DialogHeader>
            <Form onSubmit={handleCreateSubmit} />
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
    </div>
  );
};

export default ClinicalInfoTable;
