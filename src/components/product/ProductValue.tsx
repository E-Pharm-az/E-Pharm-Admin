import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Check, Copy } from "lucide-react";

interface Props {
  value: string | number | null;
}

export const ProductValue: FC<Props> = ({ value }) => {
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
