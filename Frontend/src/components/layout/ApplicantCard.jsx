import api from "@/api/axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const statusColors = {
  Applied: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
  Hired: "bg-green-100 text-green-700",
};

const ApplicantCard = ({ app }) => {
  const { user, status } = app;
  const [applicantStatus, setApplicantStatus] = useState(status);
  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleUpdateStatus = async (applicationId) => {
    try {
      await api.patch(`/api/v1/application/${applicationId}/status`, {
        status: selectedStatus,
      });
      toast.success("Status updated !");
      setApplicantStatus(selectedStatus);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 rounded-xl shadow-md bg-white gap-4">
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex justify-between gap-3">
          <div className="flex flex-col md:flex-row md:gap-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            <span className="text-sm text-gray-600">{user.phoneNumber}</span>
          </div>

          {user.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 hover:underline font-medium"
            >
              View Resume
            </a>
          ) : (
            <span className="text-sm text-gray-400">No resume uploaded</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {user.profile?.skills?.length === 0 ? (
            <span className="text-sm text-gray-400">No skills added</span>
          ) : (
            user.profile?.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium"
              >
                {skill}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {user.profile?.socialLinks?.linkedin ? (
          <a
            href={user.profile.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            LinkedIn
          </a>
        ) : (
          <span className="text-sm text-gray-400">LinkedIn not provided</span>
        )}

        {user.profile?.socialLinks?.github ? (
          <a
            href={user.profile.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-700 hover:underline font-medium"
          >
            GitHub
          </a>
        ) : (
          <span className="text-sm text-gray-400">GitHub not provided</span>
        )}
      </div>

      <div className="flex items-start md:items-end mt-5 gap-3">
        <span
          className={`text-sm font-medium px-3 py-1 md:px-4 md:py-2 rounded-full ${statusColors[status]}`}
        >
          {applicantStatus}
        </span>

        <select
          className="text-sm border border-gray-600 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
          <option value="Hired">Hired</option>
        </select>

        <button
          onClick={() => handleUpdateStatus(app._id)}
          className="text-sm bg-indigo-600 text-white px-3 py-1  md:px-4 md:py-2 rounded-lg hover:bg-indigo-700"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ApplicantCard;
