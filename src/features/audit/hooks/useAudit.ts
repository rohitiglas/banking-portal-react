import { useQuery } from "@tanstack/react-query"
import { fetchAudit } from "../services/AuditService"

const useAudit=()=>{
    const {data,isLoading,error}=useQuery({
        queryKey:["audit"],
        queryFn:fetchAudit
    });
    return {data,isLoading,error};
}
export default useAudit;