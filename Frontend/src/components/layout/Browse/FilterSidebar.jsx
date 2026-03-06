import React from "react";

const FilterSidebar = ({ filters, setFilters }) => {

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      page: 1, 
    }));
  };

  const clearFilters = () => {
    setFilters((prev) => ({
      ...prev,
      jobType: "",
      workMode: "",
      experienceLevel: "",
      page: 1,
    }));
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 sticky top-20">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>

      <div className="mb-6">
        <h3 className="font-medium mb-3 text-gray-700">Job Type</h3>
        {["Full-Time", "Part-Time", "Internship", "Contract"].map((type) => (
          <label key={type} className="flex items-center mb-2 cursor-pointer">
            <input
              type="radio"
              name="jobType"
              value={type}
              checked={filters.jobType === type}
              onChange={() => handleChange("jobType", type)}
              className="mr-2 accent-purple-600"
            />
            <span className="text-sm">{type}</span>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3 text-gray-700">Work Mode</h3>
        {["Onsite", "Remote", "Hybrid"].map((mode) => (
          <label key={mode} className="flex items-center mb-2 cursor-pointer">
            <input
              type="radio"
              name="workMode"
              value={mode}
              checked={filters.workMode === mode}
              onChange={() => handleChange("workMode", mode)}
              className="mr-2 accent-purple-600"
            />
            <span className="text-sm">{mode}</span>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3 text-gray-700">Experience Level</h3>
        {["Fresher", "Junior", "Mid", "Senior"].map((level) => (
          <label key={level} className="flex items-center mb-2 cursor-pointer">
            <input
              type="radio"
              name="experienceLevel"
              value={level}
              checked={filters.experienceLevel === level}
              onChange={() => handleChange("experienceLevel", level)}
              className="mr-2 accent-purple-600"
            />
            <span className="text-sm">{level}</span>
          </label>
        ))}
      </div>

      <button
        onClick={clearFilters}
        className="w-full mt-4 bg-gray-200 hover:bg-gray-300 transition py-2 rounded-lg text-sm font-medium"
      >
        Clear Filters
      </button>

    </div>
  );
};

export default FilterSidebar;