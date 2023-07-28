//import ForcarAutenticacao from '../auth/ForcarAutenticacao'


import Content from "./Content"
import Header from "./Header"
import Sidebar from "./Sidebar"
import useAppData from "@/data/hook/useAppData"

interface LayoutProps {
    title: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    const { theme } = useAppData()
    return (
        // <ForcarAutenticacao>
        <div className={`${theme} flex h-screen w-screen`}>
            <Sidebar/>
            <div className="flex flex-col w-full bg-gray-300 dark:bg-gray-800 m-0 p-0">
                <Header title={props.title}/>
                <Content>
                    {props.children}
                </Content>
            </div>
        </div>
        //  </ForcarAutenticacao>
    )
}