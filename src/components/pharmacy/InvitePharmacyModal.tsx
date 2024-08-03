import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import ErrorProvider from "@/context/ErrorProvider.tsx";
import LoaderContext from "@/context/LoaderProvider.tsx";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { FormInput } from "@/components/ui/form-input.tsx";

interface FormData {
  pharmacyName: string;
  ownerEmail: string;
}

interface Props {
  onPharmacyInvited: () => void;
}

const InvitePharmacyModal = ({ onPharmacyInvited }: Props) => {
  const { setError } = useContext(ErrorProvider);
  const { loading, setLoading } = useContext(LoaderContext);
  const axiosPrivate = useAxiosPrivate();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
      reset,
  } = useForm<FormData>();

  useEffect(() => {
    setFocus("ownerEmail");
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await axiosPrivate.post("/pharmacy/invite", {
        pharmacyName: data.pharmacyName,
        email: data.ownerEmail,
      });
      onPharmacyInvited();
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
      setShowCreateModal(false);
    }
  };

  return (
    <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4" />
          <p>Add Pharmacy</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite pharmacy by email.</DialogTitle>
          <DialogDescription>
            Send an invitation to a pharmacy to register themselves on our
            platform. They will receive an email with instructions on how to
            complete their registration.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <div className="grid gap-1">
              <FormInput
                placeholder="Pharmacy name*"
                type="text"
                autoCorrect="off"
                autoComplete="off"
                disabled={loading}
                className={
                  errors.ownerEmail && "border-red-500 focus:border-red-500"
                }
                {...register("pharmacyName", { required: true })}
              />
              <p className="w-full h-3 text-xs text-red-500">
                {errors.ownerEmail?.type === "required" && "Required"}
              </p>
            </div>
            <div className="grid gap-1">
              <FormInput
                placeholder="Pharmacy owner email*"
                type="email"
                autoCorrect="off"
                autoComplete="off"
                disabled={loading}
                className={
                  errors.ownerEmail && "border-red-500 focus:border-red-500"
                }
                {...register("ownerEmail", { required: true })}
              />
              <p className="w-full h-3 text-xs text-red-500">
                {errors.ownerEmail?.type === "required" && "Required"}
              </p>
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            Invite
          </Button>
        </form>{" "}
      </DialogContent>
    </Dialog>
  );
};
export default InvitePharmacyModal;
