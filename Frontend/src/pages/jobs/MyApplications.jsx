import React, { useEffect, useState } from "react";
import ApplicationCard from "@/components/layout/ApplicationCard";
import toast from "react-hot-toast";
import api from "@/api/axios";
import Loader from "@/components/common/Loader";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [totalApplication, setTotalApplication] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/api/v1/application/my-jobs");
        setApplications(res.data.data);
        setTotalApplication(res.data.total)
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to Load Applications",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="max-w-5xl mx-auto mt-11 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
        <span className="text-gray-700">{totalApplication} Applications</span>
      </div>

      <div className="space-y-4">
        {applications.length === 0 ? (
  <p className="text-center text-gray-700 mt-10">No applications yet</p>
) : (
  applications.map((app) => <ApplicationCard key={app._id} app={app} />)
)}
      </div>
    </div>
  );
};

export default MyApplications;
