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
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../services/constant";

export const TransactionSuccess = () => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (payment?.shippingInfo && payment.shippingInfo.saveInfo === true) {
      const { shippingInfo } = payment;

      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
    }
  }, [payment]);

  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  useEffect(() => {
    const confettiTimer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(confettiTimer);
  }, []);

  useEffect(() => {
    const getPaymentReference = async () => {
      if (!reference) {
        setError("Référence de paiement manquante dans l'URL");
        setLoading(false);
        return;
      }

      try {
        // Remplace par ton URL d'API
        const res = await api.get(`/payment/verify/${reference}`);

        if (!res.data) {
          throw new Error(
            ` HTTP error occured: ${res.status}  ${res.data.statusCode} `
          );
        }

        console.log("✅ Payment data received:", res.data.data || res.data);
        setPayment(res.data.data);
      } catch (err) {
        console.error("❌ Error fetching payment:", err);
        setError(err.message || "Error occured when payment data loading");
      } finally {
        setLoading(false);
      }
    };

    getPaymentReference();
  }, [reference]);

  const handleDownloadReceipt = () => {
    alert("🧾receipt downloading ...");
  };

  const handleShareOrder = () => {
    if (navigator.share && payment) {
      navigator
        .share({
          title: "order received 🎉",
          text: `I made a payment of ${payment.amount} NGN successfully!`,
          url: window.location.href,
        })
        .catch((err) => console.log("sharing error:", err));
    } else {
      alert("your browser does not support sharing");
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-600">
            payment verification, hold on...
          </p>
          <p className="text-sm text-gray-500 mt-2">Hold on please</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !payment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">
            {error || "Données de paiement introuvables"}
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transition-all"
          >
            <Home className="w-5 h-5" />
            Go back to home
          </a>
        </div>
      </div>
    );
  }

  // Préparer les données pour l'affichage
  const cartItems = payment.cartItems || [];
  const shippingInfo = payment.shippingInfo || {};
  const country = payment.shippingInfo.country || {};
  console.log("country frontend nested==>", country);

  const formatDate = (dateString) => {
    if (!dateString) return "Non disponible";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEstimatedDelivery = () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() + 3);
    const end = new Date(today);
    end.setDate(end.getDate() + 5);

    return `${start.getDate()}-${end.getDate()} ${end.toLocaleDateString(
      "fr-FR",
      { month: "long", year: "numeric" }
    )}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 px-4">
      {/*  Animation Confetti */}
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
        {/* ✅ Success Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 text-center border-t-4 border-green-500">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <CheckCircle className="w-24 h-24 text-green-500 relative animate-bounce" />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Paiement successfully !
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Thanks {shippingInfo.firstName} {shippingInfo.lastName} for your
            order
          </p>

          <div className="inline-block bg-green-50 border-2 border-green-200 rounded-xl px-6 py-3 mb-4">
            <p className="text-sm text-gray-600 mb-1">Order reference</p>
            <p className="text-2xl font-bold text-green-600">
              {payment.reference}
            </p>
          </div>

          {payment.status && (
            <div className="inline-block">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700
                   
                `}
              >
                {payment.status}
              </span>
            </div>
          )}

          <p className="text-gray-600 mt-4">
            Confirmation sent to :{" "}
            <span className="font-medium text-gray-800">{payment.email}</span>
          </p>
        </div>

        {/* 📦 Order Timeline */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-500" />
            Order tracking
          </h2>

          <div className="relative">
            <div className="absolute left-6 top-8 bottom-8 w-1 bg-gradient-to-b from-green-500 via-blue-500 to-gray-300"></div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-gray-800">Order confirmed</h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(payment.paidAt || payment.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-gray-800"> Getting ready</h3>
                  <p className="text-sm text-gray-600">
                    Your order is getting ready
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center shadow-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-gray-500">In delivrence</h3>
                  <p className="text-sm text-gray-500">Soon on a way</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-gray-500">Delivered</h3>
                  <p className="text-sm text-gray-500">
                    Estimation: {getEstimatedDelivery()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* 📋 Order Summary */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-purple-500" />
              Order wrap up
            </h2>

            {cartItems.length > 0 ? (
              <div className="space-y-3 mb-4">
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start py-2 border-b border-gray-100"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {item?.picture && (
                          <img
                            src={item.picture[0].url}
                            alt={item.title}
                            className="h-10 w-10 rounded-full"
                          />
                        )}{" "}
                        {item.clotheName || item.title}
                      </p>
                      <div className="text-sm text-gray-500 flex justify-between items-center">
                        <span>Quantity: {item.quantity || 1}</span>
                        {item?.color && (
                          <span
                            className="h-10 w-10 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></span>
                        )}
                      </div>
                    </div>
                    <p className="font-bold text-gray-800">
                      {item.price ? `${item.price} NGN` : "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 py-4">No Products found</p>
            )}

            <div className="pt-4 border-t-2 border-gray-200">
              <div className="flex justify-between items-center mb-2"></div>
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-gray-800">Total</p>
                <p className="text-2xl font-bold text-green-600">
                  {payment.amount
                    ? `${payment.amount.toLocaleString("en-NG")}`
                    : "N/A"}
                  NGN
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-1">Payment handled</p>
            </div>
          </div>

          {/* 📍 Shipping Address */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-red-500" />
              Delivrence Adresse
            </h2>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="font-bold text-gray-800 mb-2">
                {shippingInfo.firstName} {shippingInfo.lastName}
              </p>
              <p className="text-gray-600 mb-1">
                Adress: {shippingInfo.address || "Adresse non spécifiée"}
              </p>
              <div className="text-gray-600 mb-1 flex items-center justify-between">
                <span>Country: {country?.label}</span>
                {country?.flag && (
                  <img
                    src={country?.flag}
                    alt={country.lable}
                    className="w-5 h-5 rounded-sm mt-0.5"
                  />
                )}
              </div>
              <p className="text-gray-600 mb-1">City :{shippingInfo.city}</p>
              {shippingInfo.postalCode && (
                <p className="text-gray-600 mb-1">
                  PostalCode: {shippingInfo.postalCode}
                </p>
              )}
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <p className="font-bold text-blue-800">Estimeted delivrence</p>
              </div>
              <p className="text-blue-700 font-medium">
                {getEstimatedDelivery()}
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
              Download the Receipt
            </button>

            <button
              onClick={handleShareOrder}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Share2 className="w-5 h-5" />
              Share order
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-white text-gray-800 font-bold py-4 px-8 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            Go back to home
          </Link>

          <Link
            to="/shop"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <ShoppingBag className="w-5 h-5" />
            Go back to shopping
          </Link>
        </div>

        {/* 📧 Email Notification */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            confirmation message has been sent to{" "}
            <span className="font-semibold text-gray-800">{payment.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
