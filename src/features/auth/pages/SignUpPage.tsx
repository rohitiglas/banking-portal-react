import useSignUp from "../hooks/useSignUp";
import InputField from "../../../shared/components/InputField";
import Button from "../../../shared/components/Button";
import Dropdown from "../../../shared/components/Dropdown";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    errors,
    signupMutation,
    onSubmit,
  } = useSignUp();

  return (
    <div style={pageStyle}>
      <div style={leftPanelStyle}>
        <h1 style={bankTitle}>🏦 HDFC BANK</h1>

        <h2 style={headingStyle}>
          Open Your Digital Banking Account
        </h2>

        <p style={descriptionStyle}>
          Join thousands of customers using our secure digital banking platform.
          Open your account in just a few minutes.
        </p>

        <div style={featureStyle}>🔒 Bank-grade Security</div>
        <div style={featureStyle}>⚡ Instant Account Access</div>
        <div style={featureStyle}>💳 Online Banking & Payments</div>
        <div style={featureStyle}>📱 Mobile Banking Support</div>
      </div>

      <div style={rightPanelStyle}>
        <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
          <h2 style={{ margin: 0 }}>Create Account</h2>

          <p style={subTitleStyle}>
            Fill in your information to get started.
          </p>

          <Dropdown
            label="Role"
            options={[
              { label: "Select Role", value: "" },
              { label: "Customer", value: "customer" },
              { label: "Admin", value: "admin" },
            ]}
            {...register("role")}
            error={errors.role?.message}
          />

          <div style={rowStyle}>
            <InputField
              type="text"
              placeholder="First Name"
              {...register("firstName")}
              error={errors.firstName?.message}
            />

            <InputField
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
          </div>

          <InputField
            type="email"
            placeholder="Email Address"
            {...register("email")}
            error={errors.email?.message}
          />

          <InputField
            type="tel"
            placeholder="Phone Number"
            {...register("phone")}
            error={errors.phone?.message}
          />

          <InputField
            type="password"
            placeholder="Password"
            {...register("password")}
            error={errors.password?.message}
          />

          <InputField
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending
              ? "Creating Account..."
              : "Create Account"}
          </Button>

          <div style={footerStyle}>
            Already have an account?
            <button
              type="button"
              onClick={() => navigate("/login")}
              style={linkButtonStyle}
            >
              Login
            </button>
          </div>
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
  padding: "70px",
};

const rightPanelStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
};

const formStyle: React.CSSProperties = {
  width: "480px",
  background: "#fff",
  padding: "40px",
  borderRadius: "18px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  boxShadow: "0 15px 35px rgba(0,0,0,.12)",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
};

const bankTitle: React.CSSProperties = {
  fontSize: "42px",
  marginBottom: "16px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "34px",
  marginBottom: "20px",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "18px",
  lineHeight: 1.7,
  marginBottom: "35px",
  maxWidth: "450px",
};

const featureStyle: React.CSSProperties = {
  fontSize: "18px",
  marginBottom: "18px",
};

const subTitleStyle: React.CSSProperties = {
  color: "#666",
  marginBottom: "10px",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "10px",
  color: "#666",
};

const linkButtonStyle: React.CSSProperties = {
  marginLeft: "6px",
  border: "none",
  background: "transparent",
  color: "#0059b3",
  cursor: "pointer",
  fontWeight: 600,
};

export default SignUpPage;