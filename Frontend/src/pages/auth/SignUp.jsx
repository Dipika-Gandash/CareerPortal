import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import api from "../../api/axios.js";
import toast from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "jobseeker",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await api.post("/api/v1/user/register", formData);
      toast.success("Account created successfully")
      navigate("/login")
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div className="flex mt-9 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-white shadow-md p-6 sm:p-8 border-purple-900">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-purple-700">
            Create an Account ✨
          </h1>
          <p className="mt-1 text-sm text-gray-700">
            Sign up to get started with Career Portal
          </p>
        </div>

        <form className="space-y-2.5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="firstName">FirstName</Label>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Enter your full name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">LastName</Label>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Enter your full name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="Number"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>

            <RadioGroup
              defaultValue="jobseeker"
              className="flex gap-6"
              value={formData.role}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  role: value,
                })
              }
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="jobseeker"
                  id="jobseeker"
                  className="h-4 w-4 border-gray-400 text-indigo-600"
                />
                <Label htmlFor="jobseeker" className="cursor-pointer">
                  Jobseeker
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="recruiter"
                  id="recruiter"
                  className="h-4 w-4 border-gray-400 text-indigo-600"
                />
                <Label htmlFor="recruiter" className="cursor-pointer">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <Button className="w-full">SignUp</Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span className="cursor-pointer font-medium text-indigo-600 hover:underline">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
