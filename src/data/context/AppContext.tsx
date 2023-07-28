import { createContext, useEffect, useState } from "react";

// type Tema = 'dark' | ''

interface AppContextProps {
    theme?: string
    onSwitchTheme?: () => void
    children?: any
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props :AppContextProps) {
    const [theme, setTheme] = useState('dark')

    function switchTheme() {
        const newTheme = theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if(savedTheme) setTheme(savedTheme)
    }, [])

    return (
        <AppContext.Provider value={{
            theme: theme,
            onSwitchTheme: switchTheme
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext