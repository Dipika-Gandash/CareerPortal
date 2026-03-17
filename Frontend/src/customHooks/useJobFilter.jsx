import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import toast from "react-hot-toast";

const useJobFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const filters = {
    keyword: searchParams.get("keyword") || "",
    location: searchParams.get("location") || "",
    jobType: searchParams.get("jobType") || "",
    workMode: searchParams.get("workMode") || "",
    experienceLevel: searchParams.get("experienceLevel") || "",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
  };

  const [inputValues, setInputValues] = useState({
    keyword: filters.keyword,
    location: filters.location,
  });

  const setFilters = (updaterFn) => {
    const updated =
      typeof updaterFn === "function" ? updaterFn(filters) : updaterFn;
    const newParams = new URLSearchParams();
    Object.entries(updated).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });
    setSearchParams(newParams);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        keyword: inputValues.keyword,
        location: inputValues.location,
        page: 1,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValues]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });

        const res = await api.get(`/api/v1/job/allJobs?${params.toString()}`);
        setJobs(res.data.jobs);
        setTotalJobs(res.data.totalJobs);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams]);

  return {
    filters,
    setFilters,
    jobs,
    totalJobs,
    totalPages,
    inputValues,
    setInputValues,
    loading,
  };
};

export default useJobFilter;
