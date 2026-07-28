import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signupResolver } from "./validation";
import { signUpUser } from "../services/authServices";
import type { SignupRequest } from "../types/auth.types";

const useSignUp=()=>{
    const navigate=useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: signupResolver,
    });

    
     const signupMutation = useMutation({
        mutationFn: signUpUser,
        onSuccess: (data) => {
            console.log("Signup Passed:", data);
          navigate("/login");
        },
        onError: (error: Error) => {
           console.error("Signup failed:", error);
        },
      });

    const onSubmit = (data: SignupRequest) => {
        console.log("Signup Passed:", data);
        signupMutation.mutate(data);
    };

    return { handleSubmit, register, errors, signupMutation, onSubmit };
}
export default useSignUp;