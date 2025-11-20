import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PropagateLoader } from "react-spinners";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import * as yup from "yup";
import { api } from "../services/constant";
import toast from "react-hot-toast";
import app from "../services/firabase";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const toggleShowPassword = () => setShowPassword((s) => !s);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const sendTokenToBackend = async (token) => {
    try {
      const res = await toast.promise(api.post("/auth/google", { token }), {
        loading: "Signing in...",
        success: "User signed in",
        error: (err) => err?.response?.data?.message || "Failed to sign in",
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      navigate("/shop");
    } catch (err) {
      console.error("Error sending token to backend:", err);
      toast.error("Google sign-in failed");
    }
  };

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      if (res) {
        const user = res.user;
        const token = await user.getIdToken();
        await sendTokenToBackend(token);
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
      toast.error("Google sign-in failed");
    }
  };

  const onLogin = async (data) => {
    try {
      const res = await toast.promise(api.post("/auth/login", data), {
        loading: "Logging in...",
        success: "Logged in",
        error: (err) => err?.response?.data?.message || "Login failed",
      });

      if (res?.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("refreshToken", res.data.refreshToken);
      }

      reset();
      navigate("/shop");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section - kept as-is */}
          <div className="relative hidden md:block">
            <img
              src="Rectangle 19280.png"
              alt="FASCO"
              className="h-full w-full object-cover rounded-l-2xl"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-l-2xl">
              <div className="text-center text-white p-6">
                <h2 className="text-3xl font-bold mb-2">FASCO</h2>
                <p className="text-lg">Welcome back — Sign in to continue</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 lg:p-10">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">FASCO</h1>
                <p className="text-gray-600">Sign in to your account</p>
              </div>

              <button
                onClick={signInWithGoogle}
                type="button"
                className={`w-full flex items-center justify-center gap-3 rounded-md py-2 px-4 mb-5 transition-colors border ${
                  isSubmitting
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "border-[#5B86E5] text-[#0f172a]"
                }`}
                aria-label="Sign in with Google"
              >
                <img src="google-logo.png" alt="google" className="h-5" />
                <span className="font-medium">Sign in with Google</span>
              </button>

              <div className="flex items-center gap-3 my-4">
                <hr className="flex-1 border-t border-gray-200" />
                <span className="text-xs text-gray-400">or</span>
                <hr className="flex-1 border-t border-gray-200" />
              </div>

              <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="you@example.com"
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                  </div>
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email?.message}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className="block w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your password"
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password?.message}
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-md text-white bg-black hover:bg-gray-800 transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <PropagateLoader size={10} color="#fff" />
                        <span className="text-sm">Signing in...</span>
                      </span>
                    ) : (
                      <span className="text-sm font-medium">Sign In</span>
                    )}
                  </button>
                </div>

                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-[#5B86E5] hover:underline"
                  >
                    Create one
                  </Link>
                </p>

                <div className="text-right">
                  <Link
                    to="/forget-password"
                    className="text-[#5B86E5] hover:underline text-sm"
                  >
                    Forget Password?
                  </Link>
                </div>
              </form>

              <p className="text-xs text-gray-500 mt-6 text-center">
                {" "}
                <a href="#">FASCO Terms & Conditions</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
