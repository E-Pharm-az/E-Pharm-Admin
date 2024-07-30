import { FC, useCallback, useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Clock, Copy, Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import ErrorContext from "@/context/ErrorProvider";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Product } from "@/types/product";

interface Props {
  productId: number;
}

interface ValueProp {
  value: string | number | null;
}

const ProductValue: FC<ValueProp> = ({ value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (value) {
      try {
        await navigator.clipboard.writeText(value.toString());
        setIsCopied(true);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const renderContent = () => {
    if (!value) {
      return <p>NULL</p>;
    }

    return (
      <>
        <p>{value}</p>
        <Button
          size="icon"
          variant="ghost"
          className="p-0"
          onClick={handleCopy}
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </>
    );
  };

  return (
    <div className="flex h-12 w-full rounded-md border px-3 py-2 text-sm border-input bg-background items-center justify-between">
      {renderContent()}
    </div>
  );
};

interface CustomTableProps {
  title: string;
  data: Record<string, any>;
}

const CustomTable: FC<CustomTableProps> = ({ title, data }) => {
  const formatKey = (key: string): string => {
    return key
      .split(/(?=[A-Z])/)
      .map((word) => word.toUpperCase())
      .join(" ");
  };

  return (
    <div className="grid gap-2 w-full">
      <Label>{title.toUpperCase()}</Label>
      <table className="w-full border border-input rounded-md">
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key} className="border-b w-full">
              <td className="p-2 w-1/2">
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
  );
};

const ProductViewContent: FC<Props> = ({ productId }) => {
  const { setError } = useContext(ErrorContext);
  const axiosPrivate = useAxiosPrivate();
  const [showModal, setShowModal] = useState(false);

  const fetchProduct = useCallback(async (): Promise<Product> => {
    const response = await axiosPrivate.get<Product>(`/product/${productId}`);
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
      await axiosPrivate.post(`/product/approve/${productId}`);
    } catch (err) {
      setError("Failed to approve product");
    }
    finally {
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
          { label: "STRENGTH", value: product.strengthMG },
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
