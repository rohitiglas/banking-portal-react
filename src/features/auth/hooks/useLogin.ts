import { loginResolver } from "./validation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { LoginRequest } from "../types/auth.types";
import { loginUser } from "../services/authServices";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const useLogin = () => {
  const navigate = useNavigate();
  const context=useContext(AuthContext);
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      context.login(data.token, data.user);
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: loginResolver,
  });

  const onSubmit=(data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loginMutation
  };
}
export default useLogin;