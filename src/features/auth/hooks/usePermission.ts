import useAuth from "./useAuth"

const usePermission=()=>{
    const {user}=useAuth();
    const isAdmin=user?.role ==='admin';
    return{isAdmin}
}
export default usePermission