// Filters.js

import { AiOutlineSearch } from "react-icons/ai";

const Filters = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative border rounded flex items-center px-3">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 bg-inherit  outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AiOutlineSearch className="text-2xl text-gray-400" />
        </div>

        {/* Category Filter */}
        <select
          className="px-4 py-2 border rounded-md bg-inherit focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Sports">Sports</option>
          <option value="Home">Home</option>
          <option value="Fashion">Fashion</option>
        </select>

        {/* Status Filter */}
        <select
          className="px-4 py-2 border rounded-md bg-inherit focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">In Active</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
