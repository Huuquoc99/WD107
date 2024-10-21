import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Catalogues, Products } from "../../../interfaces/products";

const Products1 = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const getProducts = async () => {
    const { data } = await axios.get(`http://localhost:3000/products`);
    setProducts(data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  const removeProduct = async (id: any) => {
    if (confirm("Bạn muốn xóa ?")) {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter((product: Products) => product.id !== id));
      toast.success("Xóa thành công");
    }
  };

  const [categorys, setCategorys] = useState<Catalogues[]>([]);
  const getCategory = async () => {
    const { data } = await axios.get(`http://localhost:3000/categories`);
    setCategorys(data);
  };
  useEffect(() => {
    getProducts();
    getCategory();
  }, []);

  return (
    <div className="overflow-x-auto px-4">
      <div className="flex my-6 justify-between">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">All products</h1>
        <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
        <div className="flex items-center mb-4 sm:mb-0">
          <form className="sm:pr-3" action="#" method="GET">
            <label htmlFor="products-search" className="sr-only">Search</label>
            <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
              <input type="text" name="email" id="products-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for products" />
            </div>
          </form>
        </div>
        <Link to={"/admin/add/product"} className="text-black bg-blue-300 hover:bg-blue-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 " type="button" >
          Add new product
        </Link>
      </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-lg table-fixed">
        <thead className="bg-gray-200">
          <tr>
          <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                  </div>
                </th>
            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">ID</th>
            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Img Thumbnail</th>
            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Name</th>
            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Sku</th>
            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Catalogue</th>
            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Price Regular</th>
            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Price Sale</th>
            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Is Active</th>
            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Is Hot Deal</th>
            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Is Good Deal</th>
            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Is New</th>
            <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Action</th>
            
          </tr>
        </thead>
        <tbody  className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {products?.map((product, index) => {
            const categoryName = categorys.find((category) => category.id === product.catalogue_id)?.name || "N/A";
            return (
              <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                 <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input id="checkbox-{{ .id }}" aria-describedby="checkbox-1" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox-{{ .id }}" className="sr-only">checkbox</label>
                  </div>
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.id}</td>

                <td>
                  <img src={product.img_thumnail} alt="" width={30} height={20} />
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.name}</td>
                <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">{product.sku}</td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{categoryName}</td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.price_regular}</td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.price_sale}</td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white" style={{ color: product.is_active === 1 ? "blue" : "red" }}>
                  {product.is_active === 1 ? "Yes" : "No"}
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white" style={{ color: product.is_hot_deal === 1 ? "blue" : "red" }}>
                  {product.is_hot_deal === 1 ? "Yes" : "No"}
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white" style={{ color: product.is_good_deal === 1 ? "blue" : "red" }}>
                  {product.is_good_deal === 1 ? "Yes" : "No"}
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white" style={{ color: product.is_new === 1 ? "blue" : "red" }}>
                  {product.is_new === 1 ? "Yes" : "No"}
                </td>
                <td className="p-4 space-x-2 whitespace-nowrap">
                  <button type="button" data-drawer-placement="right" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                    Update
                  </button>
                  <button type="button" onClick={() => removeProduct(product.id!)}  data-drawer-placement="right" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    Delete
                  </button>
                </td>  
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center mb-4 sm:mb-0">
      <a href="#" className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
      </a>
      <a href="#" className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
      </a>
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-20</span> of <span className="font-semibold text-gray-900 dark:text-white">2290</span></span>
    </div>
    <div className="flex items-center space-x-3">
      <a href="#" className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        <svg className="w-5 h-5 mr-1 -ml-1"  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
        Previous
      </a>
      <a href="#" className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        Next
        <svg className="w-5 h-5 ml-1 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
      </a>
    </div>
  </div>
    </div>
  );
};

export default Products1;
