import React from "react";
import BrowseSearchBar from "@/components/layout/Browse/BrowseSearchBar";
import FilterSidebar from "@/components/layout/Browse/FilterSidebar";
import Pagination from "@/components/layout/Browse/Pagination";
import JobCard from "@/components/layout/JobCard";
import useJobFilter from "@/customHooks/useJobFilter";

const Browse = () => {
  const { filters, setFilters, jobs, totalPages, inputValues, setInputValues } = useJobFilter();

  return (
    <div className="min-h-screen">
      <div className="px-6 py-6 border-b">
       <BrowseSearchBar 
  filters={filters} 
  setFilters={setFilters}
  inputValues={inputValues}
  setInputValues={setInputValues}
/>
      </div>

      <div className="flex px-6 gap-8 mt-6">
        <div className="hidden md:block w-72">
          <div className="sticky top-8 left-8">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Pagination filters={filters} setFilters={setFilters} totalPages={totalPages}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
