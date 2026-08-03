import Button from "../../../shared/components/Button";
import InputField from "../../../shared/components/InputField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, errors, loginMutation, onSubmit } = useLogin();

  return (
    <div style={pageStyle}>
      <div style={leftPanelStyle}>
        <h1 style={bankTitle}>🏦 HDFC BANK</h1>

        <h2 style={headingStyle}>
          Digital Banking Portal
        </h2>

        <p style={descriptionStyle}>
          Secure, fast and convenient banking for individuals and businesses.
        </p>

        <div style={featureStyle}>✔ Secure Authentication</div>
        <div style={featureStyle}>✔ 24×7 Banking Services</div>
        <div style={featureStyle}>✔ Real-Time Transactions</div>
      </div>

      <div style={rightPanelStyle}>
        <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
          <h2 style={{ marginBottom: 10 }}>Welcome Back</h2>

          <p style={subTitleStyle}>
            Login to access your banking dashboard.
          </p>

          <InputField
            type="email"
            placeholder="Email Address"
            {...register("email")}
            error={errors.email?.message}
          />

          <InputField
            type="password"
            placeholder="Password"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing In..." : "Login"}
          </Button>

          <div style={dividerStyle}>
            <span>New Customer?</span>
          </div>

          <Button
            type="button"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};

const pageStyle: React.CSSProperties = {
  display: "flex",
  minHeight: "100vh",
  background: "#eef3f9",
};

const leftPanelStyle: React.CSSProperties = {
  flex: 1,
  background: "linear-gradient(135deg,#003366,#0059b3)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "80px",
};

const rightPanelStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const formStyle: React.CSSProperties = {
  width: "420px",
  background: "white",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 12px 30px rgba(0,0,0,.15)",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const bankTitle: React.CSSProperties = {
  fontSize: "42px",
  marginBottom: "15px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "34px",
  marginBottom: "20px",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "18px",
  lineHeight: 1.7,
  maxWidth: "420px",
  marginBottom: "35px",
};

const featureStyle: React.CSSProperties = {
  marginBottom: "18px",
  fontSize: "18px",
};

const subTitleStyle: React.CSSProperties = {
  color: "#666",
  marginBottom: "20px",
};

const dividerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#888",
  margin: "10px 0",
};

export default LoginPage;