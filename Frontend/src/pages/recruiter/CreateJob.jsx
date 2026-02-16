import React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import api from "@/api/axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import RequiredStar from "@/components/common/RequiredStar";

const CreateJob = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [jobFormData, setJobFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    experienceLevel: "",
    salary: {
      min: "",
      max: "",
    },
    location: "",
    workMode: "Onsite",
    jobType: "",
    positions: "",
    company: "",
  });
  const [creatingJob, setCreatingJob] = useState(false);

  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    setJobFormData((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        [name]: value,
      },
    }));
  };
  const handleJobData = (e) => {
    setJobFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    if (
      !jobFormData.title ||
      !jobFormData.description ||
      !jobFormData.experienceLevel ||
      !jobFormData.salary.min ||
      !jobFormData.salary.max ||
      !jobFormData.location ||
      !jobFormData.workMode ||
      !jobFormData.jobType ||
      !jobFormData.positions
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setCreatingJob(true);

    try {
      const formattedData = {
        ...jobFormData,
        requirements: jobFormData.requirements
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
      };
      await api.post(`/api/v1/company/${companyId}/create-job`, formattedData);
      console.log(formattedData);
      toast.success("Job created Successfully");
      navigate(`/recruiter/companies/${companyId}/jobs`);
    } catch (error) {
      console.log(error)
     toast.error(
    error.response?.data?.message || "Something went wrong"
  );
    } finally {
      setCreatingJob(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-purple-200">
        <h1 className="text-3xl font-bold text-center mb-10 text-purple-700">
          Create Job
        </h1>
        <form className="space-y-8" onSubmit={handleJobSubmit}>
          <div className="space-y-2">
            <Label htmlFor="title">
              Job Title <RequiredStar />{" "}
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter job title"
              value={jobFormData.title}
              onChange={handleJobData}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              name="description"
              placeholder="Enter job description"
              rows={4}
              value={jobFormData.description}
              onChange={handleJobData}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Requirements <RequiredStar />
            </Label>

            <textarea
              name="requirements"
              placeholder="e.g. React, Node.js, MongoDB"
              value={jobFormData.requirements}
              onChange={handleJobData}
              className="border p-2 rounded-md w-full"
            />

            <p className="text-xs text-gray-500 mt-1">
              Enter requirements separated by commas
            </p>
          </div>

          <div className="space-y-3">
            <Label>
              Experience Level <RequiredStar />{" "}
            </Label>
            <RadioGroup
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              value={jobFormData.experienceLevel}
              onValueChange={(value) =>
                setJobFormData((prev) => ({ ...prev, experienceLevel: value }))
              }
            >
              {["Fresher", "Junior", "Mid", "Senior"].map((level) => (
                <div
                  key={level}
                  className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-purple-50"
                >
                  <RadioGroupItem value={level} id={level} />
                  <Label htmlFor={level} className="capitalize cursor-pointer">
                    {level}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="minSalary">
                Minimum Salary <RequiredStar />{" "}
              </Label>
              <Input
                id="minSalary"
                name="min"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 30000"
                value={jobFormData.salary.min}
                onChange={handleSalaryChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxSalary">
                Maximum Salary <RequiredStar />{" "}
              </Label>
              <Input
                id="maxSalary"
                name="max"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 60000"
                value={jobFormData.salary.max}
                onChange={handleSalaryChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">
              Location <RequiredStar />{" "}
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="Enter job location"
              value={jobFormData.location}
              onChange={handleJobData}
            />
          </div>

          <div className="space-y-3">
            <Label>Work Mode </Label>
            <RadioGroup
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              value={jobFormData.workMode}
              onValueChange={(value) =>
                setJobFormData((prev) => ({ ...prev, workMode: value }))
              }
            >
              {["Onsite", "Remote", "Hybrid"].map((mode) => (
                <div
                  key={mode}
                  className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-purple-50"
                >
                  <RadioGroupItem value={mode} id={mode} />
                  <Label htmlFor={mode} className="capitalize cursor-pointer">
                    {mode}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>
              Job Type <RequiredStar />{" "}
            </Label>
            <RadioGroup
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              value={jobFormData.jobType}
              onValueChange={(value) =>
                setJobFormData((prev) => ({ ...prev, jobType: value }))
              }
            >
              {["Full-Time", "Part-Time", "Internship", "Contract"].map(
                (type) => (
                  <div
                    key={type}
                    className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-purple-50"
                  >
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type} className="capitalize cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ),
              )}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="positions">Number of Positions</Label>
            <Input
              id="positions"
              name="positions"
              type="number"
              placeholder="Enter number of openings"
              value={jobFormData.positions}
              onChange={handleJobData}
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={creatingJob}
              className={`px-10 py-2 rounded-xl text-white transition-all ${
                creatingJob
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {creatingJob ? "Creating..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
