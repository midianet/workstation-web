import { SelectItem } from "@/components/Input/types"
import Layout from "@/components/template/Layout"
import Prompt from "@/models/Prompt"
import { ReactNode, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Template from "@/models/Template"

const PromptSchema = z.object({
    value: z.any()
        .transform(String)
        .refine(value => value.length > 0, {message: 'Campo Obrigatório'})
})

const ProjectSchema = z.object({
    name: z.string().nonempty('Template é obrigatório'),
    prompts: z.array(PromptSchema),
})

 type ProjectData = z.infer<typeof ProjectSchema>


export default function ProjetoNovo() {
    const { register, handleSubmit, formState: { errors }} = useForm<ProjectData>({
        resolver: zodResolver(ProjectSchema),
    })
    const[templateItems,setTemplateItems] = useState<SelectItem[]>([])
    const[template, setTemplate] = useState<Template>()
    
    useEffect(() => {
        setTemplateItems([
            {value: '1'  ,label:'LPS SpringBoot Java'}
        ])
    },[])

    const onSubmit = (data: any) => {
        console.log(data);
    }

    function makeInput(prompt: Prompt, index: number){
        if(prompt.type === 'checkbox'){
            return <input 
                        type="checkbox" 
                        {...register(`prompts[${index}].value`)}                        
                        className={`ml-2 mr-2 mt-0.5 w-5 h-5 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                    />
        }else if(prompt.type ===  'select'){
            return <select {...register(`prompts[${index}].value`)}
                           className={`border border-1 border-black text-black rounded-lg bg-gray-200 focus:outline-none focus:shadow-md px-2 py-2 border-black`}
                    >
                        <option value="">Escolha a opção...</option>
                        {prompt.options.map((item, index) => (
                            <option value={item.value} key={index}>
                                {item.label}
                            </option>
                        ))}
                    </select>
        }else{
            return <input
                          {...register(`prompts[${index}].value`)}
                          className={`border pl-2 text-black rounded-lg bg-gray-200 focus:outline-none focus:shadow-md px-1 py-1 border-black`}
                    />
        }
    }

    function renderField(prompt: Prompt, index: number): ReactNode {
        return <div key={index} className={`flex ${prompt.type === 'checkbox' ? 'flex-row':'flex-col'} pt-2 pb-2`}>
                    <label htmlFor={`prompts[${index}].value`}>{prompt.message}</label>
                    {makeInput(prompt,index)}
                    {errors?.prompts?.[index]?.value && <p>Value{errors.prompts[index]?.value.message}</p>}
               </div>
     }

    const handleChangeTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value != ''){
            setTemplate(new Template('LPS SpringBoot Java',
            [
              new Prompt('name', 'text','Nome do projeto', undefined, 'xpto', null, '1'),
              new Prompt('packageName', 'text','Estutura de pacote',  undefined, 'br.com.cs', null, '2'),
              new Prompt('databaseType', 'select','Banco de Dados (Produção)', undefined, 'Postgresql', null, '3',[
                {label:'SQL Server', value: 'sqlserver'},
                {label:'Postgresql', value: 'postgresql'}
              ]),
              new Prompt('cacheStrategy', 'select','Estratégia de Consulta', undefined, 'cache', null, '4',[
                {label:'JPA (ByExample)', value: 'none'},
                {label:'Cache (EHCache)', value: 'cache'},
                {label:'CQRS (ElasticSearch)', value: 'cqrs'},
              ]),              
              new Prompt('swagger', 'checkbox','Documentação Swagger', 'true', null, null, '5'),
              new Prompt('hystrix', 'checkbox','Circuit Breaker (Hystrix)', 'false', null, null, '6'),
              new Prompt('graphql', 'checkbox','GraphQL (Query)', 'false', null, null, '7'),
              new Prompt('liquibase', 'checkbox','Versionamento de BD (Liquibase)', 'false', null, null, '8'),
              new Prompt('audit', 'checkbox','Auditoria', 'false', null, null, '8'),
            ]))
        }else{
            setTemplate(undefined)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>        
        <Layout background >
            <div className="flex flex-col w-full">
                <span className="text-3xl text-neutral-500 dark:text-neutral-100 font-extralight shadow-md mb-2" >Novo Projeto</span>
                <div className="flex flex-col max-w-lg">
                    <label htmlFor="template">Template</label>
                    <select 
                        {...register('name')}
                        onChange={handleChangeTemplate} 
                        className={`
                            border
                            border-1
                            border-black
                            text-black
                            rounded-lg   
                            bg-gray-200
                            focus:outline-none
                            focus:shadow-md
                            px-2 py-2
                        `}>
                        <option value="">Escolha o template...</option>
                        {templateItems.map((template, index) => (
                            <option value={template.value} key={index}>
                                {template.label}
                            </option>
                        ))}
                    </select>
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                    <hr className="mt-2 h-0.5 border-t-0 bg-black opacity-40 dark:opacity-100 mb-2" />
                    <div className="max-w-lg">
                        {template?.prompts.map((prompt, index) => renderField(prompt, index))}
                    </div>
                <button type = 'submit'>Salvar</button>
            </div>
      </Layout>
      </form>
    )
}