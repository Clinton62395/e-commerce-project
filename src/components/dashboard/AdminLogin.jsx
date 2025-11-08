import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Undo2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../../services/constant";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const res = await toast.promise(api.post("/admin/login", formData), {
          loading: "login...",
          success: "admin login successful",
          error: (err) =>
            err.response?.data?.message ||
            err.response.data ||
            "something went wrong",
        });

        if (res.data) {
          const { token } = res.data || res.data.data;

          localStorage.setItem("token", token);
          console.log("token from admin sign in==>", token);
          localStorage.setItem("adminData", JSON.stringify(res.data.data));

          setIsLoading(false);
          navigate("/admin-dashboard");
        }

        console.log("admin data from login==>", res.data);
        console.log("Login attempt with:", formData);
      } catch (error) {
        setErrors({ submit: "Failed to login. Please try again." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-gray-100 to-gray-200 p px-4 sm:px-6 ">
      <div className="relative max-w-6xl mx-auto bg-white rounded-2xl shadow-xl min-h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center ">
          {/* Image Section */}
          <div className="relative hidden md:block min-h-full ">
            <img
              src="/adminPicture.jpg"
              alt="Admin dashboard"
              className="h-screen w-full object-"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white p-6">
                <h2 className="text-3xl font-bold mb-4">FASCO Admin</h2>
                <p className="text-lg">
                  Manage your e-commerce platform with ease
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 lg:p-12 ">
            <button onClick={() => window.history.back()}>
              <Undo2 size={20} />
            </button>
            <div className="w-full max-w-md mx-auto">
              {/* Logo and Title */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">FASCO</h1>
                <p className="text-gray-600">Admin Dashboard Access</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2.5 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="ClitonAdmin@fasco.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
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
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-10 py-2.5 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500" role="alert">
                      {errors.password}
                    </p>
                  )}
                  <Link
                    to="/forget-password"
                    className="text-[10px] text-blue-600 hover:underline flex justify-end my-2"
                  >
                    Forgot password?
                  </Link>
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
                    {errors.submit}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Authenticating..." : "Login to Dashboard"}
                </button>

                {/* Back Button */}
                <Link
                  to="/admin-up"
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go to login
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
