import { useState } from "react";

import "./App.css";

import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import PrivateRouter from "./Components/PrivateRoute";
import Dashboard from "./Admin/Dashboard";


function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<PrivateRouter />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
