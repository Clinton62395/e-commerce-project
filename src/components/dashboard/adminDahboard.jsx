import React, { useState, useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { socket } from "../../socket";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  ArrowLeftRight,
} from "lucide-react";
import { Chart } from "./chart";

export const AdminDashboard = () => {
  useEffect(() => {
    // Étape A: Gérer la connexion
    socket.on("connect", () => {
      console.log("🟢 Connecté au serveur Socket.IO (ID:", socket.id, ")");

      // 2. Rejoindre la Room d'Administration
      // C'est l'étape CRUCIALE qui correspond à votre socket.on("join-dashboard", ...) côté backend
      socket.emit("join-dashboard", {
        userName: "AdminUser",
        /* ... autres données d'identification si nécessaire ... */
      });

      // Écouter le message de confirmation du backend
      socket.on("dashboard-connected", (data) => {
        console.log("Backend confirmation:", data.message);
      });
    });

    // Étape B: Gérer la déconnexion
    socket.on("disconnect", () => {
      console.log("🔴 Déconnecté du serveur Socket.IO");
    });

    // Nettoyage lors du démontage du composant
    return () => {
      socket.disconnect();
    };
  }, []); // Exécuter une seule fois au montage

  // socket order reel time
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

  const [orders, setOrders] = useState([]);

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

  const topCountriesBySales = [
    {
      label: "United States",
      flags:
        "https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg",
      rate: "25k",
    },
    {
      label: "Germany",
      flags:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmMuZZnHhZce51YjZijUFyG3eu_mgpIW4Jbg&s",
      rate: "20k",
    },
    {
      label: "China",
      flags:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnGzRJtLcLkfxp8quNclrmPlI-rd5RTWk1dA&s",
      rate: "19k",
    },
    {
      label: "South Korea",
      flags:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRTOfWm2Rff9Sa_404Z4YGtgUvubnDCTcR-Q&s",
      rate: "15k",
    },
    {
      label: "India",
      flags:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqcKuRNDPZguvauwuR1f_RCHDiwmuNR5fIzA&s",
      rate: "13k",
    },
    {
      label: "France",
      flags:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5leDJ40Yi0rNza2mnEK_FH-3fmTWDFTkt_A&s",
      rate: "11k",
    },
    {
      label: "Singapour",
      flags:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxiNA_N1RHFascIX3JXhAQJ1Jj53g2p85sg&s",
      rate: "9k",
    },
    {
      label: "Quatar",
      flags:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4iYAqC79jOv0_0J5PZryVhI6jAD1juXdcA&s",
      rate: "7k",
    },
    {
      label: "Guinea",
      flags:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuUhoLBi7tR1qn7EqpRzc4Ku1Mn-I06ARmEQ&s",
      rate: "8k",
    },
  ];
  const topProducts = [
    {
      name: "Women's high waist jeans",
      date: "17 Sep, 2025",
      category: "Bottoms",
      stock: "In Stock",
      price: "$31",
      totalSales: "$13,450",
    },
    {
      name: "Men's crew neck T-shirt",
      date: "4 Oct, 2025",
      category: "T-shirts",
      stock: "In Stock",
      price: "$19",
      totalSales: "$47,280",
    },
    {
      name: "Women's winter jacket",
      date: "23 Jun, 2025",
      category: "Outerwear",
      stock: "In Stock",
      price: "$60",
      totalSales: "$88,340",
    },
    {
      name: "Women's blazer",
      date: "9 Aug, 2025",
      category: "Outerwear",
      stock: "Out Of Stock",
      price: "$37",
      totalSales: "$126,170",
    },
    {
      name: "Men's sweatshirt",
      date: "16 Sep, 2025",
      category: "Outerwear",
      stock: "In Stock",
      price: "$44",
      totalSales: "$20,300",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {/* Statistiques principales */}
        <div className="col-span-1  lg:col-span-5 min-w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Sales */}
            <div className="flex items-center justify-center bg-white border border-gray-300 rounded-xl  p-2 w-full max-w-xs shadow-sm">
              <div className="flex items-center gap-4">
                {/* Icône à gauche */}
                <div className=" p-2 rounded-full  bg-teal-600 text-yellow-50 mt-2 flex items-center w-10 h-10">
                  <ShoppingCart className="text-yellow-50" size={24} />
                </div>

                {/* Texte centré verticalement */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 font-medium">
                    Total Sales
                  </p>
                  <p className="text-xl font-semibold text-black">$879</p>
                  <p className="text-xs text-green-600 mt-2 flex items-center">
                    <TrendingUp size={14} className="mr-1" /> +8% this week
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center bg-white border border-gray-300 rounded-xl  p-2 w-full max-w-xs shadow-sm">
              <div className="flex items-center gap-4">
                <div className=" p-2 rounded-full  bg-purple-500 text-yellow-50 mt-2 flex items-center w-10 h-10">
                  <ArrowLeftRight className="text-yellow-50" size={24} />
                </div>

                {/* Texte centré verticalement */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 font-medium">
                    Average Order
                  </p>
                  <p className="text-xl font-semibold text-black">$879</p>
                  <p className="text-xs text-green-600 mt-2 flex items-center">
                    <TrendingUp size={14} className="mr-1" /> +3% this week
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center bg-white border border-gray-300 rounded-xl  p-2 w-full max-w-xs shadow-sm">
              <div className="flex items-center gap-4">
                {/* Icône à gauche */}
                <div className=" p-2 rounded-full  bg-purple-800 text-yellow-50 mt-2 flex items-center w-10 h-10">
                  <AddShoppingCartIcon />
                </div>

                {/* Texte centré verticalement */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 font-medium">
                    Total Orders
                  </p>
                  <p className="text-xl font-semibold text-black">$879</p>
                  <p className="text-xs text-green-600 mt-2 flex items-center">
                    <TrendingUp size={14} className="mr-1" /> +5% this week
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* chart */}
          <div className="border border-[#484848] my-2 shadow-md rounded-md">
            {/* <Bar options={options} data={data} /> */}
            <Chart />
          </div>
        </div>

        {/* Top Countries */}
        <div className="col-span-2  bg-white border border-[#484848]  p-6 rounded-xl shadow h-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Top Countries by Sales
          </h2>
          {/* Placeholder for country list or chart */}
          <ul className=" space-y-4 text-sm text-gray-600">
            {topCountriesBySales.map((country, i) => (
              <div key={i} className="flex items-center justify-between ">
                <div className=" my-2 gap-4 flex items-centerm text-sm font-meduim">
                  {country.flags && (
                    <img
                      src={country.flags}
                      alt={country.label}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                  )}
                  {country.label}
                </div>
                <div>
                  {country.rate && (
                    <span className="text-[#777777] text-sm ms-10">
                      {country.rate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 my-3">
        <div className=" col-span-2  lg:col-span-5 h-full">
          <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-[#484848] p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Top Selling Products
            </h2>
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">Product and name</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Stock</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Total Sales</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topProducts.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-800">{item.name}</td>
                    <td className="px-4 py-3 text-gray-600">{item.date}</td>
                    <td className="px-4 py-3 text-gray-600">{item.category}</td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        item.stock === "Out Of Stock"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {item.stock}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{item.price}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.totalSales}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 py-4  h-full  shadow-sm border border-[#484848] bg-white rounded-md  px-2">
          <h2 className="text-xl  font-medium text-black text-center">
            Recent Orders
          </h2>
          <ul className=" space-y-10 p-4">
            {[
              { title: "Women’s high waist jeans", price: "$31" },
              { title: "Men’s crew neck T-shirt", price: "$19" },
              { title: "Women’s winter jacket", price: "$35" },
              { title: "Women’s Denim Skirt", price: "$23" },
              { title: "Men’s sweatshirt", price: "$44" },
            ].map((item, i) => (
              <li
                key={i}
                className="flex gap-4 w-full items-center text-gray-700"
              >
                <span className="text-lg text-[#000000] font-medium">
                  {item.title}
                </span>
                <span className="text-sm font-semibold">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
    </div>
  );
};
