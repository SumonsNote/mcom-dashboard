import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="animate-pulse container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-gray-300 rounded w-1/2"></div>
        <div className="h-10 bg-gray-300 rounded w-20"></div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Image and Thumbnails */}
        <div>
          <div className="border rounded-lg overflow-hidden mb-4 p-2">
            <div className="w-full h-96 bg-gray-300"></div>
          </div>
          <div className="flex space-x-2">
            {[1, 2].map((_, index) => (
              <div
                key={index}
                className="w-16 h-16 bg-gray-300 rounded-lg"
              ></div>
            ))}
          </div>

          {/* Product Status */}
          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div
                key={index}
                className="h-4 bg-gray-300 rounded w-full mb-2"
              ></div>
            ))}
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div>
          {/* Price and Condition */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-6 bg-gray-300 rounded w-24"></div>
              </div>
              <div className="h-8 bg-gray-300 rounded w-20"></div>
            </div>

            {/* Details Grid */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-5 bg-gray-300 rounded w-full"></div>
                  </div>
                ))}
              </div>

              {/* Additional Details */}
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-5 bg-gray-300 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Used Product Details */}
          <div className="bg-gray-50 shadow rounded-lg p-6">
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-5 bg-gray-300 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
