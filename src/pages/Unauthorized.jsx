import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-4 rounded-full">
            <ShieldAlert size={60} className="text-red-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-3 text-gray-900">
          Unauthorized Access
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Sorry, you don’t have permission to access this page. Please contact
          an administrator if you believe this is a mistake.
        </p>

        <Link
          to="/login"
          className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Go to Login
        </Link>

        <p className="text-sm text-gray-400 mt-6">
          Error Code: 403 - Forbidden
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
