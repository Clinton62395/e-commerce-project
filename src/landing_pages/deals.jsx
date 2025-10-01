import { ScanLine } from "lucide-react";
import React from "react";

export const Deals = () => {
  return (
    <>
      {" "}
      <main className="bg-white mt-10  ">
        <div className="flex flex-col items-center gap-4 mb-10">
          <h2>Deals Of The Month</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
            sollicitudin{" "}
          </p>

          <button className="bg-black flex gap-3 text-white px-10 py-2 rounded-lg hover:bg-gray-800 font-medium">
            <ScanLine size={20} /> Buy Now
          </button>
          <h3>Hurry, Before It’s Too Late!</h3>
        </div>

        <div className=" grid grid-cols-3 gap-4 mx-auto max-w-6xl">
          <div className="bg-gray-100 rounded-t-lg flex items-end"></div>
        </div>
      </main>
    </>
  );
};
