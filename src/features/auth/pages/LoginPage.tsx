import Button from "../../../shared/components/Button";
import InputField from "../../../shared/components/InputField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, errors, loginMutation, onSubmit } = useLogin();




  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <h1>Login Page for V1</h1>
        <InputField
          type="email"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputField
          type="password"
          placeholder="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
        <Button type="submit"   
        onClick={() => navigate("/signup")}>
          Signup
        </Button>
      </form>
    </div>
  );
}
const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};
const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "300px",
};

export default LoginPage;