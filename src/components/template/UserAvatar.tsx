//import Link from 'next/link'
//import useAuth from '../../data/hook/useAuth'

import Image from "next/image"


interface UserAvatarProps {
    className?: string
}

export default function UserAvatar(props: UserAvatarProps) {
    //const { usuario } = useAuth()
    const user = { name : 'Marcos Fernando', imageUrl: ''}
    return (
        // <Link href="/perfil">
        <>
            <span className="font-black text-xl text-gray-900 dark:text-gray-100">{user.name}</span>
            <Image src={'/images/avatar.svg'}
                width="12"
                height="12"
                alt="Avatar"
                className={`h-12 w-12 rounded-full cursor-pointer border-slate-500 border-2 ${props.className}`}
            />
        </>
        // </Link>
    )
}