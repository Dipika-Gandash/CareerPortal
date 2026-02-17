import React, { useEffect, useState } from "react";
import JobCard from "@/components/layout/JobCard";
import toast from "react-hot-toast";
import api from "@/api/axios";
import { useParams } from "react-router-dom";

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
        toast.error(
          error?.response?.data?.message || "Failed to fetch jobs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyJobs();
  }, [companyId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

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

        {companyJobs.length === 0 ? (
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
              <div
                key={job._id}
              >
                <JobCard job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyJobs;
