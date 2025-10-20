import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Vérification en cours...");
  const reference = searchParams.get("reference");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/verify/${reference}`
        );

        if (response.data.payment.status === "success") {
          setStatus("✅ Paiement réussi !");
        } else {
          setStatus("⚠️ Paiement en attente ou échoué.");
        }
      } catch (error) {
        console.error(error);
        setStatus("❌ Erreur lors de la vérification du paiement.");
      }
    };

    if (reference) verifyPayment();
  }, [reference]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
      <div className="bg-white shadow-lg p-6 rounded-2xl max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-green-600">
          {status}
        </h1>
        <p className="text-gray-600 mb-4">
          Référence du paiement : <strong>{reference}</strong>
        </p>
        <a
          href="/"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          Retour à l’accueil
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
