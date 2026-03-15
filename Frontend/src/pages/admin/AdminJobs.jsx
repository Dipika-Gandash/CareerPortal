import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdminJobCard from "@/components/layout/AdminJobCard";
import AdminJobSearchBar from "@/components/layout/AdminJobSearchBar";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
import api from "@/api/axios";

const AdminJobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    companyName: searchParams.get("companyName") || "",
    location: searchParams.get("location") || "",
    status: searchParams.get("status") || "",
    sortBy: searchParams.get("sortBy") || "newest",
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);
    return () => clearTimeout(t);
  }, [filters]);

  useEffect(() => {
    const params = {};
    if (debouncedFilters.keyword) params.keyword = debouncedFilters.keyword;
    if (debouncedFilters.companyName) params.companyName = debouncedFilters.companyName;
    if (debouncedFilters.location) params.location = debouncedFilters.location;
    if (debouncedFilters.status) params.status = debouncedFilters.status;
    if (debouncedFilters.sortBy !== "newest") params.sortBy = debouncedFilters.sortBy;
    setSearchParams(params);
  }, [debouncedFilters]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (debouncedFilters.keyword) params.append("keyword", debouncedFilters.keyword);
        if (debouncedFilters.companyName) params.append("companyName", debouncedFilters.companyName);
        if (debouncedFilters.location) params.append("location", debouncedFilters.location);
        if (debouncedFilters.status) params.append("status", debouncedFilters.status);
        params.append("sortBy", debouncedFilters.sortBy);

        const res = await api.get(`/api/v1/admin/jobs?${params.toString()}`);
        setJobs(res.data.jobs);
        setTotalJobs(res.data.totalJobs);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [debouncedFilters]);

  const handleDelete = async (jobId) => {
    if (deleting) return;
    setDeleting(true);
    try {
      await api.delete(`/api/v1/admin/jobs/${jobId}`);
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
      setTotalJobs((prev) => prev - 1);
      toast.success("Job deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete job");
    } finally {
      setDeleting(false);
    }
  };

  const handleClear = () => {
    setFilters({
      keyword: "",
      companyName: "",
      location: "",
      status: "",
      sortBy: "newest",
    });
  };

  const hasFilters =
    filters.keyword ||
    filters.companyName ||
    filters.location ||
    filters.status ||
    filters.sortBy !== "newest";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-purple-700">All Jobs</h1>
          <span className="bg-purple-100 text-purple-700 font-semibold px-4 py-1 rounded-full text-sm">
            Total: {totalJobs}
          </span>
        </div>

        <AdminJobSearchBar
          filters={filters}
          setFilters={setFilters}
          onClear={handleClear}
          hasFilters={hasFilters}
        />

        {loading ? (
          <Loader />
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <AdminJobCard
                key={job._id}
                job={job}
                onDelete={handleDelete}
                deleting={deleting}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminJobs;