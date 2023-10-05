interface TitleProps {
    title: string
}

export default function Title(props: TitleProps) {
    return (
        <div>
            <h1 className="hidden sm:flex font-black text-3xl text-gray-900 dark:text-gray-100 p-3">
                {props.title}
            </h1>
        </div>
    )
}