import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input.tsx";
import { useContext, useEffect } from "react";
import ErrorProvider from "@/context/ErrorProvider.tsx";
import LoaderContext from "@/context/LoaderProvider.tsx";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";

interface FormData {
  email: string;
}

const InvitePharmacy = () => {
  const navigate = useNavigate();
  const { setError } = useContext(ErrorProvider);
  const { loading, setLoading } = useContext(LoaderContext);
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormData>();

  useEffect(() => {
    setFocus("email");
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await axiosPrivate.post("/pharmacy/invite", {
        Email: data.email,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/3 mx-auto">
      <header className="flex items-center gap-2 w-full">
        <button onClick={() => navigate("/dashboard/pharmacies")}>
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-semibold md:text-2xl">Add Pharmacy</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className=" mt-12 grid gap-4">
        <div className="grid gap-1">
          <h2 className="text-xl font-semibold">Invite pharmacy by email.</h2>
          <p>
            Send an invitation to a pharmacy to register themselves on our
            platform. They will receive an email with instructions on how to
            complete their registration.
          </p>
        </div>
        <div className="grid gap-1">
          <Input
            type="email"
            label="Email"
            autoCorrect="off"
            autoComplete="email"
            disabled={loading}
            className={errors.email && "border-red-500 focus:border-red-500"}
            {...register("email", { required: true })}
          />
          <label className="w-full h-3 text-xs text-red-500">
            {errors.email?.type === "required" && "Required"}
          </label>
        </div>
        <Button type="submit" disabled={loading}>
          Invite
        </Button>
        <Link
          to="/dashboard/pharmacies/register"
          className="block text-sm underline"
        >
          Manually register pharmacy
        </Link>
      </form>
    </div>
  );
};
export default InvitePharmacy;
