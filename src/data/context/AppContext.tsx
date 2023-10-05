import { MessageType } from "@/components/Input/types";
import { createContext, useEffect, useState } from "react";

interface AppContextProps {
    theme?: string
    title: string
    message: MessageType|null
    onSwitchTheme?: () => void
    setMessage: (msg: MessageType) => void
    setLoading: (loading: boolean) => void
    isLoading: boolean
    children?: any
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props :AppContextProps) {
    const [theme, setTheme] = useState('dark')
    const [message, setMessage] = useState<MessageType|null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const title = 'Doit!'

    function switchTheme() {
        const newTheme = theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if(savedTheme) setTheme(savedTheme)
    }, [])

    useEffect(() => {
        if(message !== null) setTimeout(() => setMessage(null), 2500,)
    },[message])    

    return (
        <AppContext.Provider value={{
            theme: theme,
            title: title,
            message: message,
            setMessage: setMessage,
            setLoading:setLoading,
            isLoading:loading,
            onSwitchTheme: switchTheme
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext