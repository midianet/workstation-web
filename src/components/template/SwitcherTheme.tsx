import { IconSun, IconMoon } from "./icons"

interface SwitcherThemeProps {
    theme: string
    onSwitch: () => void
}

export default function SwitcherTheme(props: SwitcherThemeProps) {
    return props.theme === 'dark' 
        ? (<div onClick={props.onSwitch} 
             className="hidden sm:flex items-center cursor-pointer bg-gradient-to-r from-gray-900 to-gray-500 w-14 lg:w-24 h-8 p-1 rounded-full border-slate-500 border-2"
            >
                <div className="flex items-center justify-center text-yellow-300 w-6 h-6 rounded-full">
                    {IconSun(4)}
                </div>
                <div className="hidden lg:flex items-center ml-2 text-white">
                    <span className="text-sm">Light</span>
                </div>
           </div>) 
        : (<div onClick={props.onSwitch} className="hidden sm:flex items-center cursor-pointer justify-end bg-gradient-to-r from-gray-500 to-gray-900 w-14 lg:w-24 h-8 p-1 rounded-full  border-slate-500 border-2">
                <div className="hidden lg:flex items-center mr-2 text-gray-300">
                    <span className="text-sm">Dark</span>
                </div>
                <div className="flex items-center justify-center text-yellow-300 w-6 h-6 rounded-full">
                    {IconMoon(4)}
                </div>
            </div>)
}