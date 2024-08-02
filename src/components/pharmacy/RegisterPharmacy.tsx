import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import {useContext, useEffect} from "react";
import ErrorProvider from "@/context/ErrorProvider.tsx";
import LoaderContext from "@/context/LoaderProvider.tsx";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.ts";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  name: string;
  tin: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

const RegisterPharmacy = () => {
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

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await axiosPrivate.post("/pharmacy/register", {
        UserRequest: {
          Email: data.email,
          FirstName: data.firstName,
          LastName: data.lastName,
          Password: data.password,
        },
        PharmacyRequest: {
          Name: data.name,
          Tin: data.tin,
          ContactEmail: data.contactEmail,
          ContactPhone: data.contactPhone,
          Address: data.address,
        },
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFocus("email");
  }, []);

  return (
    <div className="w-1/3 mx-auto">
      <header className="flex items-center gap-2 w-full">
        <button onClick={() => navigate("/dashboard/pharmacies")}>
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-semibold md:text-2xl">Register Pharmacy</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className=" mt-12 grid gap-2">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <h2 className="text-xl font-semibold">Pharmacy administrator</h2>
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
          <div className="flex gap-2">
            <div className="w-full grid gap-1">
              <Input
                type="text"
                label="First Name"
                autoCorrect="off"
                disabled={loading}
                className={
                  errors.email && "border-red-500 focus:border-red-500"
                }
                {...register("firstName", { required: true })}
              />
              <label className="w-full h-3 text-xs text-red-500">
                {errors.email?.type === "required" && "Required"}
              </label>
            </div>
            <div className="w-full grid gap-1">
              <Input
                type="text"
                label="Last Name"
                autoCorrect="off"
                disabled={loading}
                className={
                  errors.email && "border-red-500 focus:border-red-500"
                }
                {...register("email", { required: true })}
              />
              <label className="w-full h-3 text-xs text-red-500">
                {errors.email?.type === "required" && "Required"}
              </label>
            </div>
          </div>
          <Input
            label="Password"
            type="password"
            autoCorrect="off"
            autoComplete="new-password"
            disabled={loading}
            className={errors.password && "border-red-500 focus:border-red-500"}
            {...register("password", { required: true })}
          />
          <label className="w-full h-3 text-xs text-red-500">
            {errors.password?.type === "required" && "Required"}
          </label>
        </div>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <h2 className="text-xl font-semibold">Pharmacy company details</h2>
          </div>
          <div className="grid gap-1">
            <Input
              label="Company Name"
              type="text"
              autoCorrect="off"
              disabled={loading}
              className={errors.email && "border-red-500 focus:border-red-500"}
              {...register("name", { required: true })}
            />
            <label className="w-full h-3 text-xs text-red-500">
              {errors.name?.type === "required" && "Required"}
            </label>
          </div>
          <div className="grid gap-1">
            <Input
              label="Tin"
              type="text"
              autoCorrect="off"
              disabled={loading}
              className={errors.tin && "border-red-500 focus:border-red-500"}
              {...register("tin", { required: true })}
            />
            <label className="w-full h-3 text-xs text-red-500">
              {errors.tin?.type === "required" && "Required"}
            </label>
          </div>
          <div className="grid gap-1">
            <Input
              label="Company Email"
              type="email"
              autoCorrect="off"
              disabled={loading}
              className={
                errors.contactEmail && "border-red-500 focus:border-red-500"
              }
              {...register("contactEmail", { required: true })}
            />
            <label className="w-full h-3 text-xs text-red-500">
              {errors.contactEmail?.type === "required" && "Required"}
            </label>
            <div className="grid gap-1">
              <Input
                label="Company Phone"
                type="text"
                autoCorrect="off"
                disabled={loading}
                className={
                  errors.contactPhone && "border-red-500 focus:border-red-500"
                }
                {...register("contactPhone", { required: true })}
              />
              <label className="w-full h-3 text-xs text-red-500">
                {errors.contactPhone?.type === "required" && "Required"}
              </label>
            </div>
            <div className="grid gap-1">
              <Input
                label="Tin"
                type="text"
                autoCorrect="off"
                disabled={loading}
                className={errors.tin && "border-red-500 focus:border-red-500"}
                {...register("tin", { required: true })}
              />
              <label className="w-full h-3 text-xs text-red-500">
                {errors.tin?.type === "required" && "Required"}
              </label>
            </div>
            <div className="grid gap-1">
              <Input
                label="Company address"
                type="text"
                autoCorrect="off"
                disabled={loading}
                className={
                  errors.address && "border-red-500 focus:border-red-500"
                }
                {...register("address", { required: true })}
              />
              <label className="w-full h-3 text-xs text-red-500">
                {errors.address?.type === "required" && "Required"}
              </label>
            </div>
          </div>
        </div>
        <Button type="submit" disabled={loading}>
          Register
        </Button>
        <Link
          to="/dashboard/pharmacies/invite-pharmacy"
          className="block text-sm underline"
        >
          Invite pharmacy
        </Link>
      </form>
    </div>
  );
};
export default RegisterPharmacy;
