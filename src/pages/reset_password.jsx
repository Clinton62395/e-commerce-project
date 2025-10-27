import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../services/constant";

export const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const navigate = useNavigate();
  const validateForm = () => {
    const { newPassword, confirmPassword } = formData;
    const newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = "Password is required";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // get token from URL query params
  const [search] = useSearchParams();
  useEffect(() => {
    const token = search.get("token");
    if (token) {
      setToken(token);
    }
  }, [search]);

  console.log("Reset token from URL frontend:", token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      newPassword: formData.newPassword,
      token,
    };
    console.log("Reset token from URL in the form to backend:", token);
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const res = await toast.promise(api.post("/auth/newPassword", data), {
          loading: "Resetting password...",
          success: "Password reset successful!",
          error: (err) =>
            err.response?.data ||
            err.response.data?.message ||
            "Failed to reset password. Please try again.",
        });
        setFormData({ newPassword: "", confirmPassword: "" });
        setIsPasswordReset(true);

        console.log("Password reset successful", res.data);
      } catch (error) {
        setErrors({ submit: "Failed to reset password. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center p-4 md:p-10">
      {!isPasswordReset && (
        <div className="flex flex-col md:flex-row p-5 rounded-lg shadow-lg border border-gray-200 justify-center items-center max-w-4xl w-full bg-white">
          <div className="group flex justify-center items-center p-4 md:p-10 w-full md:w-1/3">
            <img
              src="/logo-shoping.png"
              alt="FASCO logo"
              className="group-hover:shadow-md transition-all duration-200 hover:scale-105 hover:rounded-md max-w-[200px]"
            />
          </div>
          <div className="text-center w-full md:w-1/2 px-4 md:px-8">
            <h1 className="text-3xl font-bold mb-6">FASCO</h1>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Reset Your Password
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="relative">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 block text-left mb-1"
                >
                  New Password
                </label>
                <div>
                  <input
                    id="password"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="outline-none w-full border-b-2 border-gray-300 py-2 pr-10 focus:border-[#6C9BF8] transition-colors"
                    placeholder="Enter your new password"
                  />
                  {errors.newPassword && (
                    <p className="text-sm text-red-500 font-semibold">
                      {errors.newPassword}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700 block text-left mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="outline-none w-full border-b-2 border-gray-300 py-2 pr-10 focus:border-[#6C9BF8] transition-colors"
                      placeholder="Confirm your new password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500 font-semibold">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {errors.submit && (
                <p className="text-red-500 text-sm" role="alert">
                  {errors.submit}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#000000] hover:bg-[#6C9BF8] text-white py-3 px-4 rounded-md duration-150 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>

              <Link
                to="/login"
                className="text-[#5B86E5] hover:underline text-sm"
              >
                Back to Login
              </Link>
            </form>

            <p className="text-xs text-gray-500 mt-8 text-center">
              <a href="#" className="hover:underline">
                FASCO Terms & Conditions
              </a>
            </p>
          </div>
        </div>
      )}{" "}
      {isPasswordReset && (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Password Reset Successful
          </h2>
          <p className="text-gray-600">
            Your password has been reset successfully. You can now log in with
            your new password.
          </p>

          <Link
            to="/login"
            className="mt-6 bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      )}
    </main>
  );
};
