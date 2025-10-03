import React from "react";

export const Register = () => {
  return (
    <form className=" bg-gray-50 flex flex-col md:flex-row mx-auto p-5 md:p-10  gap-2 rounded-lg shadow-lg">
      <div className="group flex  justify-center items-center p-2 md:p-10 w-full  md:w-1/2">
        <img src="Rectangle 19280 (1).png" alt="logo" className="group-hover:shadow-md hover:rounded-md duration transition-all hover:scale-105" />
      </div>

      <div className="flex flex-1 flex-col justify-center items-center   ">
        <h2 className="text-3xl font-bold mb-6">FASCO</h2>

        <p className="text-gray-500 my-2 lowercase  tracking-wide ">
          Create Account
        </p>
        <button className="relative outline-none border border-[#5B86E5] rounded-md py-2 w-full md:w-1/2 hover:bg-gray-400 duration-150 transition-all">
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

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-2  w-full">
          <label htmlFor="firstName">
            <input
              type="text"
              className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 "
              placeholder="First Name"
            />
          </label>
          <label htmlFor="lastName">
            <input
              type="text"
              className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 "
              placeholder=" Last Name"
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 "
              placeholder="Email Address"
            />
          </label>
          <label htmlFor="phone">
            <input
              type="number"
              className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 "
              placeholder=" Phone number"
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 "
              placeholder=" Password"
            />
          </label>
          <label htmlFor="confirmPassword">
            <input
              type="password"
              className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 "
              placeholder="Confirm  Password"
            />
          </label>
          <div className="flex  items-center flex-col col-span-1 md:col-span-2">
            <button className="bg-black text-white px-10 py-2 rounded-lg hover:bg-gray-800 font-medium w-1/2 mx-auto mt-4">
              SIGN UP
            </button>
            <p className="text-center mt-4 flex gap-2">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500">
                Log in
              </a>
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-4 text-end w-3/4 ">
          <a href="#">FASCO Terms & Conditions</a>
        </div>
      </div>
    </form>
  );
};
