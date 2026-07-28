import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});
const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits long" }),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters long" }),
  role: z.enum(["admin", "customer"], { message: "Role must be either 'admin' or 'customer'" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
export const loginResolver = zodResolver(loginSchema);
export const signupResolver = zodResolver(signupSchema);