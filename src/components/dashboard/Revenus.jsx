import react, { useState } from "react";
import { Plus } from "lucide-react";
export const Revenus = () => {
  const [customers, setCustomers] = useState([
    {
      _id: "1",
      name: "Marie Dubois",
      email: "marie@email.com",
      phone: "+33 6 12 34 56 78",
      orders: 12,
      spent: 1249.88,
      date: "2024-03-15",
      status: "active",
    },
    {
      _id: "2",
      name: "Jean Martin",
      email: "jean@email.com",
      phone: "+33 6 98 76 54 32",
      orders: 8,
      spent: 689.92,
      date: "2024-06-20",
      status: "active",
    },
    {
      _id: "3",
      name: "Sophie Bernard",
      email: "sophie@email.com",
      phone: "+33 6 55 44 33 22",
      orders: 15,
      spent: 1899.75,
      date: "2024-01-10",
      status: "active",
    },
  ]);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <select className="px-4 py-2 border rounded-lg">
            <option>Tous les clients</option>
            <option>Actifs</option>
            <option>Inactifs</option>
          </select>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={18} className="mr-2" />
          Nouveau Client
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Téléphone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Commandes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Dépensé (€)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date d'inscription
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {customers.map((customer) => (
              <tr key={customer._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {customer.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{customer.email}</td>
                <td className="px-6 py-4 text-gray-600">{customer.phone}</td>
                <td className="px-6 py-4 text-gray-600">{customer.orders}</td>
                <td className="px-6 py-4 text-gray-600">{customer.spent}</td>
                <td className="px-6 py-4 text-gray-600">{customer.date}</td>
                <td className="px-6 py-4 text-gray-600">{customer.status}</td>
                <td className="px-6 py-4 text-gray-600">
                  <button className="text-blue-600 hover:underline">
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
