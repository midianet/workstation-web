import useAppData from "@/data/hook/useAppData"

export default function Loading() {
    const { isLoading} = useAppData()
    return (
        <>
        {isLoading 
          ?(<div className="flex m-3 " >
                <progress id="main-progress" className="w-full"></progress>
            </div>
           )
          : false} 
        </>
    )
}