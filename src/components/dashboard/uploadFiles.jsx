import React, { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";

export const ProductUploadForm = ({ onClose }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    salesPrice: "",
    productDescription: "",
    regularPrice: "",
    color: "",
    discount: "",
    quantity: "",
    discountTimeline: "",
    productCategory: "",
    productBrand: "",
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveDraft = () => {
    console.log("Draft saved:", formData);
  };

  const handleUpload = () => {
    console.log("Product uploaded:", formData);
  };

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
            aria-label="Fermer"
            className="p-2 rounded hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-8">
          {/* Image Upload Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-32 h-44 object-cover rounded-lg"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-700"
                  >
                    <X size={14} />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    Edit Cover
                  </div>
                </div>
              ) : (
                <label className="w-32 h-44 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                  <Upload className="text-gray-400 mb-2" size={32} />
                  <span className="text-xs text-gray-500">Upload Image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-8">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Description
                </label>
                <input
                  type="text"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  placeholder="Write product description and add hashtags"
                  className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm text-gray-400 appearance-none bg-transparent"
                >
                  <option value="">SEARCH COLOR BY PRODUCT NAME</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter available product quantity"
                  className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Category
                </label>
                <input
                  type="text"
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleInputChange}
                  placeholder="Choose product category"
                  className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                />
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
                  name="salesPrice"
                  value={formData.salesPrice}
                  onChange={handleInputChange}
                  placeholder="View listed Price"
                  className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Regular Price
                </label>
                <input
                  type="text"
                  name="regularPrice"
                  value={formData.regularPrice}
                  onChange={handleInputChange}
                  placeholder="Fill Price"
                  className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Discount
                </label>
                <input
                  type="text"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="PEASE ADD PERCENTAGE(%) OFF"
                  className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Discount Timeline
                </label>
                <input
                  type="text"
                  name="discountTimeline"
                  value={formData.discountTimeline}
                  onChange={handleInputChange}
                  placeholder="For flewshed In reverse"
                  className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Brand
                </label>
                <input
                  type="text"
                  name="productBrand"
                  value={formData.productBrand}
                  onChange={handleInputChange}
                  placeholder="Enter brand name"
                  className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-500 focus:ring-0 text-sm placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={handleSaveDraft}
              className="px-8 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
            >
              Save Draft
            </button>
            <button
              onClick={handleUpload}
              className="px-8 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
