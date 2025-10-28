import React, { useState } from "react";

import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
} from "lucide-react";

export const AdminDashboard = () => {
  // Données simulées
  const [products] = useState([
    {
      _id: "1",
      name: "Produit 1",
      price: 100,
      category: "cat1",
    },
    {
      _id: "2",
      name: "Produit 2",
      price: 200,
      category: "cat2",
    },
  ]);

  const [orders] = useState([
    {
      _id: "1",
      total: 150,
      status: "completed",
    },
    {
      _id: "2",
      total: 250,
      status: "pending",
    },
  ]);

  const [customers] = useState([
    {
      _id: "1",
      name: "Client 1",
      status: "active",
    },
    {
      _id: "2",
      name: "Client 2",
      status: "inactive",
    },
  ]);

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    newCustomers: customers.filter((c) => c.status === "active").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Produits Total</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {stats.totalProducts}
              </h3>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" /> +12% ce mois
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Commandes</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {stats.totalOrders}
              </h3>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" /> +8% ce mois
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenu Total</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                €{stats.totalRevenue.toFixed(2)}
              </h3>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" /> +23% ce mois
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Clients Actifs</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {stats.newCustomers}
              </h3>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" /> +5% ce mois
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
