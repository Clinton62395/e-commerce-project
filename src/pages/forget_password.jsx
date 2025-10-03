import React from "react";
import { Link } from "react-router-dom";

export const ForgetPassword = () => {
  return (
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
          <p className="text-black font-bold text-start my-2 text-2xl lowercase  tracking-wide ">
            Forget Password
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-4">
            <label htmlFor="first name">
              <input
                type="text"
                className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 "
                placeholder="First Name"
              />
            </label>
            <label htmlFor="last name">
              <input
                type="text"
                className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 "
                placeholder="Last Name"
              />
            </label>
            <label htmlFor="number">
              <input
                type="number"
                className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 "
                placeholder="phone number"
              />
            </label>
            <label htmlFor="email">
              <input
                type="email"
                className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 "
                placeholder="email"
              />
            </label>

            <div className="flex col-span-2 flex-col space-y-2 justify-center items-center">
              <button
                type="submit"
                className=" bg-[#000000] hover:bg-[#6C9BF8] text-white py-2 w-full md:w-1/2 rounded-md duration-150 transition-all"
              >
                Send Confirmation Code
              </button>
              <Link
                to="/login"
                className="flex gap-2 bg-gray-100 text-[#5B86E5] "
              >
                <span className="text-black"> Already have an account? </span>
                login
              </Link>
            </div>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-end w-3/4 md:mt-24 flex justify-end">
            <a href="#">FASCO Terms & Codnitions</a>
          </p>
        </div>
      </div>
    </main>
  );
};

export const ConfirmationPassword = () => {
  return <div>forget_password</div>;
};
