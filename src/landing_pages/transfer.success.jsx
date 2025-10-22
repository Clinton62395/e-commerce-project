import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Calendar,
  Download,
  Share2,
  Home,
  ShoppingBag,
} from "lucide-react";

export const TransactionSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [orderDetails] = useState({
    orderNumber: "JM-2025-10-" + Math.floor(Math.random() * 10000),
    amount: "45 750 FCFA",
    date: new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    estimatedDelivery: "25-27 Octobre 2025",
    paymentMethod: "Carte Bancaire",
    items: [
      { name: "iPhone 15 Pro Max 256GB", quantity: 1, price: "35 000 FCFA" },
      { name: "Coque de Protection", quantity: 2, price: "5 750 FCFA" },
      { name: "Livraison Express", quantity: 1, price: "5 000 FCFA" },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Rue de la Paix",
      city: "Ibadan, Oyo State",
      phone: "+234 XXX XXX XXXX",
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadReceipt = () => {
    alert("Téléchargement du reçu...");
  };

  const handleShareOrder = () => {
    alert("Partage de la commande...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 px-4">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 text-center border-t-4 border-green-500">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <CheckCircle className="w-24 h-24 text-green-500 relative animate-bounce" />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Paiement Réussi !
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Merci pour votre commande
          </p>

          <div className="inline-block bg-green-50 border-2 border-green-200 rounded-xl px-6 py-3">
            <p className="text-sm text-gray-600 mb-1">Numéro de commande</p>
            <p className="text-2xl font-bold text-green-600">
              {orderDetails.orderNumber}
            </p>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-500" />
            Suivi de Commande
          </h2>

          <div className="relative">
            <div className="absolute left-6 top-8 bottom-8 w-1 bg-gradient-to-b from-green-500 via-blue-500 to-gray-300"></div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-gray-800">
                    Commande confirmée
                  </h3>
                  <p className="text-sm text-gray-600">{orderDetails.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-gray-800">
                    Préparation en cours
                  </h3>
                  <p className="text-sm text-gray-600">
                    Votre commande est en préparation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center shadow-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-gray-500">En livraison</h3>
                  <p className="text-sm text-gray-500">Bientôt en route</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-gray-500">Livrée</h3>
                  <p className="text-sm text-gray-500">
                    Estimation: {orderDetails.estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-purple-500" />
              Résumé de la Commande
            </h2>

            <div className="space-y-3 mb-4">
              {orderDetails.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-start py-2 border-b border-gray-100"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantité: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-gray-800">{item.price}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t-2 border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-gray-800">Total</p>
                <p className="text-2xl font-bold text-green-600">
                  {orderDetails.amount}
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Payé par {orderDetails.paymentMethod}
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-red-500" />
              Adresse de Livraison
            </h2>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="font-bold text-gray-800 mb-2">
                {orderDetails.shippingAddress.name}
              </p>
              <p className="text-gray-600 mb-1">
                {orderDetails.shippingAddress.street}
              </p>
              <p className="text-gray-600 mb-1">
                {orderDetails.shippingAddress.city}
              </p>
              <p className="text-gray-600">
                {orderDetails.shippingAddress.phone}
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <p className="font-bold text-blue-800">Livraison estimée</p>
              </div>
              <p className="text-blue-700 font-medium">
                {orderDetails.estimatedDelivery}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={handleDownloadReceipt}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Download className="w-5 h-5" />
              Télécharger le Reçu
            </button>

            <button
              onClick={handleShareOrder}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Share2 className="w-5 h-5" />
              Partager la Commande
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center gap-2 bg-white text-gray-800 font-bold py-4 px-8 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all shadow-md hover:shadow-lg">
            <Home className="w-5 h-5" />
            Retour à l'Accueil
          </button>

          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <ShoppingBag className="w-5 h-5" />
            Continuer vos Achats
          </button>
        </div>

        {/* Email Notification */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Un email de confirmation a été envoyé à votre adresse email
          </p>
        </div>
      </div>
    </div>
  );
};
