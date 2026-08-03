export type LoginRequest = {
  email: string;
  password: string;
};

export type User = {
  id:number;
  email: string;
  name: string;
  phone:string;
  role: "admin" | "customer";
};
export type LoginResponse = {
  token: string;
  user: User;
};

export type SignupRequest={
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    password:string;
    confirmPassword:string;
    role:"admin" | "customer";
}
export type SignupResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};