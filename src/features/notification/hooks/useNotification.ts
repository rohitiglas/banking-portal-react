import { useQuery } from "@tanstack/react-query"
import { fetchNotification } from "../services/NotificationService"

const useNotification=()=>{
    const {data,isLoading,error}=useQuery({
        queryKey:["notification"],
        queryFn:fetchNotification,
        refetchInterval:10000
    })
    return {
        data,isLoading,error
    }
}
export default useNotification;