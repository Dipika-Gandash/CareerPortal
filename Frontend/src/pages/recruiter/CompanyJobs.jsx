import React, { useEffect, useState } from "react";
import JobCard from "@/components/layout/JobCard";
import toast from "react-hot-toast";
import api from "@/api/axios";
import { useParams } from "react-router-dom";
import JobCardSkeleton from "@/components/common/JobCardSkeleton";

const CompanyJobs = () => {
  const [companyJobs, setCompanyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { companyId } = useParams();

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      try {
        const res = await api.get(`/api/v1/company/${companyId}/jobs`);
        setCompanyJobs(res?.data?.companyJobs || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyJobs();
  }, [companyId]);

  return (
    <div className="max-w-6xl mx-auto mt-14 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Company Jobs
          </h1>
          <span className="text-gray-500 text-sm">
            {companyJobs.length} Jobs Available
          </span>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : companyJobs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-700 text-lg font-medium">
              No Jobs Posted Yet
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Start by posting a new job for this company.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyJobs;
