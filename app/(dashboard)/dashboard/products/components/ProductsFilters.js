// Filters.js

import { AiOutlineSearch } from "react-icons/ai";

const ProductsFilters = ({
  searchTerm,
  setSearchTerm,
  brandsFilter,
  setBrandsFilter,
  statusFilter,
  setStatusFilter,
  data,
}) => {
  const brands = Array.from(new Set(data.map((product) => product.brand)));

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative border rounded flex items-center px-3 col-span-2">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 bg-inherit  outline-none dark:text-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AiOutlineSearch className="text-2xl text-gray-400" />
        </div>

        {/* Category Filter */}
        <select
          className="px-4 py-2 border rounded-md bg-inherit focus:outline-none focus:ring-2 capitalize dark:text-gray-400 focus:ring-blue-500"
          value={brandsFilter}
          onChange={(e) => setBrandsFilter(e.target.value)}
        >
          <option value="All">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand} className="capitalize">
              {brand}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          className="px-4 py-2 border rounded-md bg-inherit focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-400"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="true">Used</option>
          <option value="false">New</option>
        </select>
      </div>
    </div>
  );
};

export default ProductsFilters;
