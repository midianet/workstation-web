//import useAuth from "../../data/hook/useAuth"
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import { IconApp, IconBell, IconExit, IconHome, IconNewApp, IconSettings } from "./icons";

export default function Sidebar() {
 //   const { logout } = useAuth()
    return (
        <aside className="flex flex-col text-gray-700 bg-gray-200 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center  border-b-3 border-zinc-400 bg-gradient-to-b from-gray-200 to-gray-900 dark:from-gray-900 dark:to-gray-500 h-16 w-36 mt-0">
                <Image src={'/images/cnp_logo.png'}
                    width="150"
                    height="50"
                    priority
                    alt="logo"
                    className="cursor-pointer"
                />
            </div>
            <ul className="flex-grow">
                <SidebarItem url="/" text="Início" icon={IconHome} />
                <SidebarItem url="/projetos/novo" text="Novo Projeto" icon={IconNewApp} />                
                <SidebarItem url="/projetos/lista" text="Meus Projetos" icon={IconApp} />
                <SidebarItem url="/ajustes" text="Ajustes" icon={IconSettings} />
                <SidebarItem url="/notificacoes" text="Notificações" icon={IconBell} />
            </ul>
            <ul>
                <SidebarItem 
                    text="Sair" 
                    icon={IconExit} 
                    onClick={() => console.log('aki')}
                    className="text-red-600 dark:text-red-400 hover:bg-red-400 hover:text-white dark:hover:text-white"/>
            </ul>
        </aside>
    )
}