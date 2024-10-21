import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayoutClient from "./layouts/layoutClient/LayoutClient";
import Home from "./layouts/layoutClient/Home";
import LayoutAdmin from "./layouts/layoutAdmin/LayoutAdmin";
import Dashboard from "./pages/Admin/Products/Dashboard";
import Products1 from "./pages/Admin/Products/Products";
import AddProduct from "./pages/Admin/Products/AddProduct";
import Categories from "./pages/Admin/Category/Categories";
import AddCategory from "./pages/Admin/Category/AddCategory";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
        </Route>


          {/* Admin */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />

          {/* San pham */}
          <Route path="products" element={<Products1 />} />
          <Route path="add/product" element={<AddProduct />} />

           {/* Danh muc */}
          <Route path="category" element={<Categories />} />
          <Route path="add/category" element={<AddCategory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
