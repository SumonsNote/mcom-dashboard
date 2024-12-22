"use client";

import Link from "next/link";

import { useFetchProductsQuery } from "@/store/slices/productApi";
import {
  FaBoxesPacking,
  FaChartLine,
  FaDollarSign,
  FaMobile,
} from "react-icons/fa6";
import PhonesTable from "./components/ProductTable";
import ProductsFilters from "./components/ProductsFilters";
import { useState } from "react";

const ProductDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [brandsFilter, setBrandsFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const { data, isLoading, isError, error } = useFetchProductsQuery();

  if (isLoading) return <DashboardSkeleton />;
  const products = data?.products || [];
  const filteredProduct = data?.products.filter((product) => {
    const searchMatch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase());
    const brandMatch = brandsFilter === "All" || product.brand === brandsFilter;
    const statusMatch =
      statusFilter === "All" || product.isUsed == statusFilter;
    return searchMatch && brandMatch && statusMatch;
  });

  const analytics = {
    totalProducts: products.length,
    totalStockProducts: products.reduce(
      (acc, product) => acc + product.stock,
      0
    ),
    totalValue: products.reduce(
      (acc, product) =>
        acc + Number(product.purchase_price) * Number(product.stock),
      0
    ),

    lowStock: products.filter((product) => product.stock < 10).length,
    topSelling:
      [...products]?.sort((a, b) => b.sold_out - a.sold_out)[0]?.name || "N/A",
  };

  return (
    <div className="p-6 space-y-6 w-full">
      <div className="flex justify-between  xs:gap-2 items-center">
        <h1 className="text-3xl xs:text-2xl font-bold dark:text-gray-400">
          Product Dashboard
        </h1>
        <Link
          href="/dashboard/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
        >
          <FaBoxesPacking /> Add Product
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticCard
          title="Total Products"
          value={analytics.totalProducts}
          value2={analytics.totalStockProducts}
          icon={<FaBoxesPacking />}
          color="bg-blue-500"
        />
        <AnalyticCard
          title="Total Value"
          value={`৳${analytics.totalValue.toLocaleString()}`}
          icon={<FaDollarSign />}
          color="bg-green-500"
        />
        <AnalyticCard
          title="Low Stock Items"
          value={analytics.lowStock}
          icon={<FaChartLine />}
          color="bg-yellow-500"
        />
        <AnalyticCard
          title="Top Selling"
          value={analytics.topSelling}
          icon={<FaMobile />}
          color="bg-purple-500"
        />
      </div>
      <ProductsFilters
        data={products}
        brandsFilter={brandsFilter}
        setBrandsFilter={setBrandsFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 w-full">
        {/* <ProductsTable products={products} /> */}
        {filteredProduct.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400 text-xl font-bold">
              No products found.
            </p>
          </div>
        ) : (
          <PhonesTable data={filteredProduct} />
        )}
      </div>
    </div>
  );
};

export default ProductDashboard;

const DashboardSkeleton = () => (
  <div className="p-6 space-y-6 w-full h-full dark:bg-gray-900">
    <div className="flex justify-between items-center">
      <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse" />
      <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
      ))}
    </div>
    <div className="h-[400px] bg-gray-200 rounded-lg animate-pulse" />
  </div>
);

const AnalyticCard = ({ title, value, value2, icon, color }) => (
  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
    <div className="flex items-center space-x-4">
      <div className={`p-4 rounded-full ${color} text-white`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold dark:text-gray-500">
          {value}
          {!value2 == 0 && `(${value2})`}
        </p>
      </div>
    </div>
  </div>
);
