import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchData, setSearchData] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchData.trim()) return ;
    navigate(`/browse?keyword=${searchData}`)
  };
  return (
   <div className="flex justify-center px-4 mt-6">
  <form
    onSubmit={handleSearch}
    className="flex flex-col md:flex-row w-full max-w-2xl gap-3"
  >
    <input
      type="search"
      placeholder="Search jobs (e.g. Frontend Developer)"
      value={searchData}
      onChange={(e) => setSearchData(e.target.value)}
      className="w-full rounded-lg px-4 py-3 border-2 border-purple-500 outline-none"
    />

    <button
      type="submit"
      className="px-6 py-3 border-2 border-purple-500 rounded-lg hover:bg-purple-500 hover:text-white transition cursor-pointer"
    >
      Search
    </button>
  </form>
</div>

  );
};

export default SearchBar;
