import React, { useState, useEffect, useMemo, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { AxiosError } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import LoaderContext from "@/context/LoaderProvider.tsx";
import ErrorContext from "@/context/ErrorProvider.tsx";
import { BaseEntity } from "@/types/base-entity.ts";
import { Button } from "@/components/ui/button.tsx";
import { DataTable } from "@/components/ui/data-table.tsx";

interface Props<T extends BaseEntity> {
  title: string;
  endpoint: string;
  form: React.ComponentType<{ onSubmit: (data: Partial<T>) => Promise<void> }>;
}

const ClinicalInfoPage = <T extends BaseEntity>({
  title,
  endpoint,
  form: Form,
}: Props<T>) => {
  const axiosPrivate = useAxiosPrivate();
  const { loading, setLoading } = useContext(LoaderContext);
  const { setError } = useContext(ErrorContext);
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
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get<T[]>(`/${endpoint}`);
        setItems(response.data);
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
    };

    fetchItems();
  }, [axiosPrivate, endpoint, setError, setLoading]);

  const handleCreateSubmit = async (data: Partial<T>) => {
    setLoading(true);
    try {
      const response = await axiosPrivate.post<T>(endpoint, data);
      setItems((prevItems) => [...prevItems, response.data]);
      setShowCreateModal(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data || "An error occurred while creating the item",
        );
      } else {
        setError("Unexpected error occurred while creating the item");
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
                Add a new {title.toLowerCase()} item.
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

export default ClinicalInfoPage;
