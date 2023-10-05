import queryString from 'query-string'

import { Page } from "@/components/Input/types"
import { ErrorResponse } from "./Types"

export interface ProjetoPropriedade{
    nome: string,
    valor: string|boolean
}

export interface Projeto{
    nome: string,
    justificativa: string,
    temporario: boolean,
    template: number,
    propriedades: ProjetoPropriedade[]
}

export interface Template {
    id: number,
    nome: string
}

export interface ProjetoLista{
    nome: string,
    temporario: boolean,
    template: Template
}

export default class ProjetoService {

    async create(projeto: Projeto): Promise<void> {
        return fetch('http://localhost:8080/projetos',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projeto)
        })
        .then(response => {
            if(response.ok) return
            return response.json()
                .then((error: ErrorResponse) => {
                    throw new Error(error.message)
                })
        })
        .catch(error => {
            throw error 
        })
    }

    async listProjetos(filtro?: string, page?: number, size?: number): Promise<Page<ProjetoLista>>{
        const queryParams = queryString.stringify({
            dono: true,
            ...filtro && { filtro },
            ...page && { page },
            ...size && { size },
        });
        const url = `http://localhost:8080/projetos?${queryParams}`
        const response = await fetch(url)
        if (response.ok) return response.json()
        const error = await response.json()
        throw new Error(error.message)
     }

}



// {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   }