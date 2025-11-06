import react, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { socket } from "../../socket";
export const Orders = () => {
  const [filterOrder, setFilterOrder] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // ... (Code de connexion et join-dashboard ci-dessus)

    // 3. Écouter l'événement de nouvelle transaction
    socket.on("new-successful-transaction", (transactionData) => {
      console.log("🔔 Nouvelle Transaction Reçue:", transactionData.data);

      // Ajouter la nouvelle transaction à l'état local pour l'afficher
      setTransactions((prevTransactions) => [
        transactionData.data,
        ...prevTransactions,
      ]);

      // Optionnel : Afficher une notification (toast, alerte, etc.)
      alert(`Nouvelle commande de ${transactionData.data.amount} reçue !`);
    });

    // Nettoyage : retirer l'écouteur lors du démontage
    return () => {
      socket.off("new-successful-transaction");
      socket.disconnect();
    };
  }, []);

  const getYear = new Date();
  const formatDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(getYear);

  const [products, setProducts] = useState([
    {
      _id: "1",
      clotheName: "T-shirt Casual",
      quantity: 150,

      orderId: "#FS0001",
      customers: "Keira Griffin",
      price: 29.99,
      newArrival: true,
      stacts: {
        status: "completed",
        paymenMethod: "cash_on_delivery",
        newArrival: true,
      },
      releaseDate: formatDate,
      picture:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
    },
    {
      _id: "2",
      clotheName: "Robe Élégante",
      quantity: 200,

      orderId: "#FS0002",
      customers: "Richard Duncan",
      price: 29.99,
      picture:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "3",
      clotheName: "Richard Duncan",
      price: 59.99,
      quantity: 200,
      orderId: "#FS0003",
      customers: "Keira Griffin",
      stacts: {
        status: "cancelled",
        paymenMethod: "cash_on_delivery",
        newArrival: true,
      },

      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "4",
      clotheName: "Richard Duncan",
      price: 59.99,
      quantity: 200,
      orderId: "#FS0004",
      customers: "Keira Griffin",

      stacts: {
        status: "completed",
        newArrival: false,
      },

      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "5",
      clotheName: "Richard Duncan",
      price: 57.99,
      quantity: 20,
      orderId: "#FS0005",
      stacts: {
        status: "completed",
        paymenMethod: "cash_on_delivery",
        newArrival: true,
      },
      customers: "Keira Griffin",

      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "6",
      clotheName: "Richard Duncan",
      price: 59.99,
      quantity: 207,
      customers: "Keira Griffin",

      orderId: "#FS0006",
      // status: ["In Stock", "Coming Soon", "Out of Stock"],
      stacts: {
        status: "processing",
        paymenMethod: "cash_on_delivery",
        newArrival: true,
      },
      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "7",
      clotheName: "Richard Duncan",
      price: 9.99,
      quantity: 280,
      orderId: "#FS0007",
      customers: "Keira Griffin",

      // status: ["In Stock", "Coming Soon", "Out of Stock"],
      stacts: {
        status: "processing",
        newArrival: false,
      },
      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "8",
      clotheName: "Richard Duncan",
      price: 90.99,
      quantity: 980,
      orderId: "#FS0008",
      customers: "Keira Griffin",

      stacts: {
        status: "completed",
        newArrival: false,
      },
      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "9",
      clotheName: "Richard Duncan",
      price: 90.99,
      quantity: 280,
      customers: "Keira Griffin",

      orderId: "#FS0009",
      stacts: {
        status: "cancelled",
        paymenMethod: "cash_on_delivery",
        newArrival: false,
      },
      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "10",
      clotheName: "Richard Duncan",
      price: 21.99,
      quantity: 80,
      customers: "Keira Griffin",

      orderId: "#FS00010",
      stacts: {
        status: "completed",
        newArrival: false,
      },
      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "11",
      clotheName: "T-shirt Casual",
      quantity: 150,

      orderId: "#FS00011",
      customers: "Keira Griffin",
      price: 29.99,
      stacts: {
        status: "completed",
        paymenMethod: "cash_on_delivery",
        newArrival: true,
      },

      releaseDate: formatDate,
      picture:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
    },
    {
      _id: "12",
      clotheName: "Robe Élégante",
      quantity: 200,

      orderId: "#FS00012",
      customers: "Richard Duncan",
      price: 29.99,
      stacts: {
        status: "completed",
        paymenMethod: "cash_on_delivery",
        newArrival: true,
      },
      picture:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "13",
      clotheName: "Richard Duncan",
      price: 59.99,
      quantity: 200,
      orderId: "#FS00013",
      stacts: {
        status: "completed",
        paymenMethod: "cash_on_delivery",
        newArrival: true,
      },
      customers: "Keira Griffin",

      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "14",
      clotheName: "Richard Duncan",
      price: 59.99,
      quantity: 200,
      orderId: "#FS00014",
      stacts: {
        status: "completed",
        paymenMethod: "cash_on_delivery",
        newArrival: true,
      },
      customers: "Keira Griffin",

      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "15",
      clotheName: "Richard Duncan",
      price: 57.99,
      quantity: 20,
      orderId: "#FS00015",
      customers: "Keira Griffin",

      stacts: {
        status: "completed",
        paymenMethod: "cash_on_delivery",
        newArrival: true,
      },
      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "16",
      clotheName: "Richard Duncan",
      price: 59.99,
      quantity: 207,
      orderId: "#FS00016",
      customers: "Keira Griffin",
      stacts: {
        status: "completed",
        paymenMethod: "cash_on_delivery",
      },
      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "17",
      clotheName: "Richard Duncan",
      price: 9.99,
      quantity: 280,
      orderId: "#FS00017",
      customers: "Keira Griffin",
      stacts: {
        status: "delevered",
        paymenMethod: "cash_on_delivery",
        newArrival: true,
      },
      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      releaseDate: formatDate,
    },
    {
      _id: "18",
      clotheName: "Richard Duncan",
      price: 90.99,
      quantity: 980,
      orderId: "#FS00018",
      customers: "Keira Griffin",
      stacts: {
        status: "completed",
      },
      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      newArrival: true,
      releaseDate: formatDate,
    },
    {
      _id: "19",
      clotheName: "Richard Duncan",
      price: 90.99,
      quantity: 280,
      orderId: "#FS0019",
      customers: "Keira Griffin",
      stacts: {
        status: "completed",
        paymenMethod: "cash_on_delivery",
      },
      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      newArrival: true,
      releaseDate: formatDate,
    },
    {
      _id: "20",
      clotheName: "Richard Duncan",
      price: 21.99,
      quantity: 80,
      orderId: "#FS00020",
      customers: "Keira Griffin",
      stacts: {
        status: "delevered",
        paymenMethod: "cash_on_delivery",
      },
      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      releaseDate: formatDate,
    },
  ]);

  const filteredProducts = products.filter((item) => {
    const name = item.clotheName.toLowerCase();
    const customers = item.customers.toLowerCase();
    // const price = item.price.toLowerCase();
    const orderId = item.orderId.toLowerCase();
    const search = searchTerm.toLowerCase();

    let isItemMatch = false;
    if (filterOrder === "All") return true;
    if (filterOrder === "Top Orders") return item.quantity > 200;
    if (filterOrder === "Shipping")
      return status === "processing" || status === "delivered";
    if (filterOrder === "Completed") return status === "completed";
    if (filterOrder === "Cancelled") return status === "cancelled";

    const matchesItems =
      name.includes(search) ||
      customers.includes(search) ||
      price.includes(search) ||
      orderId.includes(search);

    return isItemMatch && matchesItems;
  });

  return (
    <>
      <div className="bg-white shadow-sm p-5  space-y-6">
        <div className="flex items-center justify-between max-w-5xl mx-auto font-medium">
          <div className="flex items-center gap-2 md:gap-4 text-[#777777] flex-wrap">
            <div className="grid grid-cols-2 md:flex items-start text-start">
              {["All", "Top Orders", "Shipping", "Completed", "Cancelled"].map(
                (item, i) => (
                  <button
                    onClick={() => setFilterOrder(item)}
                    key={i}
                    className={` px-5 py-2 text-sm  rounded-md duration-300 transition-all  font-medium text-center md:text-lg ${
                      filterOrder === item
                        ? "bg-black/80 hover:bg-black text-white "
                        : " text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <div className="relative md:order-2 order-1">
              <Search
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Qty</th>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((item) => (
                <tr
                  key={item.reference}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    {item.cartItems.image && (
                      <img
                        src={item.cartItems.image}
                        alt={item.cartItems.title}
                        className="w-10 h-10 rounded-full object-cover shadow-sm"
                      />
                    )}
                    <span className="font-medium text-gray-800">
                      {item.cartItems.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{item.quantity}</td>
                  <td className="px-6 py-4 text-gray-700">{item.reference}</td>
                  <td className="px-6 py-4 text-gray-700">{item.firstName}</td>
                  <td className="px-6 py-4 text-gray-700">${item.price}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {item.releaseDate}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === "paid"
                          ? " text-[#166A42]"
                          : item.status === "pending"
                          ? " text-[#D4A611]"
                          : ""
                      }`}
                    >
                      {item?.status || "Waiting"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
