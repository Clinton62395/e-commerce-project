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

import { data, useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onSubmit } from "../../api/Product.API";

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
        label: yup.string().required(),
        value: yup.string().required(),
      })
    )
    .min(1, "At least one tag is required"),

  images: yup
    .array()
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed")
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

  color: yup
    .array()
    .of(yup.string())
    .required("At leat one 1 Color is required"),
  size: yup.array().of(yup.string()).required("Size is required"),
  quantity: yup
    .number()
    .integer()
    .min(0, "Quantity must be positive")
    .required("Quantity is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

export const ProductUploadForm = ({ onclose }) => {
  const { toggleSwicht, sidebarOpen } = useOutletContext();
  const [toastAc, setToastAc] = useState(false);
  const queryClient = useQueryClient();

  const handleSideOpen = () => {
    if (sidebarOpen) {
      toggleSwicht();
      onclose();
    }
  };

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
    defaultValues: { tags: [{ value: [""] }], images: [], size: [], color: [] },
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
  console.log("les contenus de imageField", imageFields);

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
        at: new Date().toISOString(),
      })
    );
  };
  // get draft from localstorag
  useEffect(() => {
    try {
      setToastAc(true);
      const draft = localStorage.getItem("productDraft");
      if (draft) {
        const parsed = JSON.parse(draft);
        const { images, ...others } = parsed.data;

        Object.keys(others).forEach((key) => {
          setValue(key, others[key]);
        });
        setToastAc(false);
        setTimeout(() => {
          toast.success("last session data got successful");
          setToastAc(false);
        }, 1000);
      }
    } catch (err) {
      console.error("error when geting draft from local storage", err);
      toast.error("error occured when getting last session data");
    }
  }, []);

  // function form multiple selection

  const selectedSize = watch("size") || [];
  const selectedColor = watch("color") || [];

  const handleSelectSize = (size) => {
    const current = getValues("size");
    const updatedSize = current.includes(size)
      ? current.filter((s) => s !== size)
      : [...current, size];
    setValue("size", updatedSize, { shouldValidate: true });
  };
  const handleSelectColor = (color) => {
    const current = getValues("color");
    const updatedColor = current.includes(color)
      ? current.filter((c) => c !== color)
      : [...current, color];
    setValue("color", updatedColor, { shouldValidate: true });
  };

  const useonSubmit = useMutation({
    mutationKey: "products",
    mutationFn: onSubmit,

    staleTime: 1000 * 60 * 5,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      reset();
      onclose?.();
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
        // Rediriger vers login ou rafraîchir le token
      } else {
        toast.error("Erreur lors de l’envoi du produit");
      }
    },
    onSettled: () => {
      console.log("mutation done");
    },
  });
  const handleSubmittedData = (formData) => {
    console.log("Form data to submit:", formData);
    useonSubmit.mutate(formData);
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

  const images = watch("images");

  return (
    <div className="fixed inset-0 top-24 min-w-0  flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-all duration-300 w-full">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-upload-title"
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-300 scale-100"
      >
        {/* Header amélioré */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              FASCO
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
              <h2
                id="product-upload-title"
                className="text-lg font-semibold text-gray-800"
              >
                New Product
              </h2>
            </div>
          </div>
          <button
            onClick={onclose}
            aria-label="close"
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
          >
            <X size={20} className="text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleSubmittedData)}>
          <div className="p-8">
            {/* Section Images améliorée */}
            <div className="mb-8">
              {!images.some((img) => img.preview) ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors duration-300">
                  <p className="text-gray-500 text-lg mb-4">
                    No image added yet
                  </p>
                  <span className="text-blue-600 font-medium cursor-pointer hover:text-blue-700 transition-colors">
                    Upload Images
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-5 min-w-0 justify-center items-center flex-wrap gap-4  md:gap-2 mb-4">
                  {imageFields
                    .filter((img) => img.preview)
                    .map((src, i) => (
                      <div key={i} className="relative group">
                        <div className="relative overflow-hidden rounded-xl bg-gray-100">
                          <img
                            src={src.preview}
                            alt={`Product preview ${i}`}
                            className="w-full h-32 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                          <button
                            type="button"
                            onClick={() => removeImages(i)}
                            className="absolute top-2 right-2 bg-white/90 text-gray-700 rounded-full p-1.5 hover:bg-white hover:text-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg"
                          >
                            <X size={14} />
                          </button>

                          <div className="absolute bottom-2 left-2">
                            <button className="bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-black transition-colors duration-200 backdrop-blur-sm">
                              Edit Cover
                            </button>
                          </div>

                          {useonSubmit.isPending && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl backdrop-blur-sm">
                              <div className="w-8 h-8 border-3 border-white border-t rounded-full animate-spin"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Input Upload amélioré */}

              {images.length < 5 && (
                <div className="flex items-center justify-center my-6">
                  <label className="w-32 h-28 md:w-32 md:h-44 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 group">
                    <Upload
                      className="text-gray-400 group-hover:text-blue-400 mb-2 transition-colors"
                      size={32}
                    />
                    <span className="flex gap-3 items-center text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
                      Upload Image {5 - images.length}
                    </span>
                    <input
                      hidden={isSubmitting}
                      type="file"
                      name="picture"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        files.forEach((file) => {
                          addImage({
                            file,
                            preview: URL.createObjectURL(file),
                          });
                        });
                        e.target.value = null;
                      }}
                      className="hidden"
                      accept="image/*"
                    />
                    {errors.images?.message && (
                      <p className="text-center font-medium text-sm text-red-500 bg-red-50 py-2 px-4 rounded-lg">
                        {errors.images.message}
                      </p>
                    )}
                  </label>
                </div>
              )}
            </div>

            {/* Form Fields améliorés */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="clotheName"
                    {...register("clotheName")}
                    placeholder="Enter product name"
                    className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 transition-all duration-300 bg-transparent"
                  />
                  {errors.clotheName && (
                    <p className="font-medium text-sm text-red-500 mt-2 bg-red-50 py-1 px-3 rounded-lg">
                      {errors.clotheName.message}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Product Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    {...register("title")}
                    placeholder="Enter product title"
                    className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 transition-all duration-300"
                  />
                  {errors.title && (
                    <p className="font-medium text-sm text-red-500 mt-2 bg-red-50 py-1 px-3 rounded-lg">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Product Description
                  </label>
                  <input
                    type="text"
                    {...register("description")}
                    name="description"
                    placeholder="Write product description and add hashtags"
                    className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 transition-all duration-300"
                  />
                  {errors.description && (
                    <p className="font-medium text-sm text-red-500 mt-2 bg-red-50 py-1 px-3 rounded-lg">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Product Color
                  </label>
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                    {productColors.map((color) => (
                      <button
                        key={color.label}
                        type="button"
                        onClick={() => handleSelectColor(color.value)}
                        className={`flex flex-col items-center gap-2 cursor-pointer group/color    `}
                      >
                        <div
                          style={{ backgroundColor: color.value }}
                          className={`h-8 w-8  rounded-full transform transition-all duration-200 shadow-sm ring-1 ${
                            selectedColor.includes(color.value)
                              ? "ring-2 ring-offset-2 border border-gradient-to-r from-blue-600 to-purple-600 scale-110 shadow-lg"
                              : "hover:scale-105 hover:shadow-md group-hover:color:scale-105"
                          }`}
                        />
                        <span className="text-xs font-medium text-gray-600">
                          {color.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  {errors.color && (
                    <p className="font-medium text-sm text-red-500 mt-3 bg-red-50 py-1 px-3 rounded-lg">
                      {errors.color.message}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Category
                  </label>
                  <select
                    name="category"
                    {...register("category")}
                    className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-sm text-gray-600 hover:text-gray-900 transition-all duration-300 appearance-none bg-transparent"
                  >
                    <option value="">SEARCH CATEGORY</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="menAccessories">Men Accessories</option>
                    <option value="womenAccessories">Women Accessories</option>
                  </select>
                  {errors.category && (
                    <p className="font-medium text-sm text-red-500 mt-2 bg-red-50 py-1 px-3 rounded-lg">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Sales Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    {...register("price")}
                    placeholder="Fill price"
                    className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 transition-all duration-300"
                  />
                  {errors.price && (
                    <p className="font-medium text-sm text-red-500 mt-2 bg-red-50 py-1 px-3 rounded-lg">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Discount on product
                  </label>
                  <input
                    type="text"
                    name="discountPrice"
                    {...register("discountPrice")}
                    placeholder="PLEASE ADD PERCENTAGE (%) OFF"
                    className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 transition-all duration-300"
                  />
                  {errors.discountPrice && (
                    <p className="font-medium text-sm text-red-500 mt-2 bg-red-50 py-1 px-3 rounded-lg">
                      {errors.discountPrice.message}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Size
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {productSize.map((size, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectSize(size)}
                        type="button"
                        className="transform transition-all duration-200 hover:scale-105"
                      >
                        <span
                          className={`min-w-12 px-4 py-2.5 rounded-lg font-medium text-sm ${
                            selectedSize.includes(size)
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm"
                          } transition-all duration-200`}
                        >
                          {size}
                        </span>
                      </button>
                    ))}
                  </div>
                  {errors.size && (
                    <p className="font-medium text-sm text-red-500 mt-2 bg-red-50 py-1 px-3 rounded-lg">
                      {errors.size.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center ">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Rate
                    </label>
                    <input
                      type="text"
                      {...register("rate")}
                      name="rate"
                      placeholder="Enter rate, e.g. 2"
                      className="w-full py-3 px-2 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 transition-all duration-300"
                    />
                    {errors.rate && (
                      <p className="font-medium text-sm text-red-500 mt-2 bg-red-50 py-1 px-3 rounded-lg">
                        {errors.rate.message}
                      </p>
                    )}
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      {...register("quantity")}
                      placeholder="Enter available product quantity"
                      className="w-full px-2 py-3 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 transition-all duration-300"
                    />
                    {errors.quantity && (
                      <p className="font-medium text-sm text-red-500 mt-2 bg-red-50 py-1 px-3 rounded-lg">
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="group">
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
                          className="react-select-container"
                          classNamePrefix="react-select"
                        />
                        {errors.tags && (
                          <p className="font-medium text-sm text-red-500 mt-2 bg-red-50 py-1 px-3 rounded-lg">
                            {errors.tags.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                <div className="group">
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
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    )}
                  />
                  {errors.brands?.value && (
                    <p className="font-medium text-sm text-red-500 mt-2 bg-red-50 py-1 px-3 rounded-lg">
                      {errors.brands.value.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons améliorés */}
            <div className="flex flex-wrap justify-center gap-6 mt-16 pt-8 border-t border-gray-100">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex items-center gap-3 px-2 md:px-10 py-3.5 rounded-xl font-semibold transition-all duration-300  bg-gray-300 cursor-not-allowed
                    bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:shadow-lg transform hover:scale-105 "
              >
                <LocalPrintshopIcon />
                Save Draft
              </button>
              <button
                type="submit"
                disabled={useonSubmit.isPending}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`flex items-center gap-3 px-2 md:px-10 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                  useonSubmit.isPending
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105"
                }`}
              >
                <CloudUploadIcon
                  className={useonSubmit.isPending ? "animate-spin" : ""}
                />
                {useonSubmit.isPending ? "Uploading..." : "Upload Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
