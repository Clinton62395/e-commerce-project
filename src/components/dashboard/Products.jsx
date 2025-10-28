import React, { useState } from "react";
import { Edit, Eye, Filter, Plus, Save, Trash2, Upload, X } from "lucide-react";

export const DashboardProducts = () => {
  const [products, setProducts] = useState([
    {
      _id: "1",
      clotheName: "T-shirt Casual",
      title: "T-shirt en coton bio",
      description: "T-shirt confortable en coton biologique",
      category: "men",
      price: 29.99,
      quantity: 150,
      rate: "4.5",
      picture:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
      newArrival: true,
      promot: false,
      size: ["S", "M", "L"],
      color: ["Blanc", "Noir"],
      brands: ["Nike"],
      tags: ["casual", "cotton"],
    },
    {
      _id: "2",
      clotheName: "Robe Élégante",
      title: "Robe soirée été",
      description: "Robe élégante pour occasions spéciales",
      category: "women",
      price: 89.99,
      quantity: 75,
      rate: "4.8",
      picture:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
      newArrival: false,
      promot: true,
      size: ["XS", "S", "M"],
      color: ["Rouge", "Noir"],
      brands: ["Zara"],
      tags: ["elegant", "soiree"],
    },
    {
      _id: "3",
      clotheName: "Jean Slim",
      title: "Jean délavé moderne",
      description: "Jean slim fit confortable",
      category: "men",
      price: 59.99,
      quantity: 200,
      rate: "4.3",
      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      newArrival: true,
      promot: false,
      size: ["28", "30", "32", "34"],
      color: ["Bleu"],
      brands: ["Levi's"],
      tags: ["denim", "casual"],
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Filter size={18} className="mr-2" />
            Filtrer
          </button>
          <select className="px-4 py-2 border rounded-lg">
            <option>Toutes catégories</option>
            <option>Hommes</option>
            <option>Femmes</option>
            <option>Enfants</option>
          </select>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowProductModal(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} className="mr-2" />
          Nouveau Produit
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
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
                Note
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={product.picture}
                      alt={product.clotheName}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-gray-800">
                        {product.clotheName}
                      </p>
                      <p className="text-sm text-gray-500">{product.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium">€{product.price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`${
                      product.quantity < 50 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {product.quantity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    {product.rate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
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
                          setProducts(
                            products.filter((p) => p._id !== product._id)
                          );
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
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-600">
                    Cliquez pour uploader ou glissez-déposez
                  </p>
                  <input type="file" className="hidden" />
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
