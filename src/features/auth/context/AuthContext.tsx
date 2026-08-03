import {createContext,useEffect,useState, type JSX} from "react";
import type {User} from "../types/auth.types";

type AuthContextType = {
    user: User | null;
    token:string | null;
    login: ( accessToken:string, refreshToken:string, user: User,) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
};


export const AuthContext=createContext<AuthContextType>(null as any);

export const AuthProvider=({children}:{children:React.ReactNode}):JSX.Element=>{
    const [user,setUser]=useState<User | null>(null);
    const [accessToken,setAccessToken]=useState<string | null>(null);

    const [isLoading,setIsLoading]=useState<boolean>(true);

    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (
        storedUser &&
        storedUser !== "undefined" &&
        storedToken
    ) {
        setUser(JSON.parse(storedUser));
        setAccessToken(storedToken);
    }

    setIsLoading(false);
}, []);

    const login=(newAccessToken:string,newRefreshToken:string,newUser:User)=>{
        setUser(newUser);
        setAccessToken(newAccessToken);
        localStorage.setItem("user",JSON.stringify(newUser));
        localStorage.setItem("accessToken",newAccessToken);
        localStorage.setItem("refreshToken",newRefreshToken);
    };

    const logout=()=>{
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    const isAuthenticated=!!accessToken;

    return(
        <AuthContext.Provider value={
            {user,token:accessToken,login,logout,isAuthenticated,isLoading}
            }>
            {children}
        </AuthContext.Provider>
    );
}
