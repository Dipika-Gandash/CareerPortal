import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "@/api/axios";
import { useDispatch } from "react-redux";
import { logOutUser } from "@/store/authSlice";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await api.post("/api/v1/user/logout");
      dispatch(logOutUser());
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <header className="w-full border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <h1 className="text-3xl font-bold text-purple-600">
          Career<span className="text-black">Portal</span>
        </h1>

        <ul className="hidden items-center gap-8 md:flex">
          {user ? (
            <>
              <li className="cursor-pointer text-[18px] font-medium hover:text-indigo-600">
                <Link to="/">Home</Link>
              </li>
              <li className="cursor-pointer text-[18px] font-medium hover:text-indigo-600">
                <Link
                  to={
                    user.role === "jobseeker" ? "/browse" : "/recruiter/my-jobs"
                  }
                >
                  {user.role === "jobseeker" ? "Browse Jobs" : "My Jobs"}
                </Link>
              </li>
              <li className="cursor-pointer text-[18px] font-medium hover:text-indigo-600">
                <Link
                  to={
                    user.role === "jobseeker"
                      ? "/my-applications"
                      : "/recruiter/companies"
                  }
                >
                  {user.role === "jobseeker"
                    ? "My Applications"
                    : "My Companies"}
                </Link>
              </li>

              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="/userLogo.png" />
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="space-y-2">
                  <Link to="/profile" className="font-semibold"> View Profile</Link> 
                  
                    <button
                      className="cursor-pointer text-sm bg-red-500 text-white px-4 py-2 mt-4 rounded-md"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <li className="cursor-pointer text-[18px] font-medium hover:text-indigo-600">
                <Link to="/">Home</Link>
              </li>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </ul>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t bg-white px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {user ? (
              <>
                <li className="cursor-pointer text-[18px] font-medium hover:text-indigo-600">
                  <Link to="/">Home</Link>
                </li>
                <li className="cursor-pointer text-[18px] font-medium hover:text-indigo-600">
                  <Link
                    to={
                      user.role === "jobseeker"
                        ? "/browse"
                        : "/recruiter/my-jobs"
                    }
                  >
                    {user.role === "jobseeker" ? "Browse Jobs" : "My Jobs"}
                  </Link>
                </li>
                <li className="cursor-pointer text-[18px] font-medium hover:text-indigo-600">
                  <Link
                    to={
                      user.role === "jobseeker"
                        ? "/my-applications"
                        : "/recruiter/companies"
                    }
                  >
                    {user.role === "jobseeker"
                      ? "My Applications"
                      : "My Companies"}
                  </Link>
                </li>
              <Link to="/profile">  <Button variant="outline" className="w-full">
                  Profile
                </Button></Link>
                <Button onClick={handleLogOut} variant="outline" className="w-full bg-red-600 text-white border rounded-md">Logout</Button>
              </>
            ) : (
              <>
                <li className="font-medium">
                  <Link to="/">Home</Link>
                </li>
                <Link to="/login">
                  {" "}
                  <Button className="w-full">Login</Button>
                </Link>

                <Link to="/signup">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavBar;
