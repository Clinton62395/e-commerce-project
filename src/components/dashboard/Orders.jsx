import react, { useState } from "react";
import { Calendar, Mail, MapPin } from "lucide-react";
export const Orders = () => {
  const [orders, setOrders] = useState([
    {
      _id: "ORD001",
      customer: "Marie Dubois",
      email: "marie@email.com",
      date: "2025-10-28",
      total: 149.97,
      status: "delivered",
      items: 3,
      address: "12 Rue de Paris, Lyon",
    },
    {
      _id: "ORD002",
      customer: "Jean Martin",
      email: "jean@email.com",
      date: "2025-10-27",
      total: 89.99,
      status: "pending",
      items: 1,
      address: "45 Avenue Victor Hugo, Marseille",
    },
    {
      _id: "ORD003",
      customer: "Sophie Bernard",
      email: "sophie@email.com",
      date: "2025-10-26",
      total: 229.95,
      status: "processing",
      items: 5,
      address: "8 Boulevard Saint-Germain, Paris",
    },
  ]);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <select className="px-4 py-2 border rounded-lg">
            <option>Tous les statuts</option>
            <option>En attente</option>
            <option>En cours</option>
            <option>Livré</option>
          </select>
          <input
            type="date"
            className="px-4 py-2 border rounded-lg"
            defaultValue="2025-10-28"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-lg">{order.customer}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "processing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status === "delivered"
                      ? "Livré"
                      : order.status === "processing"
                      ? "En cours"
                      : "En attente"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Commande #{order._id}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">
                  €{order.total.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">{order.items} articles</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Mail size={16} className="mr-2" />
                {order.email}
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar size={16} className="mr-2" />
                {order.date}
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-2" />
                {order.address}
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Détails
              </button>
              {order.status !== "delivered" && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Mettre à jour
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
