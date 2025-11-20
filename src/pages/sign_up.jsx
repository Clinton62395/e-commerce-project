import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { api } from "../services/constant";
import app from "../services/firabase";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

const schema = yup.object({
  firstName: yup.string().min(3).max(15).required("first Name is required"),
  lastName: yup.string().min(3).max(15).required("last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, "Must be a valid number")
    .required("phone number is required"),

  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});
export const Register = () => {
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirected, setIsRedirected] = useState(false);

  const toggleShoPassword = () => setShowPassword((prev) => !prev);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // registration using google account

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    setIsRedirected(true);
    try {
      const res = await signInWithPopup(auth, provider);
      if (res) {
        const user = res.user;
        const token = await user.getIdToken();

        await sendTokenToBackend(token);
      }
    } catch (err) {
      console.log("error occured when google signing", err);
    } finally {
      setIsRedirected(false);
    }
  };

  const sendTokenToBackend = async (token) => {
    setIsRedirected(true);
    try {
      const res = await toast.promise(
        api.post("/auth/google", { token }),

        {
          loading: " login...",
          success: "user login successfully",
          error: (err) => err.response.data?.message || error.response?.data,
        }
      );
      console.log("backend response:", res.data);
      navigate("/shop");
    } catch (error) {
      console.error("error sending token:", error);
    } finally {
      setIsRedirected(false);
    }
  };
  const onSubmit = async (data) => {
    setIsRedirected(true);
    try {
      console.log("data submited register side==>", data);
      const res = await toast.promise(
        api.post(`/auth/register`, data),

        {
          loading: "data sending...",
          success: "user registered successfully",
          error: (err) => err.response.data?.message || error.response?.data,
        }
      );
      const { data: userData } = res.data;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      console.log("data sent to te backend from register ==>", userData);

      localStorage.setItem("token", token);
      navigate("/shop");
      reset();
    } catch (err) {
      console.error("error occured when registering", err);
    } finally {
      setIsRedirected(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: image (kept as-is) */}
          <div className="relative hidden md:block">
            <img
              src="Rectangle 19280 (1).png"
              alt="FASCO sign up"
              className="h-full w-full object-cover rounded-l-2xl"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-l-2xl">
              <div className="text-white text-center p-6">
                <h2 className="text-3xl font-bold">FASCO</h2>
                <p className="text-sm">Create your account</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="p-8 md:p-12 flex items-center">
            <div className="w-full max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-1">
                Create an account
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Join FASCO — manage orders, save favorites and checkout faster.
              </p>

              <button
                disabled={isRedirected}
                onClick={signInWithGoogle}
                className={`w-full flex items-center ${
                  isRedirected
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "border border-[#5B86E5] text-[#0f172a]"
                }  justify-center gap-3  rounded-md py-2 px-4 mb-5 hover:bg-gray-100 transition-colors relative`}
                aria-label="Sign up with Google"
              >
                <img src="google-logo.png" alt="google" className="h-5" />
                <span className="font-medium">Sign up with Google</span>
              </button>

              <div className="flex items-center gap-3 my-4">
                <hr className="flex-1 border-t border-gray-200" />
                <span className="text-xs text-gray-400">or</span>
                <hr className="flex-1 border-t border-gray-200" />
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-xs font-medium text-gray-700 mb-1"
                    >
                      First name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      {...register("firstName")}
                      aria-invalid={errors.firstName ? "true" : "false"}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9BF8]"
                      placeholder="Enter First Name"
                    />
                    <p className="text-xs text-red-500 mt-1">
                      {errors.firstName?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-xs font-medium text-gray-700 mb-1"
                    >
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      {...register("lastName")}
                      aria-invalid={errors.lastName ? "true" : "false"}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9BF8]"
                      placeholder="Enter Last Name"
                    />
                    <p className="text-xs text-red-500 mt-1">
                      {errors.lastName?.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9BF8]"
                    placeholder="your address email"
                  />
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email?.message}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-xs font-medium text-gray-700 mb-1"
                    >
                      Phone number
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      {...register("phoneNumber")}
                      aria-invalid={errors.phoneNumber ? "true" : "false"}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9BF8]"
                      placeholder="you phone number"
                    />
                    <p className="text-xs text-red-500 mt-1">
                      {errors.phoneNumber?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-xs font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        aria-invalid={errors.password ? "true" : "false"}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9BF8]"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={toggleShoPassword}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-red-500 mt-1">
                      {errors.password?.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9BF8]"
                    placeholder="Confirm password"
                  />
                  <p className="text-xs text-red-500 mt-1">
                    {errors.confirmPassword?.message}
                  </p>
                </div>

                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-md text-white bg-black hover:bg-gray-800 transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <PropagateLoader size={8} color="#fff" />
                        <span className="text-sm">Signing up...</span>
                      </span>
                    ) : (
                      <span className="text-sm font-medium">
                        Create account
                      </span>
                    )}
                  </button>
                </div>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#5B86E5] hover:underline">
                    Log in
                  </Link>
                </p>
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
