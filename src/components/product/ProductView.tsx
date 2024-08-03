import { FC, useCallback, useContext, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Clock, Loader } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import ErrorContext from "@/context/ErrorProvider.tsx";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { Product } from "@/types/product.ts";
import { ProductValue } from "@/components/product/ProductValue.tsx";
import CustomTable from "@/components/product/CustomTable.tsx";

interface Props {
  productId: number;
  onApprove: () => void;
}

const ProductViewContent: FC<Props> = ({ productId, onApprove }) => {
  const { setError } = useContext(ErrorContext);
  const axiosPrivate = useAxiosPrivate();
  const [showModal, setShowModal] = useState(false);

  const fetchProduct = useCallback(async (): Promise<Product> => {
    const response = await axiosPrivate.get<Product>(`/products/${productId}`);
    return response.data;
  }, [axiosPrivate, productId]);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product, Error>(["product", productId], fetchProduct, {
    enabled: showModal,
    onError: (err) => setError(err.message),
    staleTime: 5 * 60 * 1000,
  });

  const handleApproveProduct = async () => {
    try {
      await axiosPrivate.post(`/products/approve/${productId}`);
      onApprove();
    } catch (err) {
      setError("Failed to approve product");
    } finally {
      setShowModal(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader className="animate-spin w-4 h-4" />;
    }

    if (error) {
      return <p>Error loading product: {error.message}</p>;
    }

    if (!product) {
      return <p>Product not found</p>;
    }

    return (
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <p>Owned by </p>
            <Button variant="link" className="p-0 h-min" asChild>
              <Link to={`/pharmacy/${product.pharmacy.id}`}>
                {product.pharmacy.name}
              </Link>
            </Button>
          </div>
          {!product.isApproved && (
            <div className="ml-auto flex w-min items-center justify-center rounded-full border border-yellow-400 bg-yellow-300 px-2 py-1 text-center text-xs text-nowrap space-x-1.5">
              <Clock className="h-4 w-4" />
              <p>Pending approval</p>
            </div>
          )}
        </div>
        {[
          { label: "ID", value: product.id },
          { label: "NAME", value: product.name },
          { label: "DESCRIPTION", value: product.description },
          { label: "STRENGTH", value: product.strengthMg },
          {
            label: "CONTRAINDICATIONS DESCRIPTION",
            value: product.contraindicationsDescription,
          },
          {
            label: "STORAGE CONDITION DESCRIPTION",
            value: product.storageConditionDescription,
          },
          { label: "PRICE", value: product.price },
          { label: "BATCH NUMBER", value: product.batchNumber },
          { label: "BARCODE", value: product.barcode },
          { label: "PACKAGING WEIGHT", value: product.packagingWeight },
        ].map(({ label, value }) => (
          <div key={label} className="grid gap-2">
            <Label>{label}</Label>
            <ProductValue value={value ?? null} />
          </div>
        ))}
        <CustomTable
          title="Special Requirements"
          data={product.specialRequirement}
        />
        <CustomTable title="Manufacturer" data={product.manufacturer} />
        <CustomTable
          title="Regulatory Information"
          data={product.regulatoryInformation}
        />
        {product.activeIngredients.length > 0 && (
          <div className="overflow-x-auto flex items-center gap-2 w-full">
            {product.activeIngredients.map((ai, index) => (
              <CustomTable
                key={index}
                title={`Active Ingredient #${index + 1}`}
                data={ai}
              />
            ))}
          </div>
        )}
        {product.dosageForms.length > 0 && (
          <div className="overflow-x-auto flex items-center gap-2 w-full">
            {product.dosageForms.map((df, index) => (
              <CustomTable
                key={index}
                title={`Dosage form #${index + 1}`}
                data={df}
              />
            ))}
          </div>
        )}
        {product.routeOfAdministrations.length > 0 && (
          <div className="overflow-x-auto flex items-center gap-2 w-full">
            {product.routeOfAdministrations.map((ai, index) => (
              <CustomTable
                key={index}
                title={`Route of administration #${index + 1}`}
                data={ai}
              />
            ))}
          </div>
        )}
        {product.sideEffects.length > 0 && (
          <div className="overflow-x-auto flex items-center gap-2 w-full">
            {product.sideEffects.map((se, index) => (
              <CustomTable
                key={index}
                title={`Side effect #${index + 1}`}
                data={se}
              />
            ))}
          </div>
        )}
        {product.usageWarnings.length > 0 && (
          <div className="overflow-x-auto flex items-center gap-2 w-full">
            {product.usageWarnings.map((uw, index) => (
              <CustomTable
                key={index}
                title={`Usage warning #${index + 1}`}
                data={uw}
              />
            ))}
          </div>
        )}
        {product.allergies.length > 0 && (
          <div className="overflow-x-auto flex items-center gap-2 w-full">
            {product.allergies.map((a, index) => (
              <CustomTable
                key={index}
                title={`Allergy #${index + 1}`}
                data={a}
              />
            ))}
          </div>
        )}
        {product.indications.length > 0 && (
          <div className="overflow-x-auto flex items-center gap-2 w-full">
            {product.indications.map((i, index) => (
              <CustomTable
                key={index}
                title={`Indication #${index + 1}`}
                data={i}
              />
            ))}
          </div>
        )}
        {!product.isApproved && (
          <Button onClick={handleApproveProduct}>Approve product</Button>
        )}
      </div>
    );
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button variant="link">View more</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product details</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

const queryClient = new QueryClient();

const ProductView: FC<Props> = (props) => (
  <QueryClientProvider client={queryClient}>
    <ProductViewContent {...props} />
  </QueryClientProvider>
);

export default ProductView;
