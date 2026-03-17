import { useNavigate } from "react-router-dom";

const RecruiterCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl font-bold">
        Hire the Best Talent
      </h1>

      <p className="mt-3 text-gray-600">
        Hire and Manage Your Job Listings
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => navigate("/recruiter/company/create")}
          className="bg-black text-white px-6 py-2 rounded-lg cursor-pointer"
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