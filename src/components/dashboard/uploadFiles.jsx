import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { Upload, X } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

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
  brands: yup.string().required("Brand is required"),
  category: yup.string().required("category is required"),
  tags: yup.array().of(yup.string()),
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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(productsSchema),
  });

  const [imagePreview, setImagePreview] = useState([]);
  const [files, setFiles] = useState([]);
  // const [selectedColor, setSelectedColor] = useState(null);

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

  const handleImageUpload = (e) => {
    const handleFiles = Array.from(e.target.files);
    if (!handleFiles.length) return;

    const limitImages = 3 - files.length;

    const totatImage = handleFiles.slice(0, limitImages);

    if (totatImage.length < handleFiles.length) {
      toast.error("images cannot be more than 3 ");
      return;
    }
    setFiles((prev) => [...prev, totatImage]);
    const urls = totatImage.map((img) => URL.createObjectURL(img));
    setImagePreview((prev) => [...prev, urls]);
  };

  useEffect(() => {
    return () => imagePreview.forEach((url) => URL.revokeObjectURL(url));
  }, [imagePreview]);
  // handlesubmit...
  const onSubmit = async (data) => {
    try {
    } catch (err) {
      console.error("error occured when sending data", err);
    }
  };

  const removeImage = (index) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveDraft = () => {
    const values = getValues();
    localStorage.setItem(
      "productDraft",
      JSON.stringify({
        data: values,
        counts: files.length,
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

  const handleUpload = () => {};

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

  // react hook form watch to know the selected color
  const selectedColor = watch("color");

  return (
    <div
      className="fixed inset-0 top-24 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        // close when clicking on overlay (but not when clicking inside modal)
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-upload-title"
        className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-semibold">FASCO</h1>
            <h2 id="product-upload-title" className="text-lg">
              New Product
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="close"
            className="p-2 rounded hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8">
            {/* Image Upload Section */}
            <div className="justify-center mb-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {imagePreview.length > 0 &&
                imagePreview.map((src, i) => (
                  <div key={i} className="relative">
                    <img
                      src={src}
                      alt={`Product preview ${i}`}
                      className="w-32 h-44 object-cover rounded-lg "
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 right-14 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-700"
                    >
                      <X size={14} />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      Edit Cover
                    </div>
                  </div>
                ))}
            </div>

            {/* Input Upload */}
            <div className="flex items-center justify-center my-5">
              <label className="w-32 h-44 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                <Upload className="text-gray-400 mb-2" size={32} />
                <span className="text-xs text-gray-500">Upload Image</span>
                <input
                  type="file"
                  name="picture"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
                {files.length === 0 && (
                  <p className="font-medium text-sm text-red-500"></p>
                )}
              </label>
            </div>
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              {/* Left Column */}
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="clotheName"
                    {...register("clotheName")}
                    placeholder="Enter product name"
                    className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                  />
                  {errors.clotheName && (
                    <p className=" font-medium text-sm text-red-500">
                      {errors.clotheName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Product Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    {...register("title")}
                    placeholder="Enter product title"
                    className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                  />
                  {errors.title && (
                    <p className=" font-medium text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Product Description
                  </label>
                  <input
                    type="text"
                    {...register("description")}
                    name="description"
                    placeholder="Write product description and add hashtags"
                    className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                  />
                  {errors.description && (
                    <p className=" font-medium text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {productColors.map((color) => (
                      <button
                        type="button"
                        onClick={() => setValue("color", color.value)}
                        key={color.value}
                        className="flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <div
                          className={`h-6 w-6 rounded-full ${
                            color.color
                          } transform transition-transform   ${
                            selectedColor === color.value
                              ? "ring-4 ring-blue-500 scale-110"
                              : "hover:scale-105"
                          }`}
                        />
                        <span className="text-xs">{color.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.color && (
                    <p className=" font-medium text-sm text-red-500">
                      {errors.color.message}
                    </p>
                  )}
                </div>

                <div>
                  <select
                    name="category"
                    {...register("category")}
                    className="w-full px-3 py-2 border-0 border-b focus:border-gray-500 focus:ring-0 text-sm text-gray-900  hover:text-black duration-300 transition-all appearance-none bg-transparent"
                  >
                    <option value="">SEARCH CATEGORY </option>
                    <option value="men">men</option>
                    <option value="women">women</option>
                    <option value="menAccessories">men Accessories</option>
                    <option value="womenAccessories">women Accessories</option>
                  </select>
                  {errors.category && (
                    <p className=" font-medium text-sm text-red-500">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    {...register("quantity")}
                    placeholder="Enter available product quantity"
                    className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                  />
                  {errors.quantity && (
                    <p className=" font-medium text-sm text-red-500">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Sales Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    {...register("price")}
                    placeholder="fill price"
                    className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                  />
                  {errors.price && (
                    <p className=" font-medium text-sm text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Discount on product
                  </label>
                  <input
                    type="text"
                    name="discountPrice"
                    {...register("discountPrice")}
                    placeholder="PEASE ADD PERCENTAGE(%) OFF"
                    className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                  />
                  {errors.discountPrice && (
                    <p className=" font-medium text-sm text-red-500">
                      {errors.discountPrice.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <input
                    type="text"
                    name="size"
                    {...register("size")}
                    placeholder="size"
                    className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                  />
                  {errors.size && (
                    <p className=" font-medium text-sm text-red-500">
                      {errors.size.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Rate</label>
                  <input
                    type="text"
                    {...register("rate")}
                    name="rate"
                    placeholder="enter rate , e.g 2"
                    className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                  />
                  {errors.rate && (
                    <p className=" font-medium text-sm text-red-500">
                      {errors.rate.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    {...register("tags")}
                    placeholder="enter any tags of product"
                    className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                  />
                  {errors.tags && (
                    <p className=" font-medium text-sm text-red-500">
                      {errors.tags.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Product Brand
                  </label>
                  <input
                    type="text"
                    {...register("brands")}
                    name="brands"
                    placeholder="Enter brand name"
                    className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                  />
                  {errors.brands && (
                    <p className=" font-medium text-sm text-red-500">
                      {errors.brands.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-12">
              <button
                onClick={handleSaveDraft}
                className=" flex items-center gap-2 px-8 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
              >
               <LocalPrintshopIcon/> Save Draft
              </button>
              <button
                onClick={handleUpload}
                className="flex items-center gap-2  px-8 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
             <CloudUploadIcon/>   Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
