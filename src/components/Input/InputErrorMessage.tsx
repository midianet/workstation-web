import { FC } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { InputErrorProps } from "@/components/Input/types";

export const InputErrorMessage: FC<InputErrorProps> = ({ errors, name }) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <p className="p-1 pt-0 text-red-400"  >{message}</p>}
    />
  );
};