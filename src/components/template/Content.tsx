interface ContentProps {
    children?: any
}

export default function Content(props: ContentProps) {
    return (
        <div className="flex flex-col mt-2 ml-2 dark:text-gray-200">
            {props.children}
        </div>
    )
}