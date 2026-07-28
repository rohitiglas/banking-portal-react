import { Navigate } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

type Props ={
    children:React.ReactNode,
    allowedRoles:string[]
}
const RoleProtectedRoutes=({children,allowedRoles}:Props)=>{
    const {user}=useAuth();

    if(!user || !allowedRoles.includes(user.role)){
        return <Navigate to="/access-denied"/>
    }
    return children;

}
export default RoleProtectedRoutes;