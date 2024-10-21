import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import "../Login/Login.css";

const ResetPassword = () => {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      // Tìm người dùng với resetToken
      const res = await axios.get(
        `http://localhost:3000/users?resetToken=${token}`
      );
      const user = res.data[0];

      if (user) {
        // Cập nhật mật khẩu mới và xóa resetToken
        await axios.patch(`http://localhost:3000/users/${user.id}`, {
          password: data.password,
          resetToken: null,
        });

        setMessage("Password has been reset successfully.");
      } else {
        setMessage("Invalid or expired token.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Reset Password</h2>
        <div className="input-box">
          <input
            type="password"
            placeholder="Enter your new password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <p>Password must be at least 6 characters long.</p>
          )}
          <button type="submit">Submit</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
