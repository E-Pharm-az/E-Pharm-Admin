import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ListFilter,
  Search,
  Trash2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { FormInput } from "@/components/ui/form-input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DataTableProps<TData, TValue> {
  name: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  onDelete: (ids: number[]) => void;
}

export function DataTable<TData extends { id: number; name?: string }, TValue>({
  name,
  columns,
  data,
  onDelete,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [columnNames, setColumnNames] = useState<string[]>([]);
  const [desc, setDesc] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedRows, setSelectedRows] = useState<TData[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  useEffect(() => {
    const headers = table
      .getAllColumns()
      .filter((column) => typeof column.columnDef.header === "string")
      .map((column) => column.columnDef.header as string);

    setColumnNames(headers);
  }, [table]);

  const handleCancelSearch = () => {
    setShowSearch(false);
    table.getColumn("name")?.setFilterValue("");
    setColumnFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.id !== "name"),
    );
  };

  const handleSort = (columnName: string) => {
    const column = table.getColumn(columnName);
    if (column) {
      setSelectedColumn(columnName);
      setSorting([{ id: column.id, desc: desc }]);
    }
  };

  const handleOrder = (desc: boolean) => {
    setDesc(desc);
    const column = table.getColumn(selectedColumn);
    if (column) {
      setSelectedColumn(selectedColumn);
      setSorting([{ id: column.id, desc: desc }]);
    }
  };

  const handleDeleteConfirmation = () => {
    const selectedIds = selectedRows.map((row) => row.id);
    onDelete(selectedIds);
    setShowDeleteConfirmation(false);
    setSelectedRows([]);
  };

  useEffect(() => {
    setSelectedRows(
      table.getSelectedRowModel().flatRows.map((row) => row.original),
    );
  }, [table.getSelectedRowModel().flatRows]);

  return (
    <div className="border rounded-md bg-white">
      <div className="p-2 border-b flex justify-between space-x-2">
        {showSearch && (
          <div className="relative items-center w-full">
            <Search className="absolute h-3.5 w-3.5 left-2.5 top-2.5 text-muted-foreground" />
            <FormInput
              placeholder={`Searching all ${name.toLowerCase()}`}
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="w-full h-8 appearance-none pl-8 shadow-none bg-background"
            />
          </div>
        )}
        <div className="space-x-2 flex ml-auto">
          {selectedRows.length > 0 ? (
            <Button
              onClick={() => setShowDeleteConfirmation(true)}
              size="sm"
              variant="destructive"
              className="px-2 h-8"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedRows.length})
            </Button>
          ) : (
            <>
              {showSearch ? (
                <Button
                  onClick={handleCancelSearch}
                  size="sm"
                  variant="destructive"
                  className="px-2 h-8 w-16"
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  onClick={() => setShowSearch(true)}
                  size="sm"
                  variant="outline"
                  className="px-2 space-x-2 h-8 w-16"
                >
                  <Search className="h-4 w-4" />
                  <ListFilter className="h-4 w-4" />
                </Button>
              )}
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="outline" className="px-2 h-8">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-3 mr-8 grid gap-3">
                  <h4 className="font-medium leading-none mb-1">Sort by</h4>
                  <RadioGroup defaultValue="name">
                    {columnNames.map((columnName, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          onClick={() => handleSort(columnName.toLowerCase())}
                          value={columnName.toLowerCase()}
                        />
                        <Label>{columnName}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Separator />

                  <div className="grid gap-2">
                    <button
                      className={`h-8 px-3 space-x-2 justify-start text-xs inline-flex items-center rounded-md font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground ${
                        !desc && "bg-accent text-accent-foreground"
                      }`}
                      onClick={() => handleOrder(false)}
                    >
                      <ArrowUp className="h-4 w-4" />
                      <p>Ascending</p>
                    </button>
                    <button
                      onClick={() => handleOrder(true)}
                      className={`h-8 px-3 space-x-2 justify-start text-xs inline-flex items-center rounded-md font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground ${
                        desc && "bg-accent text-accent-foreground"
                      }`}
                    >
                      <ArrowDown className="h-4 w-4" />
                      <p>Descending</p>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AlertDialog
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected items:
            </AlertDialogDescription>
            <ul className="list-disc list-inside mt-2">
              {selectedRows.map((row) => (
                <li className="text-sm text-muted-foreground" key={row.id}>{row?.name}</li>
              ))}
            </ul>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirmation}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
