import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
// CORRECTION: Changement du chemin d'accès relatif pour résoudre l'erreur de compilation
import toast from "react-hot-toast";
import { socket } from "../../socket";
import { api } from "../../services/constant";

const getStatusClasses = (status) => {
  switch (status) {
    case "completed":
    case "successful":
      return "bg-green-100 text-green-700";
    case "processing":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    case "delivered":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const defaultOrders = [
  // Vos données initiales sont toujours utiles pour remplir le tableau au départ
  {
    reference: "#FS0001",
    amount: 29.99,
    status: "completed",
    paidAt: new Date().toISOString(),
    cartItems: [
      {
        title: "T-shirt Casual",
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
      },
    ],
    shippingInfo: {
      firstName: "Keira",
      lastName: "Griffin",
      userEmail: "keira@example.com",
    },
  },
  {
    reference: "#FS0002",
    amount: 59.99,
    status: "processing",
    paidAt: new Date().toISOString(),
    cartItems: [
      {
        title: "Robe Élégante",
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
      },
    ],
    shippingInfo: {
      firstName: "Richard",
      lastName: "Duncan",
      userEmail: "richard@example.com",
    },
  },
  // Remplacer les 18 autres objets par le même format si vous voulez qu'ils s'affichent
];

export const Orders = () => {
  const [filterOrder, setFilterOrder] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Utiliser les données par défaut au départ
  const [transactions, setTransactions] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    // Charger l'historique
    loadTransactionHistory();

    console.log("🔌 [Orders] Initialisation Socket.IO...");
    const handleConnect = () => {
      console.log("✅ [Orders] Connecté:", socket.id);
      setIsConnected(true);
      toast.success("Dashboard connecté en temps réel");
    };

    const handleDisconnect = () => {
      console.log("❌ [Orders] Déconnecté");
      setIsConnected(false);
      toast.error("Connexion perdue");
    };

    const handleNewOrder = (payment) => {
      console.log("💰 [Orders] Transaction reçue:", payment);

      // const transactionData = payload.data;

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

  const loadTransactionHistory = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/payment/all`);

      if (data.success) {
        console.log(`✅ ${data.data.length} transactions historiques chargées`);
        console.log("data transaction ==>", data.data);
        console.log("data transaction ==>", typeof data.data);
        console.log("data transaction ==>", !!data.data);
        setTransactions(data.data || data);
      }
    } catch (err) {
      console.error("❌ Erreur chargement:", err);
      toast.error("Erreur de chargement de l'historique");
    } finally {
      setIsLoading(false);
    }
  };

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
        matchesFilter = status === "processing" || status === "delivered";
        break;
      case "Completed":
        matchesFilter = status === "completed" || status === "successful";
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
        <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-100">
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

                return (
                  <tr
                    key={transaction.reference}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      {transaction.picture && (
                        <img
                          src={transaction.picture}
                          alt={mainItem.title}
                          className="w-10 h-10 rounded-full object-cover shadow-sm"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/40x40/cccccc/333333?text=?";
                          }}
                        />
                      )}
                      <span className="font-medium text-gray-800">
                        {mainItem.title || "N/A"}
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
