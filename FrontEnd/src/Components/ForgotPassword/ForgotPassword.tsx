import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "../Login/Login.css";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      // Gọi API để kiểm tra email người dùng
      const res = await axios.get(
        `http://localhost:3000/users?email=${data.email}`
      );
      const user = res.data[0];

      if (user) {
        const resetToken = Math.random().toString(36).substr(2);

        // Cập nhật resetToken cho người dùng trong db.json
        await axios.patch(`http://localhost:3000/users/${user.id}`, {
          resetToken,
        });

        // Hiển thị token (để mô phỏng gửi email)
        setMessage(
          `Password reset link: http://localhost:5173/reset-password/${resetToken}`
        );
      } else {
        setMessage("Email not found.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Forgot Password</h2>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && <p>Email is required</p>}

          <button type="submit">Submit</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
