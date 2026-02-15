import api from "@/api/axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const UpdateCompany = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await api.get(`/api/v1/company/${companyId}`);
        const company = res.data.company;

        setCompanyData({
          name: company.name || "",
          description: company.description || "",
          website: company.website || "",
          location: company.location || "",
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load company");
        navigate("/recruiter/companies");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId, navigate]);

  const handleCompanyData = async (e) => {
    setCompanyData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.patch(`/api/v1/company/${companyId}`, companyData);
      toast.success("Company updated successfully");
      navigate(`/recruiter/companies/${companyId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex justify-center items-center mt-4 px-4">
      <div className="w-full max-w-xl bg-white border border-purple-100 shadow-2xl rounded-2xl p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-purple-700">
          Update Company Details
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter company name"
              value={companyData.name}
              onChange={handleCompanyData}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              type="text"
              placeholder="https://example.com"
              value={companyData.website}
              onChange={handleCompanyData}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="City, Country"
              value={companyData.location}
              onChange={handleCompanyData}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter company description"
              className="w-full border border-gray-300 rounded-md p-2 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={companyData.description}
              onChange={handleCompanyData}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              name="logo"
              type="text"
              placeholder="Paste logo URL"
              value={companyData.logo}
              onChange={handleCompanyData}
            />
          </div>

         <button
          type="submit"
          disabled={submitting}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          {submitting ? "Updating..." : "Update Company"}
        </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCompany;
