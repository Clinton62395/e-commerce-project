import React, { useState } from "react";
import { Bell, Upload } from "lucide-react";

export const Categories = () => {
  const [categoryImage, setCategoryImage] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
  );
  const [newCategory, setNewCategory] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const categories = [
    {
      name: "Women's Clothing",
      description: "Dresses, tops & more",
      quantity: "2,450+ items",
    },
    {
      name: "Men's Clothing",
      description: "Shirts, jackets, jeans & more",
      quantity: "1,890+ items",
    },
    {
      name: "Bags & Handbags",
      description: "Totes, clutches, backpacks & more",
      quantity: "970+ items",
    },
    {
      name: "Shoes",
      description: "Sneakers, heels, boots & sandals",
      quantity: "1,560+ items",
    },
    {
      name: "Sunglasses",
      description: "Designer & classic styles",
      quantity: "640+ items",
    },
    {
      name: "Activewear",
      description: "Gym, yoga & more port clothing",
      quantity: "1,520+ items",
    },
    {
      name: "Jewelry",
      description: "Necklaces, rings, bracelets & more",
      quantity: "2,730+ items",
    },
    {
      name: "Outerwear",
      description: "Coats, jackets, blazers & more",
      quantity: "1,680+ items",
    },
    {
      name: "New Arrivals",
      description: "Latest brands & fresh styles",
      quantity: "2,440+ items",
    },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = () => {
    console.log("New category added:", {
      name: newCategory,
      parent: parentCategory,
      description,
      quantity,
      image: categoryImage,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Panel - Category Form */}
      <div className="w-96 bg-white p-8 border-r border-gray-200">
        <h2 className="text-2xl font-semibold mb-8">Categories</h2>

        {/* Category Image Display */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <img
            src={categoryImage}
            alt="Category"
            className="w-32 h-44 object-cover rounded-lg mx-auto"
          />
          <div className="mt-4 text-center">
            <p className="text-sm font-semibold">Women's Clothing</p>
            <p className="text-xs text-gray-500">Dresses, tops & more</p>
            <p className="text-xs text-gray-400 mt-1">2,450+ items</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Add New Category
            </label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter name"
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400 text-sm placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Add Parent Category
            </label>
            <input
              type="text"
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              placeholder="Choose parent category"
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400 text-sm placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400 text-sm placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400 text-sm placeholder-gray-400"
            />
          </div>

          {/* Image Upload Section */}
          <div className="flex items-center gap-3 pt-2">
            <label className="cursor-pointer">
              <div className="w-14 h-14 border-2 border-gray-300 rounded flex items-center justify-center hover:border-gray-400 transition-colors bg-white">
                <Upload className="text-gray-400" size={24} />
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            <button className="px-6 py-2.5 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors font-medium">
              Upload/Add Image
            </button>
          </div>

          {/* Add Category Button */}
          <button
            onClick={handleAddCategory}
            className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors font-medium text-sm mt-6"
          >
            Add New Category
          </button>
        </div>
      </div>

      {/* Right Panel - Categories List */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-end items-center mb-8 gap-4">
          <Bell className="text-gray-600 cursor-pointer" size={20} />
          <div className="w-10 h-10 bg-orange-400 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-3 gap-4 mb-4 px-6">
          <div className="text-sm font-medium text-gray-600">Name</div>
          <div className="text-sm font-medium text-gray-600">Description</div>
          <div className="text-sm font-medium text-gray-600 text-right">
            Quantity
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="font-semibold text-sm">{category.name}</div>
              <div className="text-gray-600 text-sm">
                {category.description}
              </div>
              <div className="text-gray-500 text-sm text-right">
                {category.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
