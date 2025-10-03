import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
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
            <button className="relative outline-none border border-[#5B86E5] rounded-md py-2 w-full md:w-1/2  hover:bg-gray-400 duration-150 transition-all">
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
            <form className=" flex flex-col gap-4">
              <label htmlFor="password">
                <input
                  type="password"
                  className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 "
                  placeholder="password"
                />
              </label>
              <label htmlFor="email">
                <input
                  type="email"
                  className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 "
                  placeholder="email"
                />
              </label>

              <div className="flex flex-col space-y-2">
                <button
                  type="submit"
                  className=" bg-[#000000] hover:bg-[#6C9BF8] text-white py-2 rounded-md duration-150 transition-all"
                >
                  sign In
                </button>
                <Link
                  to="/register"
                  className=" bg-gray-100 text-[#5B86E5] hover:text-white py-2 rounded-md hover:bg-[#6C9BF8] duration-150 transition-all"
                >
                  Register now
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
