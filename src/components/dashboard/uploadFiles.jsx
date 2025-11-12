import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { Upload, X } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../../services/constant";
import CreatableSelect from "react-select/creatable";

import { data, useLocation } from "react-router-dom";
import axios from "axios";
import imageCompression from "browser-image-compression";

const productsSchema = yup.object({
  clotheName: yup.string().required("Clothing name is required"),
  price: yup
    .number()
    .positive("Price must be positive")
    .required("Price is required"),
  rate: yup
    .number()
    .min(0, "Minimum rating is 0")
    .max(5, "Maximum rating is 5"),
  brands: yup
    .object({
      value: yup.string().required("Brand is required"),
      label: yup.string().required(),
    })
    .required("Brand is required"),
  category: yup.string().required("category is required"),
  tags: yup
    .array()
    .of(
      yup.object({
        value: yup.string().required(),
        label: yup.string().required(),
      })
    )
    .min(1, "At least one tag is required"),

  images: yup
    .array()
    .min(1, "At least one image is required")
    .max(3, "Maximum 3 images allowed")
    .of(
      yup.object({
        file: yup
          .mixed()
          .required("File is required")
          .test(
            "fileSize",
            "File Size is too large",
            (file) => file?.size <= 5242880
          )
          .test("fileType", "Unsupported File Format", (file) =>
            ["image/jpeg", "image/png", "image/gif"].includes(file?.type)
          )
          .required("at least one image is required"),
      })
    ),

  color: yup.string().required("Color is required"),
  size: yup.string().required("Size is required"),
  quantity: yup
    .number()
    .integer()
    .min(0, "Quantity must be positive")
    .required("Quantity is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

export const ProductUploadForm = ({ onClose }) => {
  // const location = useLocation();
  // const sideBar = location.pathname === "/admin-dashboard/sidebar";
  // if (sideBar) return null;
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
    defaultValues: { tags: [{ value: [""] }], images: [] },
    resolver: yupResolver(productsSchema),
  });

  const {
    fields: tagsField,
    append: tagsAdd,
    remove: tagsRemove,
  } = useFieldArray({
    control,
    name: "tags",
  });

  // react select for tags

  const {
    fields: imageFields,
    append: addImage,
    remove: removeImages,
  } = useFieldArray({
    control,
    name: "images",
  });

  useEffect(() => {
    // prevent background scroll while modal is open
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") {
        onclose?.();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, []);

  const handleSaveDraft = () => {
    const values = getValues();
    localStorage.setItem(
      "productDraft",
      JSON.stringify({
        data: values,
        counts: values.images.length,
        at: new Date().toISOString(),
      })
    );
    toast.success("Draft saved successful");
  };
  // get draft from localstorag
  useEffect(() => {
    try {
      const draft = localStorage.getItem("productDraft");
      if (draft) {
        const parsed = JSON.parse(draft);

        Object.keys(parsed.data).forEach((key) => {
          setValue(key, parsed.data[key]);
        });
        toast.success("last session data got successful");
      }
    } catch (err) {
      console.error("error when geting draft from local storage", err);
      toast.error("error occured when getting last session data");
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      // 1️⃣ Récupérer la signature depuis ton backend
      const toastId = toast.loading("data submitting...");
      const signatureRes = await api.get("/auth/signature");
      console.log("Signature =>", signatureRes.data);

      if (!signatureRes.data) return;

      const { signature, timestamp, cloud_key, cloud_name } = signatureRes.data;

      // 2️⃣ Créer le FormData pour l’upload Cloudinary

      const uploadImages = [];

      for (const imagObj of data.images) {
        const formData = new FormData();
        formData.append("file", imagObj.file);
        console.log("imagefile==>", imagObj);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("api_key", cloud_key);
        // 3️⃣ Upload vers Cloudinary
        const imageRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );

        if (!imageRes.data?.secure_url) return;
        const { secure_url } = imageRes.data;

        uploadImages.push(secure_url);

        console.log("Cloudinary response links:", uploadImages);
      }

      // 4️⃣ Poster ton produit ensuite
      const productRes = await api.post("/products/create", {
        ...data,
        tags: data.tags.map((tag) => tag.value),
        brands: data.brands.value,
        mainImage: uploadImages[0],
        picture: uploadImages,
      });
      if (productRes.data.data) {
        toast.success("data submitted successful ", { id: toastId });
      }
      reset();

      console.log("Product created:", productRes.data);
    } catch (err) {
      console.error("❌ Erreur lors de l'upload :", err);

      if (err.response) {
        toast.error(
          err.response.data ||
            err.response.data?.message ||
            "error occured when sending data"
        );
      }
    }
  };

  const productColors = [
    {
      value: "red",
      color: "bg-red-500",
      label: "Red",
    },
    {
      value: "blue",
      color: "bg-blue-500",
      label: "Blue",
    },
    {
      value: "green",
      color: "bg-green-500",
      label: "Green",
    },
    {
      value: "black",
      color: "bg-black",
      label: "Black",
    },
    {
      value: "white",
      color: "bg-white border border-gray-300",
      label: "White",
    },
    {
      value: "gray",
      color: "bg-gray-500",
      label: "Gray",
    },
    {
      value: "yellow",
      color: "bg-yellow-500",
      label: "Yellow",
    },
    {
      value: "pink",
      color: "bg-pink-500",
      label: "Pink",
    },
    {
      value: "purple",
      color: "bg-purple-500",
      label: "Purple",
    },
    {
      value: "orange",
      color: "bg-orange-500",
      label: "Orange",
    },
    {
      value: "brown",
      color: "bg-brown-500",
      label: "Brown",
    },
    {
      value: "navy",
      color: "bg-blue-900",
      label: "Navy",
    },
  ];
  const productSize = ["M", "L", "X", "XL", "XX,", "XXL"];

  // react hook form watch to know the selected color
  const selectedColor = watch("color");
  const selectedSize = watch("size");

  const images = watch("images");

  return (
    <div
      className="fixed inset-0 top-24v sm:left-10 flex items-center justify-center bg-gradient-to-br from-black/60 via-black/50 to-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-upload-title"
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-300"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200/80 flex justify-between items-center bg-white/95 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              FASCO
            </h1>
            <h2
              id="product-upload-title"
              className="text-lg font-semibold text-gray-700"
            >
              New Product
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="close"
            className="group p-2.5 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 hover:rotate-90"
          >
            <X
              size={20}
              className="text-gray-600 group-hover:text-gray-900 transition-colors"
            />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 lg:p-10 overflow-y-auto max-h-[calc(92vh-100px)]">
            {/* Image Upload Section */}
            {!images.some((img) => img.preview) ? (
              <p className="text-center text-gray-500 py-8 text-base">
                No image added yet, Upload
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center mb-8">
                {imageFields
                  .filter((img) => img.preview)
                  .map((src, i) => (
                    <div
                      key={i}
                      className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
                    >
                      <img
                        src={src.preview}
                        alt={`Product preview ${i}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <button
                        type="button"
                        onClick={() => removeImages(i)}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full p-2 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-md text-white text-xs font-medium px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Edit Cover
                      </div>

                      {isSubmitting && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl">
                          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {/* Input Upload */}
            <div
              hidden={images.length < 3}
              className="flex items-center justify-center my-5"
            >
              <label className="group relative aspect-[3/4] w-32 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-xl bg-gradient-to-br from-gray-50/50 to-white cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-100 flex flex-col items-center justify-center gap-3">
                <div className="p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
                  <Upload
                    className="text-gray-400 group-hover:text-gray-600 transition-colors"
                    size={28}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                  Upload Image
                </span>
                <input
                  type="file"
                  name="picture"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    files.forEach((file) => {
                      addImage({ file, preview: URL.createObjectURL(file) });
                    });
                    e.target.value = null;
                  }}
                  className="hidden"
                  accept="image/*"
                />

                {errors.images?.message && (
                  <p className="font-medium text-xs text-center text-red-500 mt-1">
                    {errors.images.message}
                  </p>
                )}
              </label>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 mt-8">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-gray-900">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="clotheName"
                    {...register("clotheName")}
                    placeholder="Enter product name"
                    className="w-full px-1 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-base text-gray-900 placeholder-gray-400 transition-all duration-300 outline-none"
                  />
                  {errors.clotheName && (
                    <p className="font-medium text-xs text-red-500 mt-2">
                      {errors.clotheName.message}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-gray-900">
                    Product Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    {...register("title")}
                    placeholder="Enter product title"
                    className="w-full px-1 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-base text-gray-900 placeholder-gray-400 transition-all duration-300 outline-none"
                  />
                  {errors.title && (
                    <p className="font-medium text-xs text-red-500 mt-2">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-gray-900">
                    Product Description
                  </label>
                  <input
                    type="text"
                    {...register("description")}
                    name="description"
                    placeholder="Write product description and add hashtags"
                    className="w-full px-1 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-base text-gray-900 placeholder-gray-400 transition-all duration-300 outline-none"
                  />
                  {errors.description && (
                    <p className="font-medium text-xs text-red-500 mt-2">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Color
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {productColors.map((color) => (
                      <button
                        type="button"
                        onClick={() => setValue("color", color.value)}
                        key={color.value}
                        className="group flex flex-col items-center gap-2.5 cursor-pointer"
                      >
                        <div
                          className={`h-10 w-10 rounded-full ${
                            color.color
                          } shadow-md transition-all duration-300 ${
                            selectedColor === color.value
                              ? "ring-2 ring-black ring-offset-2 scale-110"
                              : "ring-2 ring-transparent group-hover:ring-gray-300 group-hover:ring-offset-2 group-hover:scale-110 group-hover:shadow-xl"
                          }`}
                        />
                        <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                          {color.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  {errors.color && (
                    <p className="font-medium text-xs text-red-500 mt-2">
                      {errors.color.message}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      {...register("category")}
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:ring-0 text-base text-gray-900 appearance-none cursor-pointer transition-all duration-300 hover:border-gray-300 font-medium"
                    >
                      <option value="">SEARCH CATEGORY</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="menAccessories">Men Accessories</option>
                      <option value="womenAccessories">
                        Women Accessories
                      </option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.category && (
                    <p className="font-medium text-xs text-red-500 mt-2">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-gray-900">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    {...register("quantity")}
                    placeholder="Enter available product quantity"
                    className="w-full px-1 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-base text-gray-900 placeholder-gray-400 transition-all duration-300 outline-none"
                  />
                  {errors.quantity && (
                    <p className="font-medium text-xs text-red-500 mt-2">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-gray-900">
                    Sales Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-base">
                      $
                    </span>
                    <input
                      type="text"
                      name="price"
                      {...register("price")}
                      placeholder="0.00"
                      className="w-full pl-6 pr-1 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-base text-gray-900 placeholder-gray-400 transition-all duration-300 outline-none"
                    />
                  </div>
                  {errors.price && (
                    <p className="font-medium text-xs text-red-500 mt-2">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-gray-900">
                    Discount on product
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="discountPrice"
                      {...register("discountPrice")}
                      placeholder="PLEASE ADD PERCENTAGE (%) OFF"
                      className="w-full pr-8 pl-1 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-base text-gray-900 placeholder-gray-400 transition-all duration-300 outline-none"
                    />
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-base">
                      %
                    </span>
                  </div>
                  {errors.discountPrice && (
                    <p className="font-medium text-xs text-red-500 mt-2">
                      {errors.discountPrice.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {productSize.map((size, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setValue("size", size)}
                      >
                        <span
                          className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 shadow-sm ${
                            selectedSize === size
                              ? "bg-gray-900 text-white ring-2 ring-gray-900 ring-offset-2 scale-105"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-900 hover:text-white hover:shadow-lg hover:scale-105 active:scale-95"
                          }`}
                        >
                          {size}
                        </span>
                      </button>
                    ))}
                  </div>
                  {errors.size && (
                    <p className="font-medium text-xs text-red-500 mt-2">
                      {errors.size.message}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-gray-900">
                    Rate
                  </label>
                  <input
                    type="text"
                    {...register("rate")}
                    name="rate"
                    placeholder="enter rate, e.g 2"
                    className="w-full px-1 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:border-gray-900 focus:ring-0 text-base text-gray-900 placeholder-gray-400 transition-all duration-300 outline-none"
                  />
                  {errors.rate && (
                    <p className="font-medium text-xs text-red-500 mt-2">
                      {errors.rate.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tags
                  </label>
                  <Controller
                    control={control}
                    name="tags"
                    render={({ field }) => (
                      <>
                        <CreatableSelect
                          {...field}
                          isMulti
                          placeholder="Enter tags..."
                          value={field.value}
                          onChange={(selected) => field.onChange(selected)}
                          formatCreateLabel={(inputValue) =>
                            `Add "${inputValue}"`
                          }
                          getOptionValue={(option) => option.value}
                          getOptionLabel={(option) => option.label}
                        />
                        {errors.tags && (
                          <p className="text-xs font-medium text-red-500 mt-2">
                            {errors.tags.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Product Brand
                  </label>
                  <Controller
                    control={control}
                    name="brands"
                    render={({ field }) => (
                      <CreatableSelect
                        {...field}
                        isClearable
                        placeholder="Enter brand name..."
                        value={field.value}
                        onChange={(selected) => field.onChange(selected)}
                      />
                    )}
                  />
                  {errors.brands?.value && (
                    <p className="text-xs font-medium text-red-500 mt-2">
                      {errors.brands.value.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12 pt-8 border-t-2 border-gray-100">
              <button
                type="button"
                disabled={data.length === 0 && files.length === 0}
                onClick={handleSaveDraft}
                className={`group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md ${
                  data.length === 0 && files.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg active:scale-95"
                }`}
              >
                <LocalPrintshopIcon className="transition-transform group-hover:scale-110" />
                Save Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-3.5 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white hover:shadow-2xl hover:scale-105 active:scale-95 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800"
                }`}
              >
                <CloudUploadIcon
                  className={`transition-transform ${
                    isSubmitting
                      ? "animate-spin"
                      : "group-hover:scale-110 group-hover:-translate-y-0.5"
                  }`}
                />
                {isSubmitting ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
