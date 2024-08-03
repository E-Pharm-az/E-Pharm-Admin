import { FC } from "react";
import { Label } from "@/components/ui/label";
import { ProductValue } from "@/components/product/ProductValue.tsx";

interface CustomTableProps {
  title: string;
  data: Record<string, any> | null | undefined;
}

const CustomTable: FC<CustomTableProps> = ({ title, data }) => {
  const formatKey = (key: string): string => {
    return key
      .split(/(?=[A-Z])/)
      .map((word) => word.toUpperCase())
      .join(" ");
  };

  if (!data) {
    return (
      <div className="grid gap-2 w-full min-w-[300px]">
        <Label>{title.toUpperCase()}</Label>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="grid gap-2 w-full min-w-[420px]">
      <Label>{title.toUpperCase()}</Label>
      <div className="overflow-x-auto">
        <table className="w-full border border-input rounded-md">
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key} className="border-b w-full">
                <td className="p-2 w-1/2 whitespace-nowrap">
                  <Label>{formatKey(key)}</Label>
                </td>
                <td className="py-2 px-4 w-1/2">
                  <ProductValue value={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
