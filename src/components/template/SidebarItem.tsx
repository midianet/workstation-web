import Link from 'next/link'

interface SidebarItemProps {
    text: string
    icon: any
    url?: string
    className?: string
    onClick?: (event: any) => void
}

export default function SidebarItem(props: SidebarItemProps) {
    function renderLink() {
        return (
            <div className={`flex flex-col justify-center items-center h-20 w-full dark:text-gray-200 ${props.className}`}>
                {props.icon}
                <span className="text-xs font-light">
                    {props.text}
                </span>
            </div>
        )
    }
    return (
        <li onClick={props.onClick} className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer h-20 w-full mb-0">
            {props.url ? (
                <Link href={props.url}>
                    {renderLink()}
                </Link>
            ) : (
                renderLink()
            )}
        </li>
    )
}