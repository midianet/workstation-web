import Layout from "@/components/template/Layout"
import { FormEvent, useEffect, useState } from "react"

import useAppData from "@/data/hook/useAppData";
import ProjetoService, { ProjetoLista } from "@/data/service/ProjetoService";
import List from "@/components/forms/List";
import { Page } from "@/components/Input/types";

export default function ProjetoList() {
    const service = new ProjetoService()
    const { setMessage, setLoading } = useAppData()
    const [page, setPage] = useState<Page<ProjetoLista>>()
    
    useEffect(() => {
        fetchData()
     },[])

    function fetchData(filtro?: string){
        setLoading(true)
        service.listProjetos()
           .then(data => setPage(data))
           .catch(error => {
               setPage(undefined)
               setMessage({value: error.message, type: 'error'})
            })
            .finally(() => {
               setLoading(false)
            })
    }

    function handleFilter(e: FormEvent){
        console.log(e);
    }
   
    return (
        <Layout background >
            <List title="Meus Projetos" placeholder="Filtrar por nome..." onSubmit={handleFilter}>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="w-auto h-2 px-6 py-2">
                                    Projeto
                                </th>
                                <th scope="col" className="w-72 h-2 px-6 py-2">
                                    LPS
                                </th>
                                <th scope="col" className="w-36 h-2 px-6 py-2">
                                    Modo
                                </th>
                                <th scope="col" className="w-28 h-2 px-6 py-2">
                                    Ação
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {page?.content.map((projeto,index) => 
                                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {projeto.nome}
                                    </td>
                                    <td className="px-6 py-4">
                                       {projeto.template.nome}
                                    </td>
                                    <td className="px-6 py-4">
                                        {projeto.temporario ? 'Temporário' : 'Definitivo'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}>
                                    <nav aria-label="Pagina">
                                        <ul className="flex items-center -space-x-px h-8 text-sm">
                                            <li>
                                                <a href="#" className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                    <span className="sr-only">Previous</span>
                                                    <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                            </li>
                                            <li>
                                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                            </li>
                                            <li>
                                                <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                            </li>
                                            <li>
                                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                                            </li>
                                            <li>
                                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                                            </li>
                                            <li>
                                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                    <span className="sr-only">Next</span>
                                                    <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </List>
         </Layout>
    )
    
}