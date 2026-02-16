import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const user = useSelector((store) => store.auth.user);
  const isRecruiter = user?.role === "recruiter";

  const handleClick = () => {
    navigate(isRecruiter ? `/recruiter/jobs/${job._id}` : `/jobs/${job._id}`);
  };
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-purple-300 p-4 flex flex-col justify-between w-75">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          {job.title}
        </h2>

        <p className="text-purple-600 mt-1">{job.company.name}</p>

        <p className="text-sm text-gray-500 mt-1">
          {job.location || "Not Disclosed"}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            {job.workMode}
          </span>

          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
            {job.jobType}
          </span>
        </div>
      </div>

      <button
        className="mt-5 w-full bg-purple-600 text-white py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition"
        onClick={handleClick}
      >
        {user?.role === "recruiter" ? "View Job" : "Apply"}
      </button>
    </div>
  );
};

export default JobCard;
