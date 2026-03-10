const BrowseSearchBar = ({
  filters,
  setFilters,
  inputValues,
  setInputValues,
}) => {
  const handleKeywordChange = (e) => {
    setInputValues((prev) => ({ ...prev, keyword: e.target.value }));
  };

  const handleLocationChange = (e) => {
    setInputValues((prev) => ({ ...prev, location: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      keyword: inputValues.keyword,
      location: inputValues.location,
      page: 1,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto bg-white mb-6">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={inputValues.keyword} 
          onChange={handleKeywordChange}
          placeholder="Search jobs (e.g. React Developer)"
          className="flex-1 border border-purple-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          value={inputValues.location} 
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
