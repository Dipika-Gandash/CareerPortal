import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import api from "../api/axios.js"
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/v1/user/login', {email, password});
      toast.success("Login successfully");
      console.log(res);
    } catch (error) {
     toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex mt-36 items-center justify-center px-4">
      
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-md sm:p-8 border-purple-900">
        
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back 👋</h1>
          <p className="mt-1 text-sm text-gray-600">
            Login to your account to continue
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* <div className="flex justify-end">
            <span className="cursor-pointer text-sm text-indigo-700 hover:underline">
              Forgot password?
            </span>
          </div> */}
          <Button className="w-full">
            Login
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span className="cursor-pointer font-medium text-indigo-600 hover:underline">
             <Link to="/signup">Sign up</Link> 
            </span>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login
