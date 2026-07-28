import {Navigate} from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

type Props={
    children:React.ReactNode;
}

const ProtectedRoute=({children}:Props)=>{
    const {isAuthenticated,isLoading}=useAuth();
    if(isLoading){
        return <div>Loading...</div>;
    }
    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute;