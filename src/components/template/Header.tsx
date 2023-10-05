import Title from "./Title"
import SwitcherTheme from "./SwitcherTheme"
import UserAvatar from "./UserAvatar"
import useAppData from '../../data/hook/useAppData'

interface HeaderProps {
    title: string
}

export default function Header(props: HeaderProps) {
    const { theme, onSwitchTheme } = useAppData()
    return (
        <div className="flex h-18 border-b-3 border-zinc-400 bg-gradient-to-b from-gray-200 to-gray-900 dark:from-gray-900 dark:to-gray-500">
            <Title title={props.title}/>
            <div className="flex flex-grow justify-end items-center pb-2 p-2">
                <UserAvatar className="ml-3 mr-3" />
                <SwitcherTheme theme={theme ?? 'dark'} onSwitch={onSwitchTheme} />
            </div>
        </div>
    )
}