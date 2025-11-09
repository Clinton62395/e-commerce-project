import react, { useState } from "react";
import { DollarSign, Eye, EyeOff, Plus } from "lucide-react";
import { Chart } from "./chart";
import { useQuery } from "@tanstack/react-query";
export const Revenus = () => {
  const [showRevenu, setShowRevenu] = useState(false);

  const { data: payment = [], isPending } = useQuery({
    queryKey: ["allPayments"],
    queryFn: () => api.get("/payment/all").then((res) => res.data.data),
  });
  console.log("payment from admin dashboard", payment);

  // revenu
  const totalRevenu = Array.isArray(payment)
    ? payment.slice().reduce((acc, item) => acc + item.amount, 0)
    : 0;

  const currentTransaction = Array.isArray(payment)
    ? payment.slice().reduce((acc, item) => {
        const {
          firstName,
          lastName,
          _id,
          createdAt,
          amount,
          cartItems = {},
        } = item;

        acc[_id] = {
          fullName: `${firstName} ${lastName}`,
          createdAt,
          _id,
          amount,
          cartItems,
        };
        return acc;
      }, {})
    : {};

  const newOrderFilters = Object.values(currentTransaction).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const newTransaction = newOrderFilters.slice(0, 10);
  console.log("order transaction filterd", newTransaction);

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

            <span className="text-3xl font-medium leading-10">
              {showRevenu ? totalRevenu.toLocaleString() : "*********"}
            </span>

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
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order Id
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {newTransaction.map((customer) =>
              customer.cartItems.map((item, i) => (
                <tr key={`${customer._id}-${i}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {i === 0 ? customer.fullName : ""}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.quantity}</td>
                  <td className="px-6 py-4 text-gray-600">{item.price}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {i === 0 ? customer._id : ""}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {i === 0 ? customer.price || "—" : ""}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {i === 0
                      ? new Intl.DateTimeFormat("en-US").format(
                          new Date(customer.createdAt)
                        )
                      : ""}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
