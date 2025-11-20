import React, { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
// CORRECTION: Changement du chemin d'accès relatif pour résoudre l'erreur de compilation
import toast from "react-hot-toast";
import { socket } from "../../socket";
import { api } from "../../services/constant";
import { useQuery } from "@tanstack/react-query";

const getStatusClasses = (status) => {
  switch (status) {
    case "success":
    case "successful":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    case "delivered":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const Orders = () => {
  const [filterOrder, setFilterOrder] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Utiliser les données par défaut au départ
  const [transactions, setTransactions] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  console.log("les donnees de transaction from orders , top", transactions);
  const { isPending, error, data } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => {
      const res = await api.get("/payment/all");
      if (res.data) {
        return res.data.data;
      }
    },
    staleTime: 1000 * 60 * 10,
  });

  if (isPending)
    return (
      <div className="bg-black/90 flex items-center justify-center min-h-screen overflow-hidden">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-200"></div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  useEffect(() => {
    if (data) {
      setTransactions(data);
    }
  }, [data]);

  useEffect(() => {
    // Charger l'historique

    console.log("🔌 [Orders]Socket.IO Initialisation...");
    const handleConnect = () => {
      console.log("✅ [Orders] connected:", socket.id);
      setIsConnected(true);
      toast.success("Dashboard connected in reel time");
    };

    const handleDisconnect = () => {
      console.log("❌ [Orders] disconnect");
      setIsConnected(false);
      toast.error("network missing");
    };

    const handleNewOrder = (payment) => {
      console.log("💰 [Orders] Transaction received:", payment);

      setTransactions((prev) => {
        const exists = prev.some(
          (order) => order.reference === payment.reference
        );

        return exists
          ? prev.map((order) =>
              order.reference === payment.reference ? payment : order
            )
          : [payment, ...prev];
      });

      toast.success(
        `💰 order of payement reference ${payment.reference} updated`
      );
    };

    // Enregistrer les listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    socket.on("order:new", handleNewOrder);
    socket.on("order:updated", handleNewOrder);

    // Si déjà connecté
    if (socket.connected) {
      handleConnect();
    }

    // Nettoyage
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("order:new", handleNewOrder);
      socket.off("order:updated", handleNewOrder);
    };
  }, []);

  // LOGIQUE DE FILTRAGE
  const filteredTransactions = transactions.filter((transaction) => {
    const search = searchTerm.toLowerCase();
    const customerName = `${transaction.firstName || ""} ${
      transaction.lastName || ""
    }`.toLowerCase();

    // Gestion des cartItems (ATTENTION: le payload du backend devrait avoir cartItems comme un ARRAY)
    // Prenons le premier article pour la recherche
    const itemTitle = transaction.cartItems?.[0]?.title?.toLowerCase() || "";

    // Filtrage par terme de recherche
    const matchesSearch =
      itemTitle.includes(search) ||
      customerName.includes(search) ||
      transaction.reference?.toLowerCase().includes(search);

    // Filtrage par statut de commande
    const status = transaction.status?.toLowerCase() || "";
    let matchesFilter = true;

    switch (filterOrder) {
      case "Top Orders":
        // Logique de Top Orders basée sur la quantité ou le montant total
        // Ceci est un exemple, ajustez-le à votre définition de "Top Orders"
        matchesFilter = transaction.amount > 50;
        break;
      case "Shipping":
        matchesFilter = status === "pending" || status === "success";
        break;
      case "Completed":
        matchesFilter = status === "success";
        break;
      case "Cancelled":
        matchesFilter = status === "cancelled";
        break;
      case "All":
      default:
        matchesFilter = true;
        break;
    }

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-xl rounded-xl p-5 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 font-medium">
          {/* Filtres et Recherche */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-[#777777] flex-wrap w-full md:w-auto">
            <div className="grid grid-cols-3 sm:flex items-start text-start bg-gray-100 p-1 rounded-lg shadow-inner">
              {["All", "Top Orders", "Shipping", "Completed", "Cancelled"].map(
                (item, i) => (
                  <button
                    onClick={() => setFilterOrder(item)}
                    key={i}
                    className={`px-3 py-1 text-xs sm:px-5 sm:py-2 sm:text-sm rounded-md duration-300 transition-all font-medium text-center ${
                      filterOrder === item
                        ? "bg-black/90 hover:bg-black text-white shadow-md"
                        : "text-gray-600 hover:bg-white"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <div className="relative w-full md:w-auto">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Rechercher par Référence, Client..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Tableau des Commandes */}
        <div className="overflow-x-auto  scrollbar-hide rounded-lg shadow-xl border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Qty</th>
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((transaction) => {
                // IMPORTANT : Assurez-vous que cartItems est un tableau, même s'il ne contient qu'un seul élément
                const mainItem = transaction.cartItems?.[0] || {};
                const createAt = transaction.createAt;
                const formattedDate = new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(createAt);
                console.log("main items from orders ==>", mainItem);

                return (
                  <tr
                    key={transaction.reference}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      {mainItem?.picture.length > 0 ? (
                        <img
                          src={mainItem?.picture[0]?.url}
                          alt={mainItem.title || mainItem.className}
                          className="w-12 h-12 rounded-full object-cover shadow-sm"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/40x40/cccccc/333333?text=?";
                          }}
                        />
                      ) : (
                        <div>
                          <img
                            className="w-15 h-15 md:h-10 p-2 rounded-full object-cover shadow-sm"
                            src="https://image.shutterstock.com/image-vector/picture-icon-isolated-on-white-260nw-1451100425.jpg"
                          />
                        </div>
                      )}
                      <span className="font-medium text-gray-800">
                        {mainItem.title || mainItem.clotheName || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {mainItem.quantity || "-"}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-700">
                      {transaction.reference.slice(6)}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {transaction.firstName} {transaction.lastName}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      $
                      {transaction.amount
                        ? transaction.amount.toFixed(2)
                        : "0.00"}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{formattedDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${getStatusClasses(
                          transaction.status
                        )}`}
                      >
                        {transaction.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    Aucune commande trouvée correspondant aux filtres.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
