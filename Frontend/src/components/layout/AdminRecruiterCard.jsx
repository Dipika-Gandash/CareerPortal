import React from "react";

const AdminRecruiterCard = ({ recruiter, onToggleBlock }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-300 shadow-sm hover:shadow-md transition p-5">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-700 font-bold text-lg flex items-center justify-center shrink-0">
            {recruiter.profile?.profilePhoto ? (
              <img
                src={recruiter.profile.profilePhoto}
                alt={recruiter.firstName}
                className="w-11 h-11 rounded-full object-cover border shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-700 font-bold text-lg flex items-center justify-center shrink-0">
                {recruiter.firstName?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              {recruiter.firstName} {recruiter.lastName}
            </p>
            <p className="text-sm text-gray-400">{recruiter.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              recruiter.isBlocked
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-700"
            }`}
          >
            {recruiter.isBlocked ? "Blocked" : "Active"}
          </span>
          <button
            onClick={() => onToggleBlock(recruiter._id, recruiter.isBlocked)}
            className={`text-sm px-3 py-1 rounded-lg transition cursor-pointer ${
              recruiter.isBlocked
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {recruiter.isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      </div>

      {recruiter.profile?.bio && (
        <p className="mt-3 text-sm text-gray-500 ">
          {recruiter.profile.bio}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
        <span>🏢 {recruiter.totalCompanies} companies</span>
        <span>💼 {recruiter.totalJobs} jobs posted</span>
        <span>
          📅 Joined:{" "}
          {new Date(recruiter.createdAt).toLocaleDateString("en-IN", {
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default AdminRecruiterCard;
