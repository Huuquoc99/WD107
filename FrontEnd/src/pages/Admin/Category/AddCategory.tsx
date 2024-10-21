import React, { useEffect, useState } from "react";
import Joi from "joi";
import axios from "axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { Catalogues } from "../../../interfaces/products";
import { useForm } from "react-hook-form";

export const categorySchema = Joi.object({
  name: Joi.string().required().min(1),
  catagonalcatalogue_id: Joi.string().required(),
  cover: Joi.string().required(),
  is_active: Joi.number().required(),
});

const AddCategory = () => {
  const [categories, setCategories] = useState<Catalogues[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Catalogues>({ resolver: joiResolver(categorySchema) });

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/categories`);
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const onSubmit = async (category: Catalogues) => {
    try {
      const { data } = await axios.post(`http://localhost:3000/categories`, category);
      setCategories([...categories, data]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const previews = Array.from(files).map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        });
      });

      Promise.all(previews).then((urls) => {
        setImagePreviews(urls);
      });
    }
  };

  return (
    <div className="px-4">
      <div className="w-full max-w-[750px] p-8 space-y-6 bg-white rounded-lg shadow-md bg-opacity-80">
        <h2 className="text-2xl font-bold text-gray-800">Thêm Danh Mục </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex bg-white rounded-lg shadow-lg p-6">
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
                {errors.name && <span className="text-red-500">{errors?.name.message}</span>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="cover" className="text-gray-600 font-medium">
                  Cover
                </label>
                <input
                  type="file"
                  id="cover"
                  {...register("cover")}
                  onChange={handleFileChange}
                  multiple // Cho phép chọn nhiều ảnh
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-wrap mt-3">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md m-1"
                    />
                  ))}
                </div>
                <div className="flex items-center mt-3">
                  <input type="checkbox" id="is-active" className="form-checkbox text-blue-500 focus:ring-blue-500" />
                  <label htmlFor="is-active" className="text-gray-600 ml-2">
                    Is Active
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-700 rounded-md shadow-md transition-all duration-200"
          >
            Thêm mới
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;