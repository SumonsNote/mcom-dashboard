"use client";
import React, { useState } from "react";
import {
  Search,
  Edit2,
  Trash2,
  PlusCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import Image from "next/image";

const initialBrands = [
  {
    id: 1,
    name: "Apple",
    logo: "/api/placeholder/80/80",
    description: "Technology and innovation leader",
    productsCount: 42,
    revenue: [
      { month: "Jan", value: 1200000 },
      { month: "Feb", value: 1350000 },
      { month: "Mar", value: 1500000 },
      { month: "Apr", value: 1650000 },
    ],
    status: "Active",
    growthRate: 12.5,
  },
  {
    id: 2,
    name: "Samsung",
    logo: "/api/placeholder/80/80",
    description: "Global electronics manufacturer",
    productsCount: 65,
    revenue: [
      { month: "Jan", value: 950000 },
      { month: "Feb", value: 1050000 },
      { month: "Mar", value: 1150000 },
      { month: "Apr", value: 1250000 },
    ],
    status: "Active",
    growthRate: 8.3,
  },
  {
    id: 3,
    name: "Nike",
    logo: "/api/placeholder/80/80",
    description: "World-renowned sportswear brand",
    productsCount: 87,
    revenue: [
      { month: "Jan", value: 750000 },
      { month: "Feb", value: 800000 },
      { month: "Mar", value: 850000 },
      { month: "Apr", value: 900000 },
    ],
    status: "Inactive",
    growthRate: -2.1,
  },
];

const BrandsListWithAnalytics = () => {
  const [brands, setBrands] = useState(initialBrands);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedBrand, setExpandedBrand] = useState(null);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <div className="container mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Brands Management
          </h1>
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <PlusCircle className="mr-2" /> Add Brand
          </button>
        </header>

        <div className="bg-white shadow-md rounded-lg">
          {/* Search Bar */}
          <div className="p-4 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Brands List */}
          <div className="divide-y">
            {filteredBrands.map((brand) => (
              <div key={brand.id} className="relative">
                <div className="flex items-center p-4 hover:bg-gray-50 transition">
                  <Image
                    width={80}
                    height={80}
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {brand.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {brand.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${
                            brand.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        `}
                        >
                          {brand.status}
                        </span>
                        <span className="text-gray-600 text-sm">
                          {brand.productsCount} Products
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`flex items-center ${
                        brand.growthRate >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {brand.growthRate >= 0 ? (
                        <TrendingUp size={16} />
                      ) : (
                        <TrendingDown size={16} />
                      )}
                      <span className="ml-1 text-sm font-medium">
                        {Math.abs(brand.growthRate).toFixed(1)}%
                      </span>
                    </div>

                    <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-full">
                      <Edit2 size={20} />
                    </button>
                    <button className="text-red-500 hover:bg-red-50 p-2 rounded-full">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsListWithAnalytics;

const BrandsListSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-10 bg-gray-200 w-64 animate-pulse rounded"></div>
          <div className="h-10 bg-gray-200 w-32 animate-pulse rounded-lg"></div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-4 border-b">
            <div className="h-10 bg-gray-100 w-full animate-pulse rounded-lg"></div>
          </div>

          {/* Brand List Skeleton */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center p-4 border-b">
              {/* Logo Placeholder */}
              <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4 animate-pulse"></div>

              <div className="flex-grow">
                <div className="flex justify-between">
                  <div>
                    {/* Brand Name */}
                    <div className="h-6 bg-gray-200 w-48 mb-2 animate-pulse rounded"></div>
                    {/* Brand Description */}
                    <div className="h-4 bg-gray-100 w-72 animate-pulse rounded"></div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-6 w-24 bg-gray-100 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
