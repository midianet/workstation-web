import useAppData from "@/data/hook/useAppData"
import { IconError, IconMoon, IconSuccess } from "./icons"

export default function Message() {
    const { message } = useAppData()
    return (
        <>
            {message  
                ? (<div className={`flex flex-row justify-start items-center m-3 p-5 border border-r-gray-400 shadow-lg rounded-md ${message.type === 'success' ? 'bg-green-700'  : 'bg-red-700'}  `}>
                    {message.type === 'success' 
                     ? (<span className="text-green-900">{IconSuccess(16)}</span>) 
                     : (<span className="text-red-950">{IconError(16)}</span>)
                    }
                    <span className="pl-5 text-2xl text-white">{message.value}</span>
                   </div>
                  )
                : false}
        </>
    )
}