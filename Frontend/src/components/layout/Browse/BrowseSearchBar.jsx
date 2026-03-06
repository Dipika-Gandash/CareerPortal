import api from "@/api/axios";
import React from "react";
import toast from "react-hot-toast";

const BrowseSearchBar = ({ filters , setFilters }) => {
 const handleKeywordChange = (e) => {
  setFilters((prev) => ({
    ...prev,
    keyword: e.target.value,
    page: 1, 
  }));
};

const handleLocationChange = (e) => {
  setFilters((prev) => ({
    ...prev,
    location: e.target.value,
    page: 1,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
}


  return (
    <div className="max-w-5xl mx-auto bg-white mb-6">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={filters.keyword}
          onChange={handleKeywordChange}
          placeholder="Search jobs (e.g. React Developer)"
          className="flex-1 border border-purple-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
        />
         <input
          type="text"
          value={filters.location}
          onChange={handleLocationChange}
          placeholder="Location (e.g. Delhi)"
          className="flex-1 border border-purple-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
        />
         <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default BrowseSearchBar;
