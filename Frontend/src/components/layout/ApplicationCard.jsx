import React from "react";

const statusColors = {
  Applied: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
  Hired: "bg-green-100 text-green-700",
};

const ApplicationCard = ({ app }) => {
  const { job, status, appliedAt } = app;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white shadow-xl rounded-xl p-6">
      <img
        src={job?.company?.companyLogo}
        alt={job?.company?.name}
        className="w-20 h-20 rounded-full object-cover border"
      />

      <div className="flex-1">
        <h2 className="text-xl font-semibold text-black">{job?.title}</h2>
        <p className=" text-gray-800">{job?.company?.name}</p>
        <div className="flex gap-3 mt-1 text-sm text-gray-700">
          <span>{job?.workMode}</span>
          <span>·</span>
          <span>{job?.jobType}</span>
          <span>·</span>
          <span>₹{job?.salary?.min} - ₹{job?.salary?.max}</span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${statusColors[status]}`}>
          {status}
        </span>
        <span className="text-xs text-gray-700">
          {new Date(appliedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default ApplicationCard;