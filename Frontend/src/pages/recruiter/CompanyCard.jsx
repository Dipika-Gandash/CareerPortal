import api from "@/api/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CompanyCard = () => {
  const { companyId } = useParams();
  const [companyData, setCompanyData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/api/v1/company/${companyId}`);
        setCompanyData(res.data.company);
      } catch (error) {
        setError(error.response?.data?.message || "Something went wrong");
        setCompanyData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-2xl font-bold mt-10 text-red-500">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="text-center text-2xl font-bold mt-10">
        <h2>Company not found</h2>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-purple-300">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={companyData.logo || "/company_9712830.png"}
            alt="logo"
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div>
            <h1 className="text-3xl font-bold text-purple-700">
              {companyData.name}
            </h1>
            <p className="text-gray-600 mt-2">{companyData.location}</p>
            <p className="text-purple-600 mt-1">{companyData.website}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-700">{companyData.description}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <button onClick={() => navigate(`/recruiter/companies/${companyId}/create-job`)} className="px-4 py-2 rounded-xl bg-purple-600 text-white cursor-pointer">
            Post Job
          </button>
          <button onClick={() => navigate(`/recruiter/companies/${companyId}/update`)} className="px-4 py-2 rounded-xl bg-gray-300 text-black cursor-pointer">
            Edit Company Details
          </button>
          <button className="px-4 py-2 rounded-xl bg-red-600 text-white cursor-pointer">
            Delete Company
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
