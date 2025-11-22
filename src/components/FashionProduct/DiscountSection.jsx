export const DiscountDeals = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* ... même en-tête ... */}

      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 text-center border border-orange-100">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Tag className="text-orange-500" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Big Sale Coming Soon!
        </h2>
        <p className="text-gray-600 mb-4">
          We're preparing an exclusive flash sale with discounts up to 50% off.
        </p>
        <div className="flex justify-center gap-2 mb-6">
          <div className="bg-white px-3 py-2 rounded-lg shadow-sm">
            <span className="font-bold text-lg">03</span>
            <span className="text-xs text-gray-500 block">Days</span>
          </div>
          <div className="bg-white px-3 py-2 rounded-lg shadow-sm">
            <span className="font-bold text-lg">12</span>
            <span className="text-xs text-gray-500 block">Hours</span>
          </div>
        </div>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
          Notify Me
        </button>
      </div>
    </div>
  );
};
