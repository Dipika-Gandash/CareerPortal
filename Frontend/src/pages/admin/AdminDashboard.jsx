import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
import api from "@/api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentRecruiters, setRecentRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/api/v1/admin/dashboard");
        setStats(res.data.stats);
        setRecentJobs(res.data.recentJobs);
        setRecentRecruiters(res.data.recentRecruiters);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Total Users", value: stats.totalUsers, icon: "👥" },
          {
            label: "Total Recruiters",
            value: stats.totalRecruiters,
            icon: "🧑‍💼",
          },
          { label: "Total Jobs", value: stats.totalJobs, icon: "💼" },
          { label: "Total Companies", value: stats.totalCompanies, icon: "🏢" },
          {
            label: "Total Applications",
            value: stats.totalApplications,
            icon: "📋",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-2"
          >
            <span className="text-2xl">{stat.icon}</span>
            <p className="text-2xl font-bold text-purple-700">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Recent Jobs
        </h2>
        <div className="flex flex-col divide-y divide-gray-100">
          {recentJobs.map((job) => (
            <div key={job._id} className="flex items-center gap-3 py-3">
              <img
                src={job.company?.companyLogo || "/company_9712830.png"}
                alt={job.company?.name}
                className="w-9 h-9 rounded-full object-cover border shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {job.title}
                </p>
                <p className="text-xs text-gray-500">
                  {job.company?.name} • {job.location || "Not disclosed"}
                </p>
              </div>
              <p className="text-xs text-gray-500 shrink-0">
                {new Date(job.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Recent Recruiters
        </h2>
        <div className="flex flex-col divide-y divide-gray-100">
          {recentRecruiters.map((recruiter) => (
            <div key={recruiter._id} className="flex items-center gap-3 py-3">
              <img
                src={recruiter.profile.profilePhoto}
                alt="recruiter image"
                className="w-9 h-9 rounded-full object-cover border shrink-0"
              />
              <div className="flex-2 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {recruiter.firstName} {" "} {recruiter.lastName}
                </p>
                <p className="text-xs text-gray-500 ">{recruiter.email}</p>
            
              </div>
              <p className="text-xs text-gray-500 shrink-0">
                {new Date(recruiter.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
