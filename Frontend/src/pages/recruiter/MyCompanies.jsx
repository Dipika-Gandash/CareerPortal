import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MyCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api("/api/v1/company/my");
        setCompanies(res.data.companies);
      } catch (error) {
        toast.error(error.message || "Failed to Fetch Companies");
      }
    };

    fetchCompanies();
  }, []);
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-purple-700 text-center">
        My Companies
      </h1>
      <div className="space-y-6">
        {companies.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-black font-semibold">
              {" "}
              No companies found. Create one first.
            </p>
            <Link to="/recruiter/company/create">
              <Button className="mt-6 cursor-pointer">Create Company</Button>
            </Link>
          </div>
        ) : (
          companies.map((company) => (
            <div
              key={company._id}
              className="flex flex-col md:flex-row items-center gap-4 bg-white border border-purple-300 shadow-md rounded-2xl p-6 hover:shadow-lg transition cursor-pointer"
            >
              <div>
                <img
                  src={company.logo || "/company_9712830.png"}
                  alt="logo"
                  className="w-20 h-20 rounded-full object-cover border border-purple-200"
                />
              </div>

              <div className="flex-1 md:ml-16 mt-4 md:mt-0 text-center md:text-left">
                <h2 className="text-xl font-semibold text-gray-800">
                  {company.name}
                </h2>
                <p className="text-gray-700">
                  {company.location || "Not Disclosed"}{" "}
                </p>
                <p className="text-purple-600 text-sm">{company.website}</p>
              </div>
              <button className="px-4 py-2 border rounded-xl bg-purple-600 text-white cursor-pointer"
              onClick={() => navigate(`/recruiter/companies/${company._id}/create-job`)}>
                Post Job
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCompanies;
