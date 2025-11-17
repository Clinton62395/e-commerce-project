import { useProductsByCategory } from "../../api/Product.API";

export const WomenAccessories = () => {
  const {
    data: womenAccessories = [],
    isLoading,
    isError,
  } = useProductsByCategory("womenAccessories");
  console.log("filter product men", womenAccessories);

  if (isLoading) {
    return (
      <div className="bg-black/90 flex items-center justify-center min-h-[24vh] overflow-hidden">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-200"></div>
      </div>
    );
  }

  if (isError) {
    return <div>error occurred when fetching products : {isError.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Women's Accessories</h1>
      <p>
        Explore a wide range of women's accessories, from stylish handbags to
        elegant jewelry that complements your outfit.
      </p>
    </div>
  );
};
