// import { zodResolver } from "@hookform/resolvers/zod"
// import { FC } from "react"
// import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
// // import { ProjectFormSchema } from "@/models/Project"
// // import type { ProjectFormType } from "@/models/Project"
// import {
//   Input,
//   CheckboxInput,
// } from "@/components/Input/index"
// import Form from "./Form"
// import useAppData from "@/data/hook/useAppData"

// export const ProjectForm: FC = () => {
//   const { setMessage } = useAppData()
//   const methods = useForm<ProjectFormType>({
//     resolver: zodResolver(ProjectFormSchema),
// })

//   const {
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = methods

//   const onSubmit: SubmitHandler<ProjectFormType> = (data) => {
//     console.log(data);
//     setMessage({
//       value: 'Salvo com sucesso!',
//       type: "success"
//     })
//   }
  
//   return (
//     <FormProvider {...methods}>
//       <Form title="Novo Projeto" 
//             isSubmitting={isSubmitting}
//             onSubmit={handleSubmit(onSubmit)}
//             onCancel={reset}
//       >
//         <div className="flex flex-col  ">
//           <Input
//             type="text"
//             label="Nome"
//             placeholder="Informe o nome"
//             name="name"
//             className="max-w-lg"
//             errors={errors}
//           />
//           <Input
//             type="text"
//             label="Dono"
//             placeholder="Informe o dono"
//             name="owner"
//             errors={errors}
//           />
//           <CheckboxInput
//             label="Temporário (90 dias)"
//             name="temporary"
//             errors={errors}
//           />
//         </div>
//       </Form>
//     </FormProvider>
//   )
// }