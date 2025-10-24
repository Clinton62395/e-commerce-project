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
    try {
      const res = await signInWithPopup(auth, provider);
      if (res) {
        const user = res.user;
        console.log("user from google", user);
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
    } catch (error) {
      console.error("error sending token:", error);
    }
  };
  const onSubmit = async (data) => {
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
      const { token, data: userData } = res.data;
      console.log("data sent to te backend from register ==>", userData);

      localStorage.setItem("token", token);
      navigate("/shop");
      reset();
    } catch (err) {
      console.error("error occured when registering", err);
    }
  };

  return (
    <div className=" bg-gray-50 flex flex-col md:flex-row mx-auto p-5 md:p-10  gap-2 rounded-lg shadow-lg">
      <div className="group flex  justify-center items-center p-2 md:p-10 w-full  md:w-1/2">
        <img
          src="Rectangle 19280 (1).png"
          alt="logo"
          className="group-hover:shadow-md hover:rounded-md duration transition-all hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center items-center   ">
        <h2 className="text-3xl font-bold mb-6">FASCO</h2>

        <p className="text-gray-500 my-2 lowercase  tracking-wide ">
          Create Account
        </p>
        <button
          onClick={signInWithGoogle}
          className="relative outline-none border border-[#5B86E5] rounded-md py-2 w-full md:w-1/2 hover:bg-gray-400 duration-150 transition-all"
        >
          <span>
            <img
              src="google-logo.png"
              alt="google"
              className="absolute  left-2 top-0 h-10 "
            />
          </span>
          Sign Up with Google
        </button>

        <div className="flex items-center my-6">
          <hr className="w-10 border-t border-[#838383]" />
          <span className="mx-2 text-gray-500 lowercase  tracking-widest">
            or
          </span>
          <hr className="w-10 border-t border-[#838383]" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-2  w-full">
            <label htmlFor="firstName">
              <input
                type="text"
                {...register("firstName")}
                className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 px-2 md:px-4"
                placeholder="First Name"
              />
              <p className=" text-xs text-red-500 font-semibold">
                {errors.firstName?.message}
              </p>
            </label>
            <label htmlFor="lastName">
              <input
                type="text"
                {...register("lastName")}
                className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 px-2 md:px-4"
                placeholder=" Last Name"
              />
              <p className=" text-xs text-red-500">
                {errors.lastName?.message}
              </p>
            </label>
            <label htmlFor="email">
              <input
                type="email"
                {...register("email")}
                className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 px-2 md:px-4"
                placeholder="Email Address"
              />
              <p className=" text-xs text-red-500">{errors.email?.message}</p>
            </label>
            <label htmlFor="phoneNumber">
              <input
                type="tel"
                {...register("phoneNumber")}
                className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 px-2 md:px-4"
                placeholder=" Phone number"
              />
              <p className=" text-xs text-red-500 font-semibold">
                {errors.phoneNumber?.message}
              </p>
            </label>
            <label htmlFor="password">
              <input
                type="password"
                {...register("password")}
                className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 px-2 md:px-4"
                placeholder=" Password"
              />
              <p className=" text-xs text-red-500 font-semibold">
                {errors.password?.message}
              </p>
            </label>
            <label htmlFor="confirmPassword">
              <input
                type="password"
                {...register("confirmPassword")}
                className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 px-2 md:px-4"
                placeholder="Confirm  Password"
              />
              <p className=" text-xs text-red-500 font-semibold">
                {errors.confirmPassword?.message}
              </p>
            </label>
            <div className="flex  items-center flex-col col-span-1 md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center gap-2 bg-black text-white py-3 w-full rounded-lg font-semibold transition-all duration-200 ${
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
              <p className="text-center mt-4 flex gap-2">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </form>
        <div className="text-xs text-gray-500 mt-4 text-end w-3/4 ">
          <a href="#">FASCO Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
};
