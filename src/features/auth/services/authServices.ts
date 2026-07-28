import type { LoginRequest, LoginResponse,SignupRequest,SignupResponse } from "../types/auth.types";

export const loginUser =async(data:LoginRequest):Promise<LoginResponse> =>{ 
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(data.email === 'admin@example.com' && data.password === 'password') {
            resolve({
                token: 'fake-jwt-token',
                user: {
                    id: 1,
                    email: 'admin@example.com',
                    name: 'Admin User',
                    role: 'admin',
                    phone: '1234567890'
                }
            });
        } else {
            reject(new Error('Invalid credentials'));
        }
        },1000);
    });
}
export const signUpUser =async(data:SignupRequest):Promise<SignupResponse> =>{ 
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(data.email !== '' && data.password !== '') {
            resolve({
                token: 'fake-jwt-token',
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