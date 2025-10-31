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
import { Eye, EyeOff } from "lucide-react";
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required(),
});

export const Login = () => {
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const toggleShoPassword = () => setShowPassword((prev) => !prev);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      if (res) {
        const user = res.user;
        const token = await user.getIdToken();

        sendTokenToBackend(token);
      }
    } catch (err) {
      console.log("error occured when google signing", err);
    }
  };

  const sendTokenToBackend = async (token) => {
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
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onLogin = async (data) => {
    console.log("Login data submitted:", data);

    try {
      const res = await toast.promise(api.post("/auth/login", data), {
        loading: "user login...",
        success: "user logged successfully",
        error: (err) => err.response.data?.message || err.response?.data,
      });

      const { token, data: userData } = res.data;
      localStorage.setItem("token", token);
      navigate("/shop");
      reset();
      console.log("Response from backend:", userData);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <>
      {" "}
      <main className=" bg-gray-50 p-5 md:p-10  gap-4 h-screen ">
        <div className="flex flex-col md:flex-row p-5 rounded-lg shadow-lg border border-gray-200 justify-center items-center ">
          <div className=" group flex justify-center items-center p-4 md:p-10 w-full md:w-1/3">
            <img
              src="Rectangle 19280.png"
              alt="logo"
              className="group-hover:shadow-md transition-all duration-200 hover:scale-105 hover:rounded-md"
            />
          </div>
          <div className=" text-center w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">FASCO</h2>
            <p className="text-gray-500 my-2 lowercase  tracking-wide ">
              Sign In To FASCO
            </p>
            <button
              onClick={signInWithGoogle}
              className="relative outline-none border border-[#5B86E5] rounded-md py-2 w-full md:w-1/2  hover:bg-gray-400 duration-150 transition-all"
            >
              <span>
                <img
                  src="google-logo.png"
                  alt="google"
                  className="absolute  left-2 top-0 h-10 "
                />
              </span>
              Sign In with Google
            </button>

            <div className="flex items-center justify-center my-6">
              <hr className="w-24  border-t border-[#838383]" />
              <span className="mx-2 text-gray-500 lowercase  tracking-widest">
                or
              </span>
              <hr className="w-24 border-t border-[#838383]" />
            </div>
            <form
              className=" flex flex-col gap-4"
              onSubmit={handleSubmit(onLogin)}
            >
              <label htmlFor="email">
                <input
                  type="email"
                  {...register("email")}
                  className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 px-2 md:px-4"
                  placeholder="email"
                />
                <p className="text-xs text-red-500">{errors.email?.message}</p>
              </label>

              <label htmlFor="password" className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 px-2 md:px-4 "
                  placeholder="password"
                />
                <p className="text-xs text-red-500">
                  {errors.password?.message}
                </p>
                <button
                  type="button"
                  onClick={toggleShoPassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </label>

              <div className="flex flex-col space-y-4 w-full max-w-sm mx-auto">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-gray-900"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <PropagateLoader size={10} color="#FF6347" />
                      <span className="text-sm">Signing in...</span>
                    </span>
                  ) : (
                    <span className="text-sm">Sign In</span>
                  )}
                </button>

                <Link
                  to="/register"
                  className="text-center py-3 rounded-lg bg-gray-100 text-blue-500 font-medium hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  Register Now
                </Link>
              </div>

              <Link
                className="text-[#5B86E5] hover:underline text-end"
                to="/forget-password"
              >
                Forget Password?
              </Link>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-end w-3/4 md:mt-24 flex justify-end">
              <a href="#">FASCO Terms & Codnitions</a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};
