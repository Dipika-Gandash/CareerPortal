import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "@/api/axios";
import Loader from "@/components/common/Loader";
import AdminRecruiterCard from "@/components/layout/AdminRecruiterCard";

const AdminRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [totalRecruiters, setTotalRecruiters] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingIds, setLoadingIds] = useState([]);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const res = await api.get("/api/v1/admin/recruiters");
        setRecruiters(res.data.recruiters);
        setTotalRecruiters(res.data.totalRecruiters);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchRecruiters();
  }, []);

  const handleToggleBlock = async (recruiterId, isBlocked) => {
      if (loadingIds.includes(recruiterId)) return;
       setLoadingIds((prev) => [...prev, recruiterId]); 
    try {
      await api.patch(`/api/v1/admin/recruiters/${recruiterId}/status`);
      setRecruiters((prev) =>
        prev.map((r) =>
          r._id === recruiterId ? { ...r, isBlocked: !isBlocked } : r,
        ),
      );
      toast.success(isBlocked ? "Recruiter unblocked" : "Recruiter blocked");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }  finally {
    setLoadingIds((prev) => prev.filter((id) => id !== recruiterId)); 
  }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-purple-700">All Recruiters</h1>
        <span className="bg-purple-100 text-purple-700 font-semibold px-4 py-1 rounded-full text-sm">
          Total: {totalRecruiters}
        </span>
      </div>

      {recruiters.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">No recruiters found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {recruiters.map((recruiter) => (
            <AdminRecruiterCard
              key={recruiter._id}
              recruiter={recruiter}
              onToggleBlock={handleToggleBlock}
              isLoading={loadingIds.includes(recruiter._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRecruiters;
