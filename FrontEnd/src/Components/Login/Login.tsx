import React from "react";
import "./Login.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/user";
import { instance } from "../../apis";
import { zodResolver } from "@hookform/resolvers/zod";
const Schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  rPassword: z.string().min(6),
}) .refine((data) => data.password === data.rPassword, {
  message: "Passwords do not match",
  path: ["rPassword"], 
});
const Login = () => {
  const nav = useNavigate();
  const{
    register,
    handleSubmit,
    formState:{errors}
  }=useForm<User>({
    resolver:zodResolver(Schema)
  })
  const onSubmit = async(user:User)=>{
    const {data} = await instance.post(`/login`,user)
    localStorage.setItem("user",JSON.stringify(data.user))
    localStorage.setItem("accessToken", data.accessToken)
    nav("/register")
}
  return (
    <div className="wrapper">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Email" required  {...register("email",{required:true})} />
          {errors.email && 
          <span className="text-white">{errors.email.message}</span>
          }
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required   {...register("password",{required:true})} />
          {errors.password && 
          <span className="text-white">{errors.password.message}</span>
          }
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label htmlFor="remember-me">
            <input type="checkbox"/> Remember me
          </label>
          <a href="#">Forgot password</a>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div className="register-link">
          <p>Don't have an account? <a href="http://localhost:5173/">Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
