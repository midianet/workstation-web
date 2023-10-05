import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { InputProps } from "@/components/Input/types"
import { InputErrorMessage } from "./InputErrorMessage";

export const Input: FC<InputProps> = ({
  label,
  type,
  name,
  placeholder,
  className,
  readOnly,
  errors,
}) => {
  const { register } = useFormContext()

  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor={name} className="mt-2">
          {label}
        </label>
        <input
          readOnly={readOnly ?? false}
          type={type ?? 'text'}
          {...register(name)}
          placeholder={placeholder}
          className={`
            border
            text-black
            rounded-lg   
          bg-gray-200
            focus:outline-none
            focus:shadow-md
            px-2 py-2
            ${ className }
            ${ readOnly ? '' : 'focus:bg-white' }
            ${ errors?.[name] ? 'border-red-600 focus:border-red-600': 'border-gray-800 focus:border-blue-600'}
          `}
        />
      </div>
      <InputErrorMessage name={name} errors={errors} />
    </div>
  );
};