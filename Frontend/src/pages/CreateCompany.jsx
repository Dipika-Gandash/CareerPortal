import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import api from "../api/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateCompany = () => {
  const [companyFormData, setCompanyFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: "",
  });
  
  const navigate = useNavigate();

  const handleCompanyData = (e) => {
    setCompanyFormData({
      ...companyFormData,
      [e.target.name] : e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/v1/company/create", companyFormData);
       toast.success("Company created successfully")
       navigate("/recruiter/companies")
      console.log(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div className="flex justify-center items-center mt-4 px-4">
      <div className="w-full max-w-xl bg-white border border-purple-100 shadow-2xl rounded-2xl p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-purple-700">
          Create Company
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
               name="name"
              type="text"
             
              placeholder="Enter company name"
              value={companyFormData.name}
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
              value={companyFormData.website}
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
              value={companyFormData.location}
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
              value={companyFormData.description}
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
              value={companyFormData.logo}
              onChange={handleCompanyData}
            />
          </div>

          <Button type="submit" className="w-full mt-4">
            Create Company
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
