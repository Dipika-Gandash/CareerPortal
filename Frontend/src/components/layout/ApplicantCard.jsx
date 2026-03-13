import React from "react";

const statusColors = {
  Applied: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
  Hired: "bg-green-100 text-green-700",
};

const ApplicantCard = ({ app }) => {
  const { user, status } = app;
//   const getResumeViewUrl = (resumeUrl) => {
//   return `https://docs.google.com/viewer?url=${encodeURIComponent(resumeUrl)}&embedded=false`;
// };

  return (
    <div className="p-6 rounded-xl shadow-md bg-white flex justify-between items-start gap-4">
      
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>
          <span className="text-sm text-gray-500">{user.phoneNumber}</span>
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

      <div className="flex flex-col items-end gap-3">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[status]}`}>
          {status}
        </span>

        <select className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="Applied">Applied</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
          <option value="Hired">Hired</option>
        </select>
      </div>

    </div>
  );
};

export default ApplicantCard;