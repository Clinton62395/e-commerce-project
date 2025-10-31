import react, { useState } from "react";
import { Calendar, Mail, MapPin, Search } from "lucide-react";
export const Orders = () => {
  const [filterOrder, setFilterOrder] = useState("All");

  const tableContent = Array.from({ length: 30 }, (_, i) => ({
    image: "product image",
    name: "Women’s high waist jeans",
    quantity: 3,
    OrdersId: `#FS0001${i + 1}`,
    customer: "",
    Price: "$31",
    Date: "21/sept/2025",
    Status: "complete",
  }));

  return (
    <>
      <div className="bg-white shadow-sm p-5 ">
        <div className="flex items-center justify-between max-w-5xl mx-auto font-medium">
          <div className=" flex items-center gap-4 text-[#777777]">
            <button>All</button>
            <button>Top Orders</button>
            <button>Shipping</button>
            <button>Complited</button>
            <button>Canceled</button>
          </div>
          <div>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          {tableContent.map((item, i) => (
            <table className="min-w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="px-4 py-3 text-left">Product Name</th>
                  <th className="px-4 py-3 text-left">Quantity</th>
                  <th className="px-4 py-3 text-left">Order ID</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-gray-800">
                {tableContent.map((item, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3">QTY {item.QTY}</td>
                    <td className="px-4 py-3">{item.OrdersId}</td>
                    <td className="px-4 py-3">{item.customer || "N/A"}</td>
                    <td className="px-4 py-3 font-semibold">{item.Price}</td>
                    <td className="px-4 py-3">{item.Date}</td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        item.Status === "complete"
                          ? "text-green-600"
                          : item.Status === "pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.Status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </div>
    </>
  );
};
