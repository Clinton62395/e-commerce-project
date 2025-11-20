import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { api } from "../../services/constant";
import toast from "react-hot-toast";

export const AdminSignUp = () => {
  const [masqueOtp, setMasqueOpt] = useState(true);
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

  // Utiliser useRef pour éviter les soumissions multiples
  const isSubmitting = useRef(false);

  const toggleSwich = () => {
    setMasqueOpt((prev) => !prev);
    setTimeout(() => {
      setMasqueOpt(true);
    }, 200);
  };

  // Validation du formulaire
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Vérification OTP
  useEffect(() => {
    const getOtp = async () => {
      // Ne vérifier que si exactement 4 chiffres
      if (formData.adminSecret.length !== 4) {
        return;
      }

      // Valider les autres champs avant de vérifier l'OTP
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      setOtpError({});

      try {
        const res = await api.post("/admin/otp-secret", {
          adminSecret: formData.adminSecret,
        });

        console.log("OTP feedback ==>", res.data);

        if (res.data) {
          const { isValiCode, success, message } = res.data;
          if (isValiCode === true && success === true) {
            setIsOtpValid(true);
            setOtpError({ message: message });
            // Ne pas réinitialiser l'OTP ici pour permettre la soumission
          } else {
            setIsOtpValid(false);
            setOtpError({ err: "Invalid OTP code" });
          }
        }
      } catch (err) {
        console.log("Error occurred when fetching OTP", err);
        setIsOtpValid(false);

        if (err.response?.data?.message || err.response?.data) {
          setOtpError({
            err: err.response.data?.message || err.response?.data,
          });

          // Réinitialiser l'OTP après un délai
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Réinitialiser l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Réinitialiser l'état OTP si on modifie d'autres champs
    if (name !== "adminSecret") {
      setIsOtpValid(false);
      setOtpError({});
    }
  };

  const handleOtpInput = (value) => {
    setFormData((prev) => ({ ...prev, adminSecret: value }));

    // Réinitialiser les états OTP
    setIsOtpValid(false);
    setOtpError({});

    if (errors.adminSecret) {
      setErrors((prev) => ({ ...prev, adminSecret: "" }));
    }
  };

  const handleSubmit = async () => {
    // Vérifier si une soumission est déjà en cours
    if (isSubmitting.current) {
      return;
    }

    // Valider le formulaire complet
    if (!validateForm()) {
      return;
    }

    // Vérifier que l'OTP est valide
    if (!isOtpValid) {
      setErrors((prev) => ({
        ...prev,
        adminSecret: "Please enter a valid OTP code",
      }));
      return;
    }

    isSubmitting.current = true;
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
          loading: "Signing up...",
          success: "Admin created successfully!",
          error: (err) =>
            err.response?.data?.message ||
            err.response?.data ||
            "An error occurred",
        }
      );

      console.log("Admin signup data:", res.data);
      localStorage.setItem("adminData", JSON.stringify(res.data.data));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      // Réinitialiser le formulaire
      setFormData({
        name: "",
        email: "",
        password: "",
        adminSecret: "",
      });

      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response?.data?.message || err.response?.data) {
        setErrors({
          submit:
            err.response?.data?.message ||
            err.response?.data ||
            "Failed to create admin. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
      isSubmitting.current = false;
    }
  };

  // Effet pour la soumission automatique
  useEffect(() => {
    const autoSubmit = async () => {
      // Vérifier toutes les conditions
      if (
        isOtpValid &&
        formData.email &&
        formData.name &&
        formData.password &&
        formData.adminSecret &&
        !isSubmitting.current
      ) {
        await handleSubmit();
      }
    };

    autoSubmit();
  }, [isOtpValid]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative hidden md:block">
            <img
              src="/adminPicture.jpg"
              alt="Admin onboarding"
              className="h-full w-full object-cover rounded-l-2xl"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-l-2xl">
              <div className="text-center text-white p-6">
                <h2 className="text-3xl font-bold mb-4">FASCO Admin</h2>
                <p className="text-lg">Create your admin account</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 lg:p-10">
            {/* Alert */}
            {otpError.err && (
              <div
                role="alert"
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm text-sm font-medium mb-4"
              >
                <span className="font-semibold">⚠️ Alert:</span> {otpError.err}
              </div>
            )}

            <p className="text-xl font-semibold text-gray-800 text-center my-5">
              This page is only for Admins
            </p>

            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">FASCO</h1>
                <p className="text-gray-600">Admin Sign Up</p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
                <div className="otp relative flex flex-col items-center justify-center mx-auto max-w-2xl w-full p-2">
                  <div>
                    <label
                      htmlFor="adminSecret"
                      className="text-lg font-medium text-gray-700 mb-2 px-2"
                    >
                      System Secret Code
                    </label>
                  </div>
                  <div className="relative">
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
                      renderInput={(props, index) => {
                        const maskValue = masqueOtp
                          ? "*"
                          : formData.adminSecret[index];
                        return (
                          <input
                            {...props}
                            value={maskValue || ""}
                            className="w-12 h-10 p-1 mx-2 ring-offset-1 ring-0 shadow-sm focus:shadow-teal-100 focus:shadow-md text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          />
                        );
                      }}
                    />
                    <button
                      type="button"
                      onClick={toggleSwich}
                      className="absolute w-10 h-10 p-1 border items-center justify-center flex rounded-md top-0 ring-1 outline-fuchsia-200 ring-offset-1 -left-12"
                      aria-label={masqueOtp ? "Hide otp" : "Show otp"}
                    >
                      {masqueOtp ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>

                    {errors.adminSecret && (
                      <p className="mt-1 text-sm text-red-500 text-center">
                        {errors.adminSecret}
                      </p>
                    )}

                    {otpError.err && (
                      <p className="mt-1 text-sm text-center text-red-500">
                        {otpError.err}
                      </p>
                    )}
                    {otpError.message && (
                      <p className="mt-1 text-base text-center text-green-500">
                        ✓ {otpError.message}
                      </p>
                    )}
                  </div>
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
                    {errors.submit}
                  </div>
                )}

                <div className="pt-2">
                  <Link
                    to="/admin-login"
                    className="text-sm text-[#5B86E5] hover:underline"
                  >
                    Back to Login
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
