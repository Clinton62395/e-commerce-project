import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Search,
  Bell,
  User,
  Plus,
  Edit,
  Trash2,
  Filter,
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Eye,
  Upload,
  Save,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Données simulées
  const [products, setProducts] = useState([
    {
      _id: "1",
      clotheName: "T-shirt Casual",
      title: "T-shirt en coton bio",
      description: "T-shirt confortable en coton biologique",
      category: "men",
      price: 29.99,
      quantity: 150,
      rate: "4.5",
      picture:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
      newArrival: true,
      promot: false,
      size: ["S", "M", "L"],
      color: ["Blanc", "Noir"],
      brands: ["Nike"],
      tags: ["casual", "cotton"],
    },
    {
      _id: "2",
      clotheName: "Robe Élégante",
      title: "Robe soirée été",
      description: "Robe élégante pour occasions spéciales",
      category: "women",
      price: 89.99,
      quantity: 75,
      rate: "4.8",
      picture:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
      newArrival: false,
      promot: true,
      size: ["XS", "S", "M"],
      color: ["Rouge", "Noir"],
      brands: ["Zara"],
      tags: ["elegant", "soiree"],
    },
    {
      _id: "3",
      clotheName: "Jean Slim",
      title: "Jean délavé moderne",
      description: "Jean slim fit confortable",
      category: "men",
      price: 59.99,
      quantity: 200,
      rate: "4.3",
      picture:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      newArrival: true,
      promot: false,
      size: ["28", "30", "32", "34"],
      color: ["Bleu"],
      brands: ["Levi's"],
      tags: ["denim", "casual"],
    },
  ]);

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

  const [customers, setCustomers] = useState([
    {
      _id: "1",
      name: "Marie Dubois",
      email: "marie@email.com",
      phone: "+33 6 12 34 56 78",
      totalOrders: 12,
      totalSpent: 1249.88,
      joinDate: "2024-03-15",
      status: "active",
    },
    {
      _id: "2",
      name: "Jean Martin",
      email: "jean@email.com",
      phone: "+33 6 98 76 54 32",
      totalOrders: 8,
      totalSpent: 689.92,
      joinDate: "2024-06-20",
      status: "active",
    },
    {
      _id: "3",
      name: "Sophie Bernard",
      email: "sophie@email.com",
      phone: "+33 6 55 44 33 22",
      totalOrders: 15,
      totalSpent: 1899.75,
      joinDate: "2024-01-10",
      status: "active",
    },
  ]);

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    newCustomers: customers.filter((c) => c.status === "active").length,
  };

  const Sidebar = () => (
    <div
      className={`bg-white shadow-lg h-full flex flex-col transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-6 flex items-center justify-between border-b">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Package className="text-white" size={20} />
          </div>
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-gray-800 ml-3">
              FashionAdmin
            </h1>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {[
            { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
            { icon: Package, label: "Produits", id: "products" },
            { icon: ShoppingCart, label: "Commandes", id: "orders" },
            { icon: Users, label: "Clients", id: "customers" },
            { icon: BarChart3, label: "Analytics", id: "analytics" },
            { icon: Settings, label: "Paramètres", id: "settings" },
          ].map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon size={20} />
                {sidebarOpen && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  const Header = () => (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 mr-4"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {activeTab === "dashboard" && "Tableau de Bord"}
            {activeTab === "products" && "Gestion des Produits"}
            {activeTab === "orders" && "Commandes"}
            {activeTab === "customers" && "Clients"}
            {activeTab === "analytics" && "Analytics"}
            {activeTab === "settings" && "Paramètres"}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
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

          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={16} />
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Produits Total</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {stats.totalProducts}
              </h3>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" /> +12% ce mois
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Commandes</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {stats.totalOrders}
              </h3>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" /> +8% ce mois
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenu Total</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                €{stats.totalRevenue.toFixed(2)}
              </h3>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" /> +23% ce mois
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Clients Actifs</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {stats.newCustomers}
              </h3>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp size={14} className="mr-1" /> +5% ce mois
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Commandes Récentes</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order._id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    €{order.total.toFixed(2)}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "processing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Produits Populaires</h3>
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={product.picture}
                    alt={product.clotheName}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {product.clotheName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Stock: {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    €{product.price}
                  </p>
                  <div className="flex items-center text-yellow-500 text-sm">
                    ⭐ {product.rate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Products = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Filter size={18} className="mr-2" />
            Filtrer
          </button>
          <select className="px-4 py-2 border rounded-lg">
            <option>Toutes catégories</option>
            <option>Hommes</option>
            <option>Femmes</option>
            <option>Enfants</option>
          </select>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowProductModal(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} className="mr-2" />
          Nouveau Produit
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Produit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Note
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={product.picture}
                      alt={product.clotheName}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-gray-800">
                        {product.clotheName}
                      </p>
                      <p className="text-sm text-gray-500">{product.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium">€{product.price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`${
                      product.quantity < 50 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {product.quantity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    {product.rate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setShowProductModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          confirm("Voulez-vous vraiment supprimer ce produit ?")
                        ) {
                          setProducts(
                            products.filter((p) => p._id !== product._id)
                          );
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Produit */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                {editingProduct ? "Modifier le produit" : "Nouveau produit"}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nom du produit
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    defaultValue={editingProduct?.clotheName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Titre
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    defaultValue={editingProduct?.title}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                  defaultValue={editingProduct?.description}
                ></textarea>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Prix (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border rounded-lg"
                    defaultValue={editingProduct?.price}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantité
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    defaultValue={editingProduct?.quantity}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Catégorie
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option>men</option>
                    <option>women</option>
                    <option>kids</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Image du produit
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-600">
                    Cliquez pour uploader ou glissez-déposez
                  </p>
                  <input type="file" className="hidden" />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    alert("Produit enregistré !");
                    setShowProductModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Save size={18} className="inline mr-2" />
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const Orders = () => (
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

  const Customers = () => (
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
  return (
    <div className="flex h-screen bg-gray-100">
      {sidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "products" && <Products />}
          {activeTab === "orders" && <Orders />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
