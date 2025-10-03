import React from "react";

export const ResetPassword = () => {
  return (
    <main className=" bg-gray-50  p-10  gap-4 h-screen ">
      <div className="flex p-5 rounded-lg shadow-lg border border-gray-200justify-center items-center ">
        <div className=" group flex justify-center items-center p-10 w-1/3">
          <img
            src="Rectangle 19280.png"
            alt="logo"
            className="group-hover:shadow-md transition-all duration-200 hover:scale-105 hover:rounded-md"
          />
        </div>
        <div className=" text-center w-1/2">
          <h2 className="text-3xl font-bold mb-6">FASCO</h2>
          <p className="text-gray-500 my-2 lowercase  tracking-wide ">
            Enter Your New Password
          </p>
          <form className=" flex flex-col gap-4">
            <label htmlFor="password">
              <input
                type="password"
                className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 "
                placeholder="New Password"
              />
            </label>
            <label htmlFor="confirmPassword">
              <input
                type="password"
                className=" outline-none w-full border-b-2 border-gray-[#9D9D9D] py-2 "
                placeholder="Confirm New Password"
              />
            </label>
            <button className=" bg-[#5B86E5] text-white py-2 rounded-md hover:bg-[#6C9BF8] duration-150 transition-all">
              Reset Password
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-end w-3/4 md:mt-24 flex justify-end">
            <a href="#">FASCO Terms & Codnitions</a>
          </p>
        </div>
      </div>
    </main>
  );
};
