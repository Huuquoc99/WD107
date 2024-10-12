import React from "react";
import "./Register.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const Register = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>Register</h1>
        <div className="input-box">
          <input type="text" placeholder="Email" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input type="confirm-password" placeholder="Confirm-Password" required />
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
