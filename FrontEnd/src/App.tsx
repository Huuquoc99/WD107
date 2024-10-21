import { useState } from "react";

import "./App.css";

import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import PrivateRouter from "./Components/PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ForgotPassword/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<PrivateRouter />}>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
