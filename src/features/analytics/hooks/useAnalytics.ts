import { useQuery } from "@tanstack/react-query"
import { fetchAnalytics } from "../services/analyticsService"

const useAnalytics=()=>{
    const {data,isLoading,error}=useQuery({
        queryKey:["analytics"],
        queryFn:fetchAnalytics
    });
    return {data,isLoading,error}
}
export default useAnalytics