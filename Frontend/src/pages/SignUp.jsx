import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SignUp = () => {
  return (
    <div className="flex mt-9 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-md sm:p-8 border-purple-900">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Create an Account ✨
          </h1>
          <p className="mt-1 text-sm text-gray-700">
            Sign up to get started with Career Portal
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="Enter your full name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="Number"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>

            <RadioGroup defaultValue="jobseeker" className="flex gap-6">
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
              placeholder="Enter your password"
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
