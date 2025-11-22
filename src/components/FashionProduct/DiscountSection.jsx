import { Percent } from "lucide-react";
import { Link } from "react-router-dom";
import { CountdownTimer } from "../slides-components/slide_pagination";

export const DiscountDeals = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* ... même en-tête ... */}

      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 text-center border border-orange-100">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Percent className="text-orange-500" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Big Sale Coming Soon!
        </h2>
        <p className="text-gray-600 mb-4">
          We're preparing an exclusive flash sale with discounts up to 50% off.
        </p>
        <div className="flex justify-center gap-3 mb-6">
          <div className="flex justify-center mb-6">
            <CountdownTimer
              endDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
            >
              {({ days, hours, minutes, seconds, completed }) =>
                completed ? (
                  <div className="bg-gray-400 text-white px-6 py-3 rounded-lg">
                    <p className="font-semibold">Sale Completed</p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg px-6 py-4 shadow-lg animate-pulse">
                    <div className="flex items-center gap-2 mb-2 justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                      <p className="font-bold text-sm uppercase tracking-wider">
                        Flash Sale Ends In
                      </p>
                      <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                    </div>
                    <div className="flex gap-4 items-center justify-center text-center">
                      <div>
                        <div className="text-2xl font-bold bg-white text-red-500 rounded px-2 py-1 min-w-12">
                          {String(days).padStart(2, "0")}
                        </div>
                        <div className="text-xs mt-1 opacity-90">DAYS</div>
                      </div>
                      <div className="text-xl font-bold">:</div>
                      <div>
                        <div className="text-2xl font-bold bg-white text-red-500 rounded px-2 py-1 min-w-12">
                          {String(hours).padStart(2, "0")}
                        </div>
                        <div className="text-xs mt-1 opacity-90">HOURS</div>
                      </div>
                      <div className="text-xl font-bold">:</div>
                      <div>
                        <div className="text-2xl font-bold bg-white text-red-500 rounded px-2 py-1 min-w-12">
                          {String(minutes).padStart(2, "0")}
                        </div>
                        <div className="text-xs mt-1 opacity-90">MINS</div>
                      </div>
                      <div className="text-xl font-bold">:</div>
                      <div>
                        <div className="text-2xl font-bold bg-white text-red-500 rounded px-2 py-1 min-w-12">
                          {String(seconds).padStart(2, "0")}
                        </div>
                        <div className="text-xs mt-1 opacity-90">SECS</div>
                      </div>
                    </div>
                  </div>
                )
              }
            </CountdownTimer>
          </div>
        </div>
        <Link
          to="/shop"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Go to the shopping
        </Link>
      </div>
    </div>
  );
};
