import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/constant";
import toast from "react-hot-toast";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await toast.promise(
        api.post("/auth/resetPassword", { email }),
        {
          loading: "Sending reset instructions...",
          success: "Reset instructions sent! Please check your email.",
          error: (err) =>
            err.response?.data ||
            res.response.data?.message ||
            "Failed to send reset instructions. Please try again.",
        }
      );
      setEmail("");
      console.log("Response: from backend", res.data);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.log("Error: from backend", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-gray-50 p-5 md:p-10 min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row p-5 rounded-lg shadow-lg border border-gray-200 justify-center items-center max-w-4xl w-full">
        <div className="group flex justify-center items-center p-4 md:p-10 w-full md:w-1/3">
          <img
            src="/logo-shoping.png"
            alt="FASCO logo"
            className="group-hover:shadow-md transition-all duration-200 hover:scale-105 hover:rounded-md max-w-[200px]"
          />
        </div>
        <div className="text-center w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-6">FASCO</h1>
          <h2 className="text-black font-bold text-start my-2 text-2xl capitalize tracking-wide">
            Reset Password
          </h2>
          <p className="text-gray-600 text-start mb-6">
            Enter your email address and we'll send you instructions to reset
            your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-start">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none w-full border-b-2 border-gray-300 py-2 focus:border-[#6C9BF8] transition-colors"
                placeholder="Enter your email"
                required
                aria-required="true"
                aria-invalid={error ? "true" : "false"}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {error}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#000000] hover:bg-[#6C9BF8] text-white py-3 px-4 rounded-md duration-150 transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Reset Instructions"}
              </button>
              <Link
                to="/login"
                className="flex justify-center items-center gap-2 text-[#5B86E5] hover:underline"
              >
                <span className="text-black">Remember your password?</span>
                Login
              </Link>
            </div>
          </form>
          <p className="text-xs text-gray-500 mt-8 md:mt-16 text-center">
            <a href="#" className="hover:underline">
              FASCO Terms & Conditions
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export const ConfirmationPassword = () => {
  return <div>forget_password</div>;
};
