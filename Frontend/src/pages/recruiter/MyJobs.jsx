import React, { useEffect, useState } from "react";
import JobCard from "@/components/layout/JobCard";
import toast from "react-hot-toast";
import api from "@/api/axios";

const MyJobs = () => {
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);


  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await api.get(`/api/v1/job/my-jobs`);
        setJobsData(res.data?.jobs || []);
        setTotalJobs(res?.data?.totalJobs || 0);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-lg font-semibold text-gray-600">
          Loading your jobs...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12">
      <div className="bg-white shadow-xl rounded-xl p-6">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            My Jobs
          </h1>
          <span className="bg-blue-100 text-blue-600 text-xl px-4 py-1 rounded-full font-medium">
            Total: {totalJobs}
          </span>
        </div>

        {jobsData.length === 0 ? (
          <div className="flex justify-center items-center h-40 border border-dashed rounded-lg">
            <p className="text-gray-500 text-lg">
              No Jobs Posted Yet 🚀
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsData.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
