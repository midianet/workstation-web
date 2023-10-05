import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { InputProps } from "@/components/Input/types"
import { InputErrorMessage } from "./InputErrorMessage";

export const CheckboxInput: FC<InputProps> = ({ 
  label, 
  name, 
  errors, 
  className, 
  readOnly }) => {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-items-start align-middle ml-1 mt-1 mb-1">
        <label htmlFor={name} className="mr-3" >
          {label}:
        </label>
        <input type="checkbox" 
               {...register(name)} 
               className={`w-5 h-5 mt-0.5 
               border
               text-black
               rounded-lg   
             bg-gray-200
               focus:outline-none
               focus:shadow-md
               ${ className }
               ${ readOnly ? '' : 'focus:bg-white' }
               ${ errors?.[name] ? 'border-red-600 focus:border-red-600': 'border-gray-800 focus:border-blue-600'}
               
               `} />
      </div>
      <InputErrorMessage name={name} errors={errors} />      
    </div>
  )
}