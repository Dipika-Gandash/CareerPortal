import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RequiredStar from "@/components/common/RequiredStar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "@/api/axios";

const AddEducation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    degree: "",
    institute: "",
    startYear: "",
    endYear: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEducation = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await api.post("/api/v1/user/profile/education", formData);
      toast.success("Education added successfully");
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
          Add Education
        </h1>
        <form className="space-y-6" onSubmit={handleSubmitEducation}>
          <div className="space-y-2">
            <Label htmlFor="degree">
              Degree <RequiredStar />{" "}
            </Label>
            <Input
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="Enter your degree"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="institute">
              Institute <RequiredStar />
            </Label>
            <Input
              type="text"
              id="institute"
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              placeholder="Enter your institute"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startYear">
              Start Date <RequiredStar />
            </Label>
            <Input
              type="date"
              id="startYear"
              name="startYear"
              value={formData.startYear}
              onChange={handleChange}
              placeholder="Enter Start Year"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endYear">
              End Date <RequiredStar />
            </Label>
            <Input
              type="date"
              id="endYear"
              name="endYear"
              value={formData.endYear}
              onChange={handleChange}
              placeholder="Enter End Year"
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
  {isSubmitting ? "Saving..." : "Add Education"}
</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEducation;
