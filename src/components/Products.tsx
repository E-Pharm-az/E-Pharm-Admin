import ProductsDataTable from "@/components/ProductsDataTable.tsx";

export interface Product {
  id: number;
  pharmaCompanyId: number;
  name: string;
  description: string;
  imageUrl?: string;
  isApproved: boolean;
  price: number;
}

const Products = () => {
  return (
    <div className="p-6 space-y-6 h-full">
      <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
      <ProductsDataTable />
    </div>
  );
};

export default Products;
