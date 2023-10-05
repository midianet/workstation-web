//import { SubmitButton, CancelButton } from "@/components/Input/index"

import { FormEvent } from "react"

interface ListProps{
    title: string
    children?: any
    placeholder: string
    onSubmit: (e: FormEvent) => void
}

export default function List(props: ListProps){
    return (
        <>
            <span className="text-3xl text-neutral-500 dark:text-neutral-100 font-extralight shadow-md mb-2" >{props.title}</span>
            <form onSubmit={props.onSubmit}>
                <label htmlFor="nome" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Pesquisar</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" name="nome" id="default-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Filtrar por nome..." required/>
                    <button type="submit" className="text-white absolute right-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pesquisar</button>
                </div>
            </form>     
            <div className="pt-2" >
                {props.children}
            </div>
        </>
    )
}