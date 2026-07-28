import useSignUp from "../hooks/useSignUp";
import InputField from "../../../shared/components/InputField";
import Button from "../../../shared/components/Button";
import Dropdown from "../../../shared/components/Dropdown";

const SignUpPage = () => {
  const { handleSubmit, register, errors, signupMutation, onSubmit } = useSignUp();




  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
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
        <InputField
          type="email"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputField
          type="tel"
          placeholder="Phone"
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

        <Button type="submit" disabled={signupMutation.isPending}>
          {signupMutation.isPending ? "Signing up..." : "Signup"}
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
export default SignUpPage;