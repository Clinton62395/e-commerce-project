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
import { Link, useActionData, useOutletContext } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/constant";
import {
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../api/Product.API";
import toast from "react-hot-toast";
import { Modal } from "../modal/Logout";
import { UpdateProduct } from "./UpdateProduct";

export const DashboardProducts = () => {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // delete mutation
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

  // update mutation
  const updateMutation = useMutation({
    mutationFn: updateProduct,
    staleTime: 1000 * 60 * 5,
    onSuccess: () => {
      toast.success("product updated successful");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("error when updating product");
    },
  });

  const handleModalOpen = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const handleConfirm = () => {
    if (productToDelete && productToDelete._id) {
      deleteMutation.mutate(productToDelete._id);
    }
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  // update product function
  const handleModaUpdatelOpen = (product) => {
    setProductToUpdate(product);
    setShowProductModal(true);
  };

  const handleCancelUpdatedProduct = () => {
    setShowProductModal(false);
    setProductToUpdate(null);
  };

  const handleConfirmUpdateProduct = (data) => {
    if (!productToUpdate || !productToUpdate._id) {
      toast.error("Produit à mettre à jour non défini");
      return;
    }

    const file = data.mainImage?.[0];
    const fullData = {
      mainImage: file,
      ...data,
    };

    updateMutation.mutate({ _id: productToUpdate._id, data: fullData });
  };

  // if (error) {
  //   return <div>error occurred when fetching products : {error.message}</div>;
  // }

  if (isPending) {
    return (
      <div className="bg-black/90 flex items-center justify-center min-h-screen overflow-hidden">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center md:justify-between items-center min-w-0 flex-wrap gap-3 max-w-7xl mx-auto">
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
          <ProductUploadForm onclose={handleUploadModalClose} />
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto scrollbar-hide">
        <table className="w-full max-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
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
            {!products || products.length === 0 ? (
              <div>
                <div className=" flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-600">
                      Product not found
                    </h2>
                  </div>
                </div>
              </div>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-2 py-3 md:px-6 md:py-4">
                    <div className="flex items-center space-x-2 md:space-x-4 overflow-x-auto">
                      {product.mainImage && (
                        <div className="flex-shrink-0">
                          <Link to={`/product-details/${product._id}`}>
                            {" "}
                            <img
                              src={product.mainImage.url}
                              alt={product._id}
                              className="w-10 h-10 md:w-16 md:h-16 object-cover rounded-full border border-black"
                            />
                          </Link>
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
                    NGN{product.price}
                  </td>
                  <td className="px-2 py-3 md:px-6 md:py-4 font-medium">
                    <span
                      className={`${
                        product.quantity < 50
                          ? "text-red-600"
                          : "text-green-600"
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
                                Out of stock
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
                        onClick={() => handleModaUpdatelOpen(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleModalOpen(product)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de suppression - UN SEUL en dehors de la boucle */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onclose={handleCancel}
          onConfirme={handleConfirm}
          title="Delete this product ?"
          message={`Do you really want to delete this product "${productToDelete?.title}" ?`}
          confirmLabel="Delete"
          cancelLabel="Cancel"
        />
      )}

      {/* Modal de mise à jour */}
      {showProductModal && (
        <UpdateProduct
          editingProduct={productToUpdate}
          onclose={handleCancelUpdatedProduct}
          onConfirme={handleConfirmUpdateProduct}
          onCancel={handleCancelUpdatedProduct}
        />
      )}
    </div>
  );
};
