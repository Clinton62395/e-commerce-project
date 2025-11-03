import React, { useState, useEffect } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { api } from "../../services/constant";
import toast from "react-hot-toast";

export const AdminSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    adminSecret: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [otpError, setOtpError] = useState({});

  //   fetch otp for verification and auto submit form

  useEffect(() => {
    const getOtp = async () => {
      setIsLoading(true);
      try {
        setOtpError({});
        if (formData.adminSecret.length === 4) {
          const res = await api.post("/admin/otp-secret", {
            adminSecret: formData.adminSecret,
          });

          console.log("0tp feelback==>", res.data);

          if (res.data) {
            const { isValiCode, success, message } = res.data;
            if (isValiCode === true && success === true) {
              setIsOtpValid(isValiCode);
              setOtpError({ message: message });
              setTimeout(() => {
                setFormData((prev) => ({
                  ...prev,
                  adminSecret: "",
                }));
                setOtpError({});
              }, 1000);
              setIsLoading(false);
            }
          }
        }
      } catch (err) {
        console.log("error occurd when fectching otp", err);
        if (err.response.data?.message || err.response?.data) {
          setOtpError({
            err: err.response.data?.message || err.response?.data,
          });
          validateForm();
          setTimeout(() => {
            setFormData((prev) => ({
              ...prev,
              adminSecret: "",
            }));
            setOtpError({});
          }, 3000);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getOtp();
  }, [formData.adminSecret]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name is required (min 2 characters)";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!formData.adminSecret) {
      newErrors.adminSecret = "Admin secret is required";
    }
    if (formData.adminSecret.length !== 4) {
      newErrors.adminSecret = "Admin secret must be 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleOtpInput = (value) => {
    setFormData((prev) => ({ ...prev, adminSecret: value }));
    console.log("admin secret", value);
    if (errors.adminSecret) {
      setErrors((prev) => ({ ...errors, adminSecret: "" }));
    }
  };

  const handleSubmit = async (e) => {
    //   if (!validateForm()) return;
    setIsLoading(true);
    try {
      const res = await toast.promise(
        api.post("/admin/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          adminSecret: formData.adminSecret,
        }),

        {
          loading: "signu up...",
          success: "admin created successful",
          error: (err) => err.response.data?.message || err.response.data,
        }
      );
      console.log("Admin signup data:", res.data);
      localStorage.setItem("adminData", JSON.stringify(res.data.data));

      navigate("/admin-dashboard");
      // Redirect or show success UI as needed
    } catch (err) {
      if (err.response.data?.message || err.response?.data)
        setErrors({
          err: err.response?.data.message || err.response.data,
          submit: "Failed to create admin. Please try again.",
        });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      isOtpValid &&
      formData.email &&
      formData.name &&
      formData.adminSecret &&
      formData.password
    ) {
      handleSubmit();
    }
  }, [isOtpValid]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section (hidden on small screens) */}
          <div className="relative hidden md:block">
            <img
              src="/adminPicture.jpg"
              alt="Admin onboarding"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white p-6">
                <h2 className="text-3xl font-bold mb-4">FASCO Admin</h2>
                <p className="text-lg">Create your admin account</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 lg:p-12">
            <p className="text-xl font-semibold text-gray-800 text-center my-5">
              This page is only for Admins
            </p>
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">FASCO</h1>
                <p className="text-gray-600">Admin Sign Up</p>
              </div>

              <form className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-2.5 border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="Clinton"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
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
                      placeholder="ClintonAdmin@fasco.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
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
                      placeholder="Choose a secure password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Admin Secret */}
                <div className=" flex flex-wrap items-center justify-center md:grid grid-cols-1 md:grid-cols-2 gap-2 mx-auto max-w-2xl w-full p-2">
                  <div>
                    <label
                      htmlFor="adminSecret"
                      className="text-lg font-medium md:text-black  text-gray-700 mb-2 px-2 w-full md:w-24 "
                    >
                      System Secret Code
                    </label>
                  </div>
                  <div className="">
                    <OtpInput
                      value={formData.adminSecret}
                      onChange={handleOtpInput}
                      numInputs={4}
                      inputType="tel"
                      shouldAutoFocus
                      renderSeparator={<span> - </span>}
                      inputStyle={{
                        width: "2rem",
                      }}
                      renderInput={(props) => (
                        <input
                          {...props}
                          className=" w-25 h-8 p-1 mx-2 shadow-sm focus:shadow-teal-100 focus:shadow-md text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                      )}
                    />

                    {errors.adminSecret && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.adminSecret}
                      </p>
                    )}

                    {otpError.err && (
                      <p className="mt-1 text-sm text-center text-red-500">
                        {otpError.err}
                      </p>
                    )}
                    {otpError.message && (
                      <p className="mt-1 text-base text-center text-green-300">
                        {otpError.message}
                      </p>
                    )}
                  </div>
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border  border-red-200 text-red-600 rounded-lg p-3 text-sm">
                    {errors.submit}
                  </div>
                )}

                {/* <button
                  disabled={isLoading}
                  className="w-full flex bg-gray-300 justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isOtpValid ? "Creating account..." : "Create Admin Account"}
                </button> */}

                <div className="flex items-center justify-between">
                  <Link
                    to="/admin-login"
                    className="text-sm text-[#5B86E5] hover:underline"
                  >
                    Back to login
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Return
                </button>

                {/* alert */}
                {otpError.err && (
                  <p
                    role="alert"
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm text-sm font-medium"
                  >
                    <span className="font-semibold"> ⚠️ Alert:</span> Any
                    attempt to access this account will automatically prevent
                    you from using this website.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
