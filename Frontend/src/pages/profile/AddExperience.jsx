import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RequiredStar from "@/components/common/RequiredStar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";

const AddExperience = () => {
  const jobTypes = [
    { label: "Internship", value: "internship" },
    { label: "Full Time", value: "full-time" },
    { label: "Part Time", value: "part-time" },
    { label: "Contract", value: "contract" },
    { label: "Freelance", value: "freelance" },
  ];
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    employmentType: "full-time",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitExperience = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await api.post("/api/v1/user/profile/experience", formData);
      toast.success("Experience added successfully");
      navigate("/profile", { replace: true});
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-11 shadow-md rounded-2xl">
      <div className="flex flex-col px-8">
        <h1 className="text-3xl font-bold text-purple-700 mt-5 mb-8 text-center">
          Add Experience
        </h1>
        <form className="space-y-6" onSubmit={handleSubmitExperience}>
          <div className="space-y-2">
            <Label htmlFor="jobTitle">
              Job Title <RequiredStar />{" "}
            </Label>
            <Input
              id="jobTitle"
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Enter your Job Title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">
              Company <RequiredStar />{" "}
            </Label>
            <Input
              id="companyName"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter your company Name"
            />
          </div>

          <div className="space-y-2">
            <Label>
              Employment Type <RequiredStar />{" "}
            </Label>
            <RadioGroup
              defaultValue="full-time"
              className="flex gap-6 flex-wrap"
              value={formData.employmentType}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  employmentType: value,
                }))
              }
            >
              {jobTypes.map((type) => (
                <div key={type.value} className="flex items-center gap-3">
                  <RadioGroupItem
                    value={type.value}
                    id={type.value}
                    className="h-4 w-4 border-gray-400 text-indigo-600"
                  />
                  <Label htmlFor={type.value} className="cursor-pointer">
                    {type.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">
              Start Date <RequiredStar />{" "}
            </Label>
            <Input
              id="startDate"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="Enter start Date"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">
              End Date <RequiredStar />{" "}
            </Label>
            <Input
              id="endDate"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              disabled={formData.isCurrent}
              className={
                formData.isCurrent ? "bg-gray-100 cursor-not-allowed" : ""
              }
            />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <Input
              type="checkbox"
              id="isCurrent"
              name="isCurrent"
              checked={formData.isCurrent}
              onChange={(e) => {
                const checked = e.target.checked;

                setFormData((prev) => ({
                  ...prev,
                  isCurrent: checked,
                  endDate: checked ? "" : prev.endDate,
                }));
              }}
              className="h-4 w-4 accent-indigo-600 cursor-pointer"
            />
            <Label htmlFor="isCurrent" className="cursor-pointer">
              I am currently working in this company
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description..."
              className="w-full border border-gray-300 rounded-md p-2 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex justify-between p-4 space-y-2">
            <button
              type="button"
              className="px-4 py-2 cursor-pointer bg-green-700 text-white rounded-md"
              onClick={() => navigate("/profile")}
            >
              Go Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md text-white ${
                isSubmitting
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-700 hover:bg-purple-800"
              }`}
            >
              {isSubmitting ? "Saving..." : "Add Experience"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExperience;
