import react, { useState } from "react";
import { DollarSign, Eye, EyeOff, Plus } from "lucide-react";
import { Chart } from "./chart";
export const Revenus = () => {
  const [showRevenu, setShowRevenu] = useState(false);
  const [customers, setCustomers] = useState([
    {
      _id: "1",
      name: "Marie Dubois",
      orderId: "FS0003",
      spent: 1249.88,
      date: "2024-03-15",
      price: "$ 1700",
      quantity: 30,
    },
    {
      _id: "2",
      name: "Jean Martin",
      orderId: "#FS0007",
      spent: 689.92,
      date: "2024-06-20",
      price: "$ 2700",
      quantity: 35,
    },
    {
      _id: "3",
      name: "Sophie Bernard",
      orderId: "#FS0007",
      spent: 1899.75,
      date: "2024-01-10",
      price: "$ 1600",
      quantity: 98,
    },
  ]);
  const getRevenu = () => {
    return customers.reduce((acc, item) => acc + item.spent, 0);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 max-w-3xl">
        <h2 className=" font-medium text-2xl text-yellow-950">Revenue</h2>
        <Chart />

        <div className="space-y-5">
          <p className="font-medium text-xl text-yellow-950">Total Revenue</p>

          <div className="max-w-xs flex bg-gray-300 py-4 items-center justify-between px-5  rounded shadow-sm">
            <DollarSign />

            <span className="text-3xl font-medium leading-10">{showRevenu ? getRevenu() : "*********"}</span>

            <button onClick={() => setShowRevenu(!showRevenu)}>
              {showRevenu ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden space-y-4 ">
        <h2 className="text-3xl font-medium text-gray-900 p-3">
          Recent Transactions
        </h2>
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                QYT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {customers.map((customer) => (
              <tr key={customer._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {customer.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{customer.quantity}</td>
                <td className="px-6 py-4 text-gray-600">{customer.orderId}</td>
                <td className="px-6 py-4 text-gray-600">{customer.price}</td>
                <td className="px-6 py-4 text-gray-600">{customer.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
