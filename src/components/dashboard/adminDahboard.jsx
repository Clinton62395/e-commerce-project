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
import { api } from "../../services/constant";
import { useQuery } from "@tanstack/react-query";

export const AdminDashboard = () => {
  const { data: payment = [], isPending } = useQuery({
    queryKey: ["allPayments"],
    queryFn: () => api.get("/payment/all").then((res) => res.data.data),
  });

  // total sall by country

  const totalByCountry = payment.reduce((acc, payment) => {
    const countryName = payment.country?.label;
    const flag = payment.country?.flag;
    const amount = payment.amount || 0;

    if (!acc[countryName]) {
      acc[countryName] = {
        countryFlag: flag,
        total: 0,
      };
    }

    acc[countryName].total += amount;

    return acc;
  }, {});

  const topCountry = Object.entries(totalByCountry).sort((a, b) => b[1] - a[1]);

  // new order filterd by updated date

  const paymentsSorted = payment
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // récupérer tous les produits avec la date du paiement
  const productsWithDate = paymentsSorted.flatMap((payment) =>
    payment.cartItems.map((item) => ({
      ...item,
      paymentCreatedAt: payment.createdAt,
      paymentCountry: payment.country, // si tu veux le drapeau et le pays
    }))
  );

  console.log(productsWithDate);

  const productsSortedByNew = productsWithDate
    .slice()
    .sort(
      (a, b) => new Date(b.paymentCreatedAt) - new Date(a.paymentCreatedAt)
    );

  const sortedItems = productsSortedByNew.slice(0, 7);

  console.log("producct sorted by new", productsSortedByNew);
  // Données simulées

  // top product sale

  const resul = Array.isArray(payment)
    ? payment.slice().reduce(
        (acc, item) => {
          const { updatedAt, amount = 0, cartItems = [] } = item;

          acc.totalAmount += amount;

          const category = item.category || null;
          const stock = item.stock || null;

          cartItems.forEach(({ title, quantity, price }) => {
            if (!acc.products[title]) {
              acc.products[title] = {
                title,
                price,
                quantity: 0,
                category,
                stock,
                updatedAt,
              };
            }
            acc.products[title].quantity += quantity;
            // acc.products[title].dates.push(updatedAt);
          });
          return acc;
        },
        { totalAmount: 0, products: {} }
      )
    : { totalAmount: 0, products: {} };

  const topProduct = Object.values(resul.products).sort(
    (a, b) => b.quantity - a.quantity
  );

  // total sale
  // const totalAmount = Array.isArray(payment)
  //   ? payment.reduce((acc, item) => acc + (item.amount || 0), 0)
  //   : 0;

  // total orders
  const totalOrders = Array.isArray(payment) ? payment.length : 0;
  // average orders

  const averageAmount =
    totalOrders > 0 ? resul.totalAmount / totalOrders.toFixed(2) : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {/* Statistiques principales */}
        <div className="col-span-1  lg:col-span-5 min-w-full h-full">
          <div className="grid grid-cols-1 place-items-center items-center md:grid-cols-3 gap-4">
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
                  <p className="text-xl font-semibold text-black">
                    {resul.totalAmount.toLocaleString()}k
                  </p>
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
                    Average amount
                  </p>
                  <p className="text-xl font-semibold text-black">
                    {averageAmount.toLocaleString()}k
                  </p>
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
                  <p className="text-xl font-semibold text-black">
                    {totalOrders}
                  </p>
                  <p className="text-xs text-green-600 mt-2 flex items-center">
                    <TrendingUp size={14} className="mr-1" /> +5% this week
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* chart */}
          <div className="border w-full  border-[#484848] my-2 shadow-md rounded-md mt-9 md:mt-24">
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
          <ul className="space-y-4 text-sm text-gray-600">
            {topCountry.map(([country, info]) => (
              <li key={country} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {info.countryFlag && (
                    <img
                      src={info.countryFlag}
                      alt={info.label || country}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                  )}
                  <span className="font-medium">{info.label || country}</span>
                </div>

                <div>
                  <span className="text-[#777777] text-sm">
                    {info.total.toLocaleString()}k
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 my-3">
        <div className=" col-span-2  lg:col-span-5 h-full">
          <div className="overflow-x-auto  scrollbar-hide bg-white rounded-lg shadow-md border border-[#484848] p-6">
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
                {topProduct.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-800">{item.title}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Intl.DateTimeFormat("en-US").format(
                        new Date(item.updatedAt)
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.category || "no category yet"}
                    </td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        item.stock === "Out Of Stock"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {item.stock || "not set yet"}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.price || "—"}k
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {resul.totalAmount.toLocaleString()}k
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 py-4  shadow-sm border border-[#484848] bg-white rounded-md  px-2">
          <h2 className="text-xl  font-medium text-black text-center">
            Recent Orders
          </h2>
          <ul className="space-y-2 p-2">
            {sortedItems.map((item, i) => {
              // Vérifie que paymentCreatedAt est une date ou convertible en date
              const date = new Date(item.paymentCreatedAt);
              const formattedDate = new Intl.DateTimeFormat("en-US").format(
                date
              );

              return (
                <li
                  key={i}
                  className="flex gap-2 w-full items-center justify-between text-gray-700"
                >
                  <span className="text-sm text-[#000000] font-medium">
                    {item.title}
                  </span>
                  <span className="text-xs font-semibold flex gap-1">
                    {item.price}k
                  </span>
                  <span className="text-xs font-semibold">{formattedDate}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
    </div>
  );
};
