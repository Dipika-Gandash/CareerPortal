import { useNavigate } from "react-router-dom";
import useBlockedGuard from "@/customHooks/useBlockedGaurd";

const RecruiterCTA = () => {
  const navigate = useNavigate();
 const { isBlocked, guardAction } = useBlockedGuard();

  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl font-bold">
        Hire the Best Talent
      </h1>

      <p className="mt-3 text-gray-600">
        Hire and Manage Your Job Listings
      </p>

  {isBlocked && (
        <div className="mt-4 inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
          Your account is blocked. Some actions are disabled.
        </div>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => guardAction(() => navigate("/recruiter/company/create"))}
          className={`px-6 py-2 rounded-lg 
            ${isBlocked 
              ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
              : "bg-black text-white cursor-pointer"
            }`}
        >
          Create Company
        </button>

        <button
          onClick={() => navigate("/recruiter/companies")}
          className="border border-black px-6 py-2 rounded-lg cursor-pointer"
        >
          My Companies
        </button>

        <button
          onClick={() => navigate("/recruiter/my-jobs")}
          className="border border-black px-6 py-2 rounded-lg cursor-pointer"
        >
          My Jobs
        </button>
      </div>
    </div>
  );
};

export default RecruiterCTA;