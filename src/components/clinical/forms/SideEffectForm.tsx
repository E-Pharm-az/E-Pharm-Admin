import { FC, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/ui/form-input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SideEffect } from "@/types/product-attributes.ts";

export const SideEffectForm: FC<{
  onSubmit: (data: Partial<SideEffect>) => Promise<void>;
}> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SideEffect>();

  const onSubmitWrapper = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(onSubmit)(e);
  };

  return (
    <form onSubmit={onSubmitWrapper} className="grid gap-4">
      <div className="grid gap-1">
        <FormInput
          type="text"
          {...register("name", { required: "Required" })}
          placeholder="Name*"
        />
        {errors.name && (
          <p className="text-red-400 text-xs">{errors.name.message}</p>
        )}
      </div>
      <div className="grid gap-1">
        <FormInput
          type="text"
          {...register("description")}
          placeholder="Description"
        />
      </div>

      <Button type="submit">Create</Button>
    </form>
  );
};
