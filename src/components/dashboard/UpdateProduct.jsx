import React, { useState } from "react";
import { CloudUploadIcon, Save, Upload, X } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../../services/constant";
import CreatableSelect from "react-select/creatable";
import { updateProduct } from "../../api/Product.API";
import { data } from "react-router-dom";

const MAX_FILE_SIZE = 5242880; // 5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const productsSchema = yup.object({
  clotheName: yup.string().required("Clothing name is required"),
  price: yup
    .number()
    .positive("Price must be positive")
    .required("Price is required"),

  category: yup.string().required("category is required"),
  mainImage: yup
    .mixed()
    .test("required", "Image is required", (value) => {
      return value && value.length > 0; // Checks if a file is selected
    })
    .test("fileSize", "File size is too large", (value) => {
      return value && value[0] && value[0].size <= MAX_FILE_SIZE; // Checks file size
    })
    .test("fileFormat", "Unsupported file format", (value) => {
      return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type); // Checks file type
    }),

  quantity: yup
    .number()
    .integer()
    .min(0, "Quantity must be positive")
    .required("Quantity is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

export const UpdateProduct = ({
  onclose,
  onConfirme,
  ShowMadal,
  onCancel,
  editingProduct,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(productsSchema),
  });

  return (
    <div>
      {" "}
      <div
        className="fixed inset-0 mt-32 pb-10 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onclose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-fade-in"
        >
          {" "}
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              {editingProduct ? "Modifier le produit" : "Nouveau produit"}
            </h3>
            <button onClick={onclose} className="p-2 hover:bg-gray-100 rounded">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit(onConfirme)} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Produit Name
                </label>
                <input
                  type="text"
                  {...register("clotheName")}
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={editingProduct?.clotheName}
                />
                {errors.clotheName && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.clotheName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  {...register("title")}
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={editingProduct?.title}
                />
                {errors.title && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                {...register("description")}
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
                defaultValue={editingProduct?.description}
              ></textarea>
              {errors.description && (
                <p className="text-sm text-red-600 font-medium">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Price (NGN)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price")}
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={editingProduct?.price}
                />
                {errors.price && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  {...register("quantity")}
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={editingProduct?.quantity}
                />
                {errors.quantity && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  {...register("category")}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option>men</option>
                  <option>women</option>
                  <option>men accessories</option>
                  <option>women accessories</option>
                </select>
                {errors.category && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Produit Image
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer relative"
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    setSelectedImage(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="mx-auto mb-2 max-h-48 object-contain"
                  />
                ) : (
                  <>
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm text-gray-600">
                      Click to Upload or to dropdown
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  {...register("mainImage")}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedImage(file);
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                />
                {errors.mainImage && (
                  <p className="text-sm text-red-600 font-medium">
                    {errors.mainImage.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={onclose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                disabled={isSubmitting}
                type="submit"
                className={`flex items-center gap-3 px-2 md:px-10 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105"
                }`}
              >
                <CloudUploadIcon
                  className={isSubmitting ? "animate-spin" : ""}
                />
                {isSubmitting ? "Uploading..." : "Upload Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
