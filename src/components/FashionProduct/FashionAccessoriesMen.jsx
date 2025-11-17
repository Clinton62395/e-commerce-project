import { useProductsByCategory } from "../../api/Product.API";

export const MenAccessories = () => {
  const {
    data: menAccessories = [],
    isLoading,
    isError,
  } = useProductsByCategory("menAccessories");
  console.log("filter product men", menAccessories);

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
      <h1 className="text-2xl font-bold">Men's Accessories</h1>
      <p>
        Discover a variety of men's accessories, from stylish watches to trendy
        bags that enhance your personal style.
      </p>
    </div>
  );
};
