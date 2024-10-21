import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Catalogues } from "../../../interfaces/products";
import { toast } from "react-toastify";

const Categories = () => {
  const [categories, setCategories] = useState<Catalogues[]>([]);
  const getCategories = async () => {
    const { data } = await axios.get(`http://localhost:3000/categories`);
    setCategories(data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const removeCategory = async (id:any) => {
    if (confirm("Bạn muốn xóa?")) {
      await axios.delete(`http://localhost:3000/categories/${id}`);
      setCategories(categories.filter((category: Catalogues) => category.id!== id));
      toast.success("Xóa thành công");
    }
  }
  return (
    <div>
      <div className="overflow-x-auto px-4 max-w-[850px]">
        <div className="flex my-6 justify-between">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Quản lý Danh Mục</h1>
          <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
        <div className="flex items-center mb-4 sm:mb-0">
          <form className="sm:pr-3" action="#" method="GET">
            <label htmlFor="products-search" className="sr-only">Search</label>
            <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
              <input type="text" name="email" id="products-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for category" />
            </div>
          </form>
        </div>
        <Link  to={"/admin/add/category"} className="text-black bg-blue-300 hover:bg-blue-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 " type="button" >
          Add new category
        </Link>
      </div>
        
        </div>

        <table className="min-w-full bg-white border rounded-md  border-gray-300 shadow-lg table-fixed">
          <thead className="bg-gray-200">
            <tr>
              <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">ID</th>
              <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Img Thumbnail</th>
              <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Name</th>
              <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Is Active</th>
              <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Action</th>

              
            </tr>
          </thead>
          <tbody  className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{category.id}</td>

                <td>
                  <img src={category.cover} alt="" width={30} height={30} />
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{category.name}</td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white" style={{ color: category.is_active === 1 ? "blue" : "red" }}>
                  {category.is_active === 1 ? "Yes" : "No"}
                </td>
                <td className="p-4 space-x-2 whitespace-nowrap">
                  <button type="button" data-drawer-placement="right" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                    Update
                  </button>
                  <button type="button" onClick={() => removeCategory(category.id!)}  data-drawer-placement="right" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    Delete
                  </button>
                </td> 
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
