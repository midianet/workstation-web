import Layout from "@/components/template/Layout"
import { ReactNode, useEffect, useState } from "react"

import { useForm } from 'react-hook-form';
import { SelectItem } from "@/components/Input/types";
import Form from "@/components/forms/Form";
import TemplateService, { Prompt } from "@/data/service/TemplateService";
import useAppData from "@/data/hook/useAppData";
import ProjetoService, { ProjetoPropriedade } from "@/data/service/ProjetoService";

type FormData = {
    [key: string]: string | boolean;
}

export default function ProjetoNovo() {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<FormData>()
    const[ templates,setTemplates ] = useState<SelectItem[]>([])
    const[ template, setTemplate ] = useState<string>()
    const[ prompts, setPrompts ] = useState<Prompt[]>([])
    const templateService = new TemplateService()
    const service = new ProjetoService()
    const { setMessage, setLoading } = useAppData()
    
    useEffect(() => {
        setLoading(true)
        templateService.listSelectItem()
            .then((data) => {
                setTemplates(data)
                setLoading(false)
            })
            .catch((error: Error) => {
                setTemplates([])
                setMessage({value: error.message, type: 'error'})
                setLoading(false)
            })
    },[])

    useEffect(() => {
        if(template){
            setLoading(true)            
            templateService.findById(+template)
                .then((data) => {
                    setPrompts(data.prompts)
                    setLoading(false)
                })
                .catch((error: Error) => {
                    setPrompts([])
                    setMessage({value: error.message, type: 'error'})
                    setLoading(false)
                })
        }
    },[template])

    function buildPropriedades(data: FormData, excluir: string[]): ProjetoPropriedade[]{
        const result: ProjetoPropriedade[] = []
        for (const key in data) {
            if (!excluir.includes(key)) {
                result.push({nome: key, valor: String(data[key])})
            }
        }
        return result
    }

    async function onSubmit(data: FormData){
        setLoading(true)
        const form = {
            nome: String(data.nome), 
            justificativa: String(data.justificativa), 
            temporario: Boolean(data.temporario),
            template: Number(data.template),
            propriedades: buildPropriedades(data,['nome', 'justificativa', 'temporario', 'template'])
        }
        service.create(form)
         .then(() => {
            setMessage({value: 'Projeto Criado com sucesso', type: 'success'})
            onReset()
            setLoading(false)
         })    
         .catch(error => {
             setMessage({value: error.message, type: 'error'})
             setLoading(false)
         });
    }

    function onReset(){
        setPrompts([])
        reset()
        setTemplate(undefined)
    }

    function makeInput(prompt: Prompt){
        if(prompt.tipo === 'CONFIRM'){
            return <input 
                        type="checkbox" 
                        {...register(prompt.nome,)}
                        className={`ml-2 mr-2 mt-0.5 w-5 h-5 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                    />
        }else if(prompt.tipo ===  'LIST'){
            return <select {...register(prompt.nome,{ required: 'Campo Obrigatório',})}
                           className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Escolha a opção...</option>
                        {prompt.opcoes?.map((item, index) => (
                            <option value={item.valor} key={index}>
                                {item.rotulo}
                            </option>
                        ))}
                    </select>
        }else{
            const validate = {required: 'Campo Obrigatório'}
            if(prompt.regex) validate['pattern'] = {value: RegExp(prompt.regex), message: 'Formato inválido'}
            return <input
                         {...register(prompt.nome, validate)}   
                          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
        }
    }

    function renderField(prompt: Prompt): ReactNode {
        return <div key={prompt.nome} className={`flex ${prompt.tipo === 'CONFIRM' ? 'flex-row':'flex-col'} pt-2 pb-2`}>
                    <label htmlFor={`[${prompt.nome}]`}>{prompt.mensagem} {prompt.exemplo && (<span className="text-gray-400 ml-2">{`( ${prompt.exemplo} )`}</span>)}</label>
                    {makeInput(prompt)}
                    {errors?.[prompt.nome] && <span className="text-red-500 dark:text-red-400">{errors?.[prompt.nome]?.message}</span>}
               </div>
     }
   
    return (
        <Layout background >
            <Form title="Novo Projeto"
                    submitLabel="Criar"
                    onCancel={onReset}
                    onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col max-w-2xl mb-2">
                    <label htmlFor="nome">Nome (<span className="text-gray-400 ml-2">xpto-api</span> )</label>
                    <input
                         {...register('nome', {
                                required: 'Campo Obrigatório', 
                                pattern: {
                                    value:  /^([a-z_][a-z0-9_\-]*)$/ ,  
                                    message: 'Valor Inválido: letras miúsculas baixa sem espaços, hifem permitido.'
                                }
                            })}
                        maxLength={20}
                        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}
                </div>
                <div className="flex flex-col max-w-2xl mb-2">
                    <label htmlFor="justificativa">Justificativa (<span className="text-gray-400 ml-2">Descreva a motivação da criação do novo projeto</span> )</label>
                    <textarea rows={2} cols={50}
                         {...register('justificativa', {required: 'Campo Obrigatório'})}
                        maxLength={200}
                        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}
                </div>
                <div className="flex max-w-7xl mb-2">
                    <div className="flex flex-col w-72 mr-2">
                        <label htmlFor="repositorio">Repositório</label>
                        <select
                            {...register('repositorio', {required: 'Campo Obrigatório'})}
                            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Escolha o Repositório...</option>
                            <option value="gitlab">Git Lab</option>
                        </select>
                        {errors.repositorio && <p className="text-red-500">{errors.repositorio.message}</p>}
                    </div>
                    <div className="flex flex-col w-96 mr-2">
                        <label htmlFor="repositorio">Ferramenta de Pipeline</label>
                        <select
                            {...register('pipeline', {required: 'Campo Obrigatório'})}
                            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Escolha a ferramenta de Pipeline...</option>
                            <option value="gilabrunner">Git Lab Runner</option>
                        </select>
                        {errors.pipeline && <p className="text-red-500">{errors.pipeline.message}</p>}
                    </div>
                    <div className="flex flex-col mr-2">
                        <label htmlFor="registry">Repositório Imagem</label>
                        <select
                            {...register('registry', {required: 'Campo Obrigatório'})}
                            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Escolha o Repositório da Imagem...</option>
                            <option value="dockerhub">Dockerhub</option>
                        </select>
                        {errors.deploy && <p className="text-red-500">{errors.deploy.message}</p>}                    
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="deploy">Destino do Deploy</label>
                        <select
                            {...register('deploy', {required: 'Campo Obrigatório'})}
                            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Escolha o destino do Deploy...</option>
                            <option value="gilabrunner">Contabo (Docker)</option>
                        </select>
                        {errors.deploy && <p className="text-red-500">{errors.deploy.message}</p>}                    
                    </div>
                </div>
                <div className="flex flex-row align-middle max-w-2xl">
                    <div className="flex flex-col w-72 mr-3">
                        <label htmlFor="template">Template</label>
                        <select
                            {...register('template', {required: 'Campo Obrigatório'})}
                            onChange={e => setTemplate(e.target.value)}
                            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Escolha o template...</option>
                            {templates.map((template, index) => 
                                <option value={template.value} key={index}>
                                    {template.label}
                                </option>
                            )}
                        </select>
                        {errors.template && <p className="text-red-500">{errors.template.message}</p>}
                    </div>
                    <div className="flex flex-row max-w-2xl pb-2 pt-7">
                        <label htmlFor="temporario">Temporário?</label>
                        <input 
                            type="checkbox" 
                            {...register("temporario")}
                            className={`ml-2 mr-2 mt-0.5 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                        />
                    </div>  
                </div>
                <hr className="mt-2 h-0.5 border-t-0 bg-black opacity-40 dark:opacity-100 mb-2" />
                <div className="max-w-xl">
                        {prompts.map((prompt) => renderField(prompt))}
                </div>
            </Form>
        </Layout>
    )
    
}