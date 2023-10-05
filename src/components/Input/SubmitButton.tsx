import { FC } from "react";

interface SubmitButtonProps {
  isSubmitting?:boolean
  submitLabel?: string,
}

export const SubmitButton: FC<SubmitButtonProps> = ({isSubmitting, submitLabel}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="bg-blue-400 py-2 px-3 mr-3 w-24 rounded cursor-pointer text-white  shadow-lg">
        {submitLabel ?? 'Salvar'}
    </button>
  )
}