import { SubmitButton, CancelButton } from "@/components/Input/index"

interface FormProps{
    title: string
    submitLabel?: string,
    children?: any
    isSubmitting?:boolean
    onSubmit: () => void
    onCancel: () => void
}

export default function Form(props: FormProps){
    return (
        <>
            <span className="text-3xl text-neutral-500 dark:text-neutral-100 font-extralight shadow-md mb-2" >{props.title}</span>
            <form onReset={props.onCancel} onSubmit={props.onSubmit}>
                <div className="flex justify-end">
                    <SubmitButton submitLabel={props.submitLabel} isSubmitting={props.isSubmitting}/>
                    <CancelButton/>
                </div>
                <div>
                    {props.children}
                </div>
            </form>
        </>
    )
}