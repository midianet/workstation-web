import { ProjectFormType } from "@/models/Project"
import { FieldErrors } from "react-hook-form"

type ProjectFieldName = 
    | "name" 
    | "temporary"


export interface MessageType {
    value: string
    type: 'error' | 'success'
}    

export interface InputErrorProps {
    name: string
    errors?: FieldErrors
}  

export interface InputProps extends InputErrorProps {
    label: string
    type?: "text" | "email" | "time"
    placeholder?: string
    readOnly?: boolean
    className?: string
}

export interface SelectProps extends InputProps {
    options: {
      value: string
      label: string
    }[];
}

export interface ReactSelectProps extends SelectProps {
    isMulti: boolean
}

export interface SelectItem{
    value: string
    label: string
}

export interface Page<T>{
    content: T[]
}