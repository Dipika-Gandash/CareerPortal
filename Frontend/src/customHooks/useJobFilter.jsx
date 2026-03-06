import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "@/api/axios";
import toast from "react-hot-toast";

const useJobFilter = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: "",
    workMode: "",
    experienceLevel: "",
    page: 1,
    limit: 10,
  });
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newFilters = {
      keyword: searchParams.get("keyword") || "",
      location: searchParams.get("location") || "",
      jobType: searchParams.get("jobType") || "",
      workMode: searchParams.get("workMode") || "",
      experienceLevel: searchParams.get("experienceLevel") || "",
      page: Number(searchParams.get("page")) || 1,
limit: Number(searchParams.get("limit")) || 10,
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            params.append(key, value);
          }
        });

        const res = await api.get(`/api/v1/job/allJobs?${params.toString()}`);

        setJobs(res.data.jobs);
        setTotalJobs(res.data.totalJobs);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    fetchJobs();

    setSearchParams(filters);
  }, [filters]); 

  return {
    filters,
    setFilters,
    jobs,
    totalJobs,
    totalPages,
  };
};

export default useJobFilter;
