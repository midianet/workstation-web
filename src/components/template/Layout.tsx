//import ForcarAutenticacao from '../auth/ForcarAutenticacao'


import Content from "./Content"
import Header from "./Header"
import Loading from "./Loading"
import Message from "./Message"
import Sidebar from "./Sidebar"
import useAppData from "@/data/hook/useAppData"

interface LayoutProps {
    children?: any
    background?: boolean
}

export default function Layout(props: LayoutProps) {
    const { theme, title } = useAppData()
    const background = props.background ? 'flex justify-start flex-col m-2 p-3 bg-gray-200 dark:bg-slate-600 shadow-lg rounded-md': ''
    return (
        // <ForcarAutenticacao>
        <div className={`${theme} flex h-screen w-screen`}>
            <Sidebar/>
            <div className="flex flex-col w-full bg-gray-300 dark:bg-gray-800 m-0 p-0">
                <Header title={title}/>
                <Message/>
                <Loading/>
                <Content>
                    <div className={`mr-4 ${background}`}>
                        {props.children}
                    </div>
                </Content>
            </div>
        </div>
        //  </ForcarAutenticacao>
    )
}