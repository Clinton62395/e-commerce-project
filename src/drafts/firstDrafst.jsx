import React from "react";

export const firstDrafst = () => {
  return (
    <div>
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








      {/*  */}


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Commandes Récentes</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order._id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    €{order.total.toFixed(2)}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "processing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Produits Populaires</h3>
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={product.picture}
                    alt={product.clotheName}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {product.clotheName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Stock: {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    €{product.price}
                  </p>
                  <div className="flex items-center text-yellow-500 text-sm">
                    ⭐ {product.rate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>


  );
};
