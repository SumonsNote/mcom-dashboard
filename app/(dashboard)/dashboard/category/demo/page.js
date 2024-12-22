"use client";
import React, { useState } from "react";

const StatCard = ({ title, value, trend, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <div className="flex items-center mt-2">
      <span className={`text-2xl font-bold ${color}`}>{value}</span>
      {trend && (
        <span
          className={`ml-2 ${trend > 0 ? "text-green-500" : "text-red-500"}`}
        >
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </span>
      )}
    </div>
  </div>
);

const CategoryDashboard = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      status: "active",
      items: 245,
      revenue: 125000,
      growth: 12.5,
    },
    {
      id: 2,
      name: "Clothing",
      status: "active",
      items: 189,
      revenue: 89000,
      growth: -5.2,
    },
    {
      id: 3,
      name: "Books",
      status: "inactive",
      items: 432,
      revenue: 45000,
      growth: 8.7,
    },
  ]);

  const [newCategory, setNewCategory] = useState("");

  const totalItems = categories.reduce((sum, cat) => sum + cat.items, 0);
  const totalRevenue = categories.reduce((sum, cat) => sum + cat.revenue, 0);
  const activeCategories = categories.filter(
    (cat) => cat.status === "active"
  ).length;
  const averageGrowth = (
    categories.reduce((sum, cat) => sum + cat.growth, 0) / categories.length
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Category Dashboard
          </h1>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Categories"
              value={categories.length}
              color="text-blue-600"
            />
            <StatCard
              title="Active Categories"
              value={activeCategories}
              color="text-green-600"
            />
            <StatCard
              title="Total Items"
              value={totalItems.toLocaleString()}
              color="text-purple-600"
            />
            <StatCard
              title="Total Revenue"
              value={`$${(totalRevenue / 1000).toFixed(1)}k`}
              trend={Number(averageGrowth)}
              color="text-indigo-600"
            />
          </div>

          {/* Category Management Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Category Management
              </h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category name"
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    if (newCategory.trim()) {
                      setCategories([
                        ...categories,
                        {
                          id: categories.length + 1,
                          name: newCategory,
                          status: "active",
                          items: 0,
                          revenue: 0,
                          growth: 0,
                        },
                      ]);
                      setNewCategory("");
                    }
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Category
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Growth
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        #{category.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            category.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {category.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.items.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${category.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={
                            category.growth > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {category.growth > 0 ? "↑" : "↓"}{" "}
                          {Math.abs(category.growth)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDashboard;

const StatCardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
    <div className="h-4 bg-gray-200 w-1/2 mb-2 rounded"></div>
    <div className="h-8 bg-gray-200 w-3/4 rounded"></div>
  </div>
);

const CategoryDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          {/* Page Title Skeleton */}
          <div className="h-10 bg-gray-200 w-64 mb-4 rounded animate-pulse"></div>

          {/* Statistics Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <StatCardSkeleton key={item} />
            ))}
          </div>

          {/* Category Management Section Skeleton */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 bg-gray-200 w-48 rounded animate-pulse"></div>
              <div className="flex gap-4">
                <div className="h-10 bg-gray-200 w-64 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 w-32 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Table Skeleton */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {[
                      "ID",
                      "Name",
                      "Status",
                      "Items",
                      "Revenue",
                      "Growth",
                      "Actions",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className="h-4 bg-gray-200 w-24 rounded animate-pulse"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((row) => (
                    <tr key={row} className="border-b">
                      {[1, 2, 3, 4, 5, 6, 7].map((cell) => (
                        <td key={cell} className="px-6 py-4 whitespace-nowrap">
                          <div className="h-5 bg-gray-200 w-24 rounded animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
