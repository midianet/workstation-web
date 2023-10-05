import { SelectItem, Page } from "@/components/Input/types"
import { ErrorResponse } from "./Types"

export interface Opcao {
    rotulo: string,
    valor: string
}

export interface Prompt {
    id?: number,
    nome: string,
    tipo: 'STRING'|'LIST'|'CONFIRM',
    mensagem: string,
    exemplo?: string,
    regex?: string,
    obrigatorio: boolean,
    valorInicial?: string,
    opcoes?: Opcao[]
}

export interface Template  {
    id?: number,
    nome: string,
    prompts: Prompt[]
}

export default class TemplateService {

    async listSelectItem(): Promise<SelectItem[]>{
       return await this.list().then((page) => {
            return page.content.map((l) => {return {value: String(l.id), label: l.nome}})
       })
    }

    async list(): Promise<Page<Template>> {
        return fetch('http://localhost:8080/templates')
            .then(response => {
                if(response.ok) return response.json()
                return response.json()
                    .then((error: ErrorResponse) => {
                        throw new Error(error.message)
                    })
            })
            .catch(error => {
                throw error
            })
    }

    async findById(id:number): Promise<Template> {
        return fetch(`http://localhost:8080/templates/${id}`)
            .then((response) => {
                if(response.ok) return response.json()
                return response.json()
                    .then((error: ErrorResponse) => {
                        throw new Error(error.message)
                    })
            })
            .catch(error => {
                throw error
            })
    }

}