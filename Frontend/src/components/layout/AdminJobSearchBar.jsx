import React from "react";

const AdminJobSearchBar = ({ filters, setFilters, onClear, hasFilters }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow p-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <input
          type="text"
          placeholder="Search by job title..."
          value={filters.keyword}
          onChange={(e) => setFilters((prev) => ({ ...prev, keyword: e.target.value }))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          placeholder="Search by company..."
          value={filters.companyName}
          onChange={(e) => setFilters((prev) => ({ ...prev, companyName: e.target.value }))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          placeholder="Search by location..."
          value={filters.location}
          onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.status}
          onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All Status</option>
          <option value="Open">Active</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

        {hasFilters && (
          <button
            onClick={onClear}
            className="text-sm text-purple-600 hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        )}
      </div>

    </div>
  );
};

export default AdminJobSearchBar;