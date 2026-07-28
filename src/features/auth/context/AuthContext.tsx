import {createContext,useEffect,useState} from "react";
import type {User} from "../types/auth.types";

type AuthContextType = {
    user: User | null;
    token:string | null;
    login: ( token:string,user: User,) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
};


export const AuthContext=createContext<AuthContextType>(null as any);

export const AuthProvider=({children}:{children:React.ReactNode}):React.ReactNode=>{
    const [user,setUser]=useState<User | null>(null);
    const [token,setToken]=useState<string | null>(null);
    const [isLoading,setIsLoading]=useState<boolean>(true);

    useEffect(()=>{
        const storedUser=localStorage.getItem("user");
        const storedToken=localStorage.getItem("token");
        if(storedUser && storedToken){
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setIsLoading(false);
        
    },[]);

    const login=(token:string,user:User)=>{
        setUser(user);
        setToken(token);
        localStorage.setItem("user",JSON.stringify(user));
        localStorage.setItem("token",token);
    };

    const logout=()=>{
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const isAuthenticated=!!token;

    return(
        <AuthContext.Provider value={
            {user,token,login,logout,isAuthenticated,isLoading}
            }>
            {children}
        </AuthContext.Provider>
    );
}
