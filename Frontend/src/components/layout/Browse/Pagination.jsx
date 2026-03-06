import React from "react";

const Pagination = ({ filters, setFilters, totalPages }) => {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };
  return (
    <div className="flex gap-2">
      <button
        onClick={() => handlePageChange(filters.page - 1)}
        disabled={filters.page === 1}
        className="px-3 py-1 border rounded hover:bg-purple-500 hover:text-white disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 border rounded ${
            page === filters.page
              ? "bg-purple-600 text-white"
              : "hover:bg-purple-500 hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(filters.page + 1)}
        disabled={filters.page === totalPages}
        className="px-3 py-1 border rounded hover:bg-purple-500 hover:text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
