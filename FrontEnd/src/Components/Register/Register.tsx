import React from "react";
import "./Register.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User } from "../../interfaces/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { instance } from "../../apis";
import { MdDriveFileRenameOutline } from "react-icons/md";


const Schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  rPassword: z.string().min(6),
}) .refine((data) => data.password === data.rPassword, {
  message: "Passwords do not match",
  path: ["rPassword"], 
});

const Register = () => {
  const nav = useNavigate();
  const{
    register,
    handleSubmit,
    formState:{errors}
  }=useForm<User>({
    resolver:zodResolver(Schema)
  })
  const onSubmit = async(user:User)=>{
    const {data} = await instance.post(`/register`,user)
    nav("/login")
}
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <div className="input-box">
          <input type="name" placeholder="Name" required 
          {...register("name",{required:true})}
          />
          {errors.name && 
          <span className="text-white">{errors.name.message}</span>
          }
          <MdDriveFileRenameOutline className="icon" />
        </div>
        <div className="input-box">
          <input type="text" placeholder="Email" required 
          {...register("email",{required:true})}
          />
          {errors.email && 
          <span className="text-white">{errors.email.message}</span>
          }
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required
            {...register("password",{required:true})}
          />
           {errors.password && 
          <span className="text-white">{errors.password.message}</span>
          }
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Confirm-Password" required 
           {...register("rPassword",{required:true})}
          />
          {errors.rPassword && 
          <span className="text-white">{errors.rPassword.message}</span>
          }
          <FaLock className="icon" />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
