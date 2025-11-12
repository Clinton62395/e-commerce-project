import React, { useState, useEffect } from "react";
import {
  Edit,
  Eye,
  Filter,
  Plus,
  Save,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { ProductUploadForm } from "./uploadFiles";
import { useActionData, useOutletContext } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/constant";
import { deleteProduct, getProduct } from "../../api/Product.API";
import toast from "react-hot-toast";

export const DashboardProducts = () => {
  const [showProductModal, setShowProductModal] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const { toggleSwicht, sidebarOpen } = useOutletContext();

  const handleUploadModal = () => {
    if (sidebarOpen) {
      toggleSwicht();
      setShowUploadModal(true);
    }
  };
  const handleUploadModalClose = () => {
    setShowUploadModal(false);

    if (!sidebarOpen) {
      toggleSwicht();
    }
  };

  // get all products
  const queryClient = useQueryClient();
  const {
    isPending,
    error,
    data: products = [],
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
    staleTime: 1000 * 60 * 5,
  });

  // get single product and delete

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    staleTime: 1000 * 60 * 5,
    onSuccess: () => {
      toast.success("product deleted successful");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("error when deleting product");
    },
  });

  console.log("products backend=== >", products);

  if (isPending) {
    return (
      <div className=" relative animate-spin flex h-24 w-24 rounded-full border border-t border-white ">
        <div className=" w-full bg-slate-800 opacity-10 absolute inset-0"></div>
      </div>
    );
  }
  if (error) {
    return <div>error occurd when fetching products : {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center md:justify-between items-center  min-w-0 flex-wrap gap-3 max-w-7xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-2 border bg-[#0000000D] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-md"
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <button
          onClick={handleUploadModal}
          className="flex items-center px-4 py-2 duration-300 transition-all bg-black/80 text-white rounded-lg hover:bg-black"
        >
          <Plus size={18} className="mr-2" />
          Add Products
        </button>

        {showUploadModal && (
          <ProductUploadForm onClose={handleUploadModalClose} />
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto scrollbar-hide">
        <table className="w-full max-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Produit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y text-xs md:text-lg">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-2 py-3 md:px-6 md:py-4">
                  <div className="flex items-center space-x-2 md:space-x-4 overflow-x-auto">
                    {product.mainImage && (
                      <div className="flex-shrink-0">
                        <img
                          src={product.mainImage}
                          alt={product._id}
                          className="w-10 h-10 md:w-16 md:h-16 object-cover rounded-full border border-black"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {product.clotheName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {product.title}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3 md:px-6 md:py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {product.category}
                  </span>
                </td>
                <td className="px-2 py-3 md:px-6 md:py-4 font-medium">
                  €{product.price}
                </td>
                <td className="px-2 py-3 md:px-6 md:py-4 font-medium">
                  <span
                    className={`${
                      product.quantity < 50 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {product.quantity}
                  </span>
                </td>
                <td className="px-2 py-3 md:px-6 md:py-4">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    <span>
                      {(() => {
                        const releaseDate = product.releaseDate
                          ? new Date(product.releaseDate)
                          : null;
                        const today = new Date();

                        if (
                          product.quantity > 0 &&
                          releaseDate &&
                          releaseDate <= today
                        ) {
                          return (
                            <span className="font-medium text-[#166A42]">
                              In stock
                            </span>
                          );
                        } else if (releaseDate && releaseDate > today) {
                          return (
                            <span className="font-medium text-[#5479CB]">
                              Coming soon
                            </span>
                          );
                        } else {
                          return (
                            <span className="font-medium text-[#FF2929]">
                              Coming soon
                            </span>
                          );
                        }
                      })()}
                    </span>
                  </div>
                </td>
                <td className="px-2 py-3 md:px-6 md:py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingProduct(product._id);
                        setShowProductModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          confirm("Voulez-vous vraiment supprimer ce produit ?")
                        ) {
                          deleteMutation.mutate(product._id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Produit */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                {editingProduct ? "Modifier le produit" : "Nouveau produit"}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nom du produit
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    defaultValue={editingProduct?.clotheName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Titre
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    defaultValue={editingProduct?.title}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                  defaultValue={editingProduct?.description}
                ></textarea>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Prix (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border rounded-lg"
                    defaultValue={editingProduct?.price}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantité
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    defaultValue={editingProduct?.quantity}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Catégorie
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option>men</option>
                    <option>women</option>
                    <option>kids</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Image du produit
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
                      <Upload
                        className="mx-auto text-gray-400 mb-2"
                        size={32}
                      />
                      <p className="text-sm text-gray-600">
                        Cliquez pour uploader ou glissez-déposez
                      </p>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedImage(file);
                        setPreviewUrl(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    alert("Produit enregistré !");
                    setShowProductModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Save size={18} className="inline mr-2" />
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
