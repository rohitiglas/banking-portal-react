import type { LoginRequest, LoginResponse,SignupRequest,SignupResponse } from "../types/auth.types";
import api  from "../../../services/api";

export const loginUser =async(data:LoginRequest):Promise<LoginResponse> =>{ 
    const response = await api.post<LoginResponse>('/auth/login', data);
    console.log("Login successful:response", response);
    return response.data;
}
export const refreshToken = async (refreshToken: string): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>('/auth/refresh-token', { refreshToken });
        console.log("Token refreshed successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Token refresh failed:", error);
        throw error;
    }
};

export const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        console.error("No refresh token found in local storage.");
        return null;
    }

    try {
        const response = await api.post<{ accessToken: string }>('/auth/refresh', { refreshToken });
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        console.log("Access token refreshed successfully:", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Failed to refresh access token:", error);
        return null;
    }
};
export const logoutUser = async (): Promise<void> => {
    try {
        await api.post('/auth/logout');
        console.log("Logout successful");
    } catch (error) {
        console.error("Logout failed:", error);
    }
};
export const signUpUser =async(data:SignupRequest):Promise<SignupResponse> =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(data.email !== '' && data.password !== '') {
            resolve({
                accessToken: 'fake-jwt-token',
                refreshToken: 'fake-refresh-token', 
                user: {
                    id: 1,
                    email: data.email,
                    name: `${data.firstName} ${data.lastName}`,
                    role: data.role,
                    phone: data.phone
                }
            });
        } else {
            reject(new Error('Invalid credentials'));
        }
        },1000);
    });
}