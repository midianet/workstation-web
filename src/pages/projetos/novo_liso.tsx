import { SelectItem } from "@/components/Input/types"
import Layout from "@/components/template/Layout"
import Prompt from "@/models/Prompt"
import Template from "@/models/Template"
import { useEffect, useState } from "react"
export default function ProjetoNovo() {
    const[templateId, setTemplateId] = useState('')
    const[templateItems,setTemplateItems] = useState<SelectItem[]>([])
    const[template, setTemplate] = useState<Template>()

    useEffect(() => {
        setTemplateItems([
            {value: '1'  ,label:'LPS SpringBoot Java'}
        ])
    },[])

    useEffect(() => {
        if(templateId !== '') {
            setTemplate(new Template('LPS SpringBoot Java',
            [
              new Prompt('name', 'INPUT','Nome do projeto', undefined, 'xpto', null, '1'),
              new Prompt('packageName', 'INPUT','Estutura de pacote',  undefined, 'br.com.cs', null, '2'),
              new Prompt('databaseType', 'LIST','Banco de Dados (Produção)', undefined, 'Postgresql', null, '3',[
                {label:'SQL Server', value: 'sqlserver'},
                {label:'Postgresql', value: 'postgresql'}
              ]),
              new Prompt('cacheStrategy', 'LIST','Estratégia de Consulta', undefined, 'cache', null, '4',[
                {label:'JPA (ByExample)', value: 'none'},
                {label:'Cache (EHCache)', value: 'cache'},
                {label:'CQRS (ElasticSearch)', value: 'cqrs'},
              ]),              
              new Prompt('swagger', 'CONFIRM','Documentação Swagger', undefined, null, null, '5'),
              new Prompt('hystrix', 'CONFIRM','Circuit Breaker (Hystrix)', undefined, null, null, '6'),
              new Prompt('graphql', 'CONFIRM','GraphQL (Query)', undefined, null, null, '7'),
              new Prompt('liquibase', 'CONFIRM','Versionamento de BD (Liquibase)', undefined, null, null, '8'),
              new Prompt('audit', 'CONFIRM','Auditoria', 'false', null, null, '8'),
            ]))
        }else{
            setTemplate(undefined)
        }

    },[templateId])

    function makeInput(prompt: Prompt, index: number){
        if(prompt.type === 'checkbox'){
            return (
                <div key={index} className="flex flex-row max-w-lg pt-2 pb-2">
                    <span className="pr-2" >{prompt.message}:</span>
                    <input 
                        type="checkbox"
                        value={prompt.value}
                        onChange={e => prompt.value = e.target.checked ? 'true': 'false'}
                        className={`
                            w-5
                            h-5
                            mt-0.5 
                            border
                            text-black
                            rounded-lg   
                            bg-gray-200
                            focus:outline-none
                            focus:shadow-md
                        `}                        
                    />
                </div>)
        }else if(prompt.type === 'LIST'){
            return (
                <div key={index} className="flex flex-col max-w-lg">
                    <div className="pt-2">
                        <span>{prompt.message}</span>
                        {prompt.example && <span className="text-gray-500 dark:text-gray-400 pl-2" >({prompt.example})</span>}
                    </div>
                    <select 
                        value={prompt.value}
                        onChange={e => prompt.value = e.target.value}  
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
                            ${prompt.error.length > 0 ? 'border-red-600': 'border-black'}
                        `}>
                        <option value={''}>Escolha a opção...</option>
                        {prompt.items.map((item, index) => (
                            <option value={item.value} key={index}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
            )
        }else{
            return (
                <div key={index} className="flex flex-col max-w-lg">
                    <div className="pt-2">
                        <span>{prompt.message}</span>
                        {prompt.example && <span className="text-gray-500 dark:text-gray-400 pl-2" >({prompt.example})</span>}
                    </div>
                    <input 
                        type="text" 
                        value={prompt.value} 
                        onChange={e => prompt.value = e.target.value} 
                        className={`
                          border
                        text-black
                          rounded-lg   
                        bg-gray-200
                          focus:outline-none
                          focus:shadow-md
                          px-1 py-1
                          ${prompt.error.length > 0 ? 'border-red-600': 'border-black'}
                        `}
                    />
                </div>)
        }
    }

    return (
        <Layout background >
            <div className="flex flex-col w-full">
                <span className="text-3xl text-neutral-500 dark:text-neutral-100 font-extralight shadow-md mb-2" >Novo Projeto</span>
                <div className="flex flex-col max-w-lg">
                    <label htmlFor="template">Template</label>
                    <select 
                        name="template" 
                        value={templateId} 
                        onChange={(e) => setTemplateId(e.target.value)} 
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
                </div>
                <hr className="mt-2 h-0.5 border-t-0 bg-black opacity-40 dark:opacity-100 mb-2" />
                {template ? template.prompts.map((prompt, index) => makeInput(prompt, index)): false }
                <button onClick={() => console.log(template?.prompts)}>Teste</button>                
            </div>
      </Layout>
    )
}