import { useEffect, useState } from "react";
import axios from "axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { Catalogues, Products } from "../../../interfaces/products";
import { useForm } from "react-hook-form";
import { productSchema } from "../../../Schema/productSchema";
import useCheckboxStates from "../../../helper/CheckboxState";
import { toast } from "react-toastify";



const AddProduct = () => {
  const [categories, setCategories] = useState<Catalogues[]>([]);
  // const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Products>({ resolver: joiResolver(productSchema) });
  const [products, setProducts] = useState<Products[]>([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/categories`);
      setCategories(data);

    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  const {
    isActive,
    setIsActive,
    isHotDeal,
    setIsHotDeal,
    isGoodDeal,
    setIsGoodDeal,
    isNew,
    setIsNew,
    isShowHome,
    setIsShowHome,
    createNewProduct,
  } = useCheckboxStates();



  const onSubmit = async (product: Products) => {
    const newProduct = createNewProduct(product);
    console.log("Checkbox States:", {
      isActive,
      isHotDeal,
      isGoodDeal,
      isNew,
      isShowHome,
    });
    try {
      const { data } = await axios.post(`http://localhost:3000/products`, newProduct);
      console.log(newProduct);
      setProducts([...data.products]);
      toast.success("Thêm thành công");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra khi thêm sản phẩm.");
    }
  };

  return (
    <div className="px-4">
      <div className="w-full p-8 space-y-6 bg-white rounded-lg shadow-md bg-opacity-80">
        <h2 className="text-2xl font-bold text-gray-800">Thêm Sản Phẩm</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-600 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { minLength: 1 })}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <span className="text-red-500">{errors?.name.message}</span>}{" "}
              </div>
              <div className="flex flex-col">
                <label htmlFor="sku" className="text-gray-600 font-medium">
                  SKU
                </label>
                <input
                  type="text"
                  id="sku"
                  {...register("sku")}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.sku && <span className="text-red-500">{errors?.sku.message}</span>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="price_regular" className="text-gray-600 font-medium">
                  Price Regular
                </label>
                <input
                  type="number"
                  min={0}
                  id="price_regular"
                  {...register("price_regular", { min: 0 })}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price_regular && <span className="text-red-500">{errors?.price_regular.message}</span>}{" "}
              </div>
              <div className="flex flex-col">
                <label htmlFor="price-sale" className="text-gray-600 font-medium">
                  Price Sale
                </label>
                <input
                  type="number"
                  min={0}
                  id="price_sale"
                  {...register("price_sale", { min: 0 })}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price_sale && <span className="text-red-500">{errors?.price_sale.message}</span>}{" "}
              </div>
              <div className="flex flex-col">
                <label htmlFor="camera_resolution" className="text-gray-600 font-medium">
                  Camera Resolution
                </label>
                <input
                  type="text"
                  id="camera_resolution"
                  {...register("camera_resolution")}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.camera_resolution && <span className="text-red-500">{errors?.camera_resolution.message}</span>}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Operating System</label>
                <input
                  type="text"
                  {...register("operating_system")}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.operating_system && <span className="text-red-500">{errors?.operating_system.message}</span>}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Storage</label>
                <input
                  type="text"
                  {...register("storage")}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.storage && <span className="text-red-500">{errors?.storage.message}</span>}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Catalogues</label>
                <select
                  {...register("catalogue_id")}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn hãng điện thoại</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.catalogue_id && <span className="text-red-500">{errors?.catalogue_id.message}</span>}
              </div>
              <div className="flex flex-col">
                {/* <label htmlFor="img_thumbnail" className="text-gray-600 font-medium">
                  Img Thumbnail
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    id="img_thumbnail"
                    multiple
                    {...register("img_thumnail")}
                    
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  />
                </div> */}
                {/* Hiển thị ảnh đã chọn */}
                {/* <div className="flex flex-wrap mt-3">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md m-1"
                    />
                  ))}
                </div> */}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="screen_size" className="text-gray-600 font-medium">
                  Screen Size
                </label>
                <input
                  type="text"
                  id="screen_size"
                  {...register("screen_size")}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.screen_size && <span className="text-red-500">{errors?.screen_size.message}</span>}{" "}
              </div>
              <div className="flex flex-col">
                <label htmlFor="battery_capacity" className="text-gray-600 font-medium">
                  Battery
                </label>
                <input
                  type="text"
                  id="battery_capacity"
                  {...register("battery_capacity")}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.battery_capacity && <span className="text-red-500">{errors?.battery_capacity.message}</span>}{" "}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Pocessor</label>
                <input
                  type="text"
                  {...register("processor")}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.processor && <span className="text-red-500">{errors?.processor.message}</span>}{" "}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Ram</label>
                <input
                  type="text"
                  {...register("ram")}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.ram && <span className="text-red-500">{errors?.ram.message}</span>}{" "}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Sim Type</label>
                <input
                  type="text"
                  {...register("sim_type")}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.sim_type && <span className="text-red-500">{errors?.sim_type.message}</span>}{" "}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">NetWork Connectivity</label>
                <input
                  type="text"
                  {...register("network_connectivity")}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.network_connectivity && (
                  <span className="text-red-500">{errors?.network_connectivity.message}</span>
                )}{" "}
              </div>
              <div className="flex flex-col">
                <label htmlFor="short_description" className="text-gray-600 font-medium">
                  Description Short
                </label>
                <textarea
                  id="short_description"
                  {...register("short_description")}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label htmlFor="description" className="text-gray-600 font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                ></textarea>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center">
                  <input type="checkbox" id="is-active" checked={isActive} onChange={() => setIsActive(!isActive)}
                   className="form-checkbox text-blue-500 focus:ring-blue-500" />
                  <label htmlFor="is-active" className="text-gray-600 ml-2">
                    Is Active
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="is-hot-deal" checked={isHotDeal} onChange={() => setIsHotDeal(!isHotDeal)} className="form-checkbox text-blue-500 focus:ring-blue-500" />
                  <label htmlFor="is-hot-deal" className="text-gray-600 ml-2">
                    Is Hot Deal
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is-good-deal" checked={isGoodDeal}
                    onChange={() => setIsGoodDeal(!isGoodDeal)}
                    className="form-checkbox text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="is-good-deal" className="text-gray-600 ml-2">
                    Is Good Deal
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="is-new" checked={isNew}
                onChange={() => setIsNew(!isNew)} className="form-checkbox text-blue-500 focus:ring-blue-500" />
                  <label htmlFor="is-new" className="text-gray-600 ml-2">
                    Is New
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is-show-home" checked={isShowHome}
                    onChange={() => setIsShowHome(!isShowHome)}
                    className="form-checkbox text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="is-show-home" className="text-gray-600 ml-2">
                    Is Show Home
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-700 rounded-md shadow-md transhtmlForm transition-all duration-200"
          >
            Thêm mới
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
