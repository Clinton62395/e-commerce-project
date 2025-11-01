import React, { useState } from "react";

import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const AdminDashboard = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Revenue This Week",
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    elements: {
      point: {
        radius: (ctx) => (ctx.dataIndex === 3 ? 6 : 3), // Highlight October
        backgroundColor: (ctx) => (ctx.dataIndex === 3 ? "#3b82f6" : "#1e40af"), // Blue for October
      },
    },
  };

  const data = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [85000, 92000, 110000, 126390, 118000, 130000],
        borderColor: "#1e40af",
        backgroundColor: "rgba(30, 64, 175, 0.1)",
        tension: 0.4,
        pointHoverRadius: 8,
      },
    ],
  };

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
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {/* Statistiques principales */}
        <div className="col-span-1 md:col-span-3 lg:col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Sales */}
            <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-medium text-gray-600">Total Sales</p>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="text-blue-600" size={24} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">$879</p>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" /> +12% this month
              </p>
            </div>

            {/* Average Order */}
            <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-medium text-gray-600">
                  Average Order
                </p>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="text-green-600" size={24} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                ${stats.totalOrders}
              </p>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" /> +8% this week
              </p>
            </div>

            {/* Total Revenue */}
            <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-medium text-gray-600">
                  Total Revenue
                </p>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="text-purple-600" size={24} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                €{stats.totalRevenue.toFixed(2)}
              </p>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" /> +5% growth
              </p>
            </div>
          </div>
          {/* chart */}
          <div>
            {/* <Bar options={options} data={data} /> */}
            <Line options={options} data={data} />
          </div>
        </div>

        {/* Top Countries */}
        <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Top Countries by Sales
          </h2>
          {/* Placeholder for country list or chart */}
          <ul className="space-y-2 text-sm text-gray-600">
            {[
              { america: { label: "United States", flags: null, rate: "25k" } },
              { germany: { label: "Germany", flags: null, rate: "25k" } },
              { china: { label: "China", flags: null, rate: "25k" } },
              {
                southCoreah: {
                  label: "South Korea",
                  flags: null,
                  rate: "25k",
                },
              },
              { india: { label: "India", flags: null, rate: "25k" } },
              { france: { label: "France", flags: null, rate: "25k" } },
              {
                singapour: { label: "Singapour", flags: null, rate: "25k" },
              },
              { quatar: { label: "Quatar", flags: null, rate: "25k" } },
              { guinea: { label: "Guinea", flags: null, rate: "25k" } },
            ]}
            <li>Nigeria — $2,300</li>
            <li>USA — $1,850</li>
            <li>UK — $1,200</li>
            <li>Germany — $950</li>
          </ul>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
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
