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

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();

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
             {user.role === "jobseeker" ? "Browse Jobs" : "Post Job"}
              </li>
              <li className="cursor-pointer text-[18px] font-medium hover:text-indigo-600">
                {user.role === "jobseeker"
                  ? "My Applications"
                  : "Manage Applicants"}
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
                    <p className="text-sm font-medium">My Account</p>
                    <p className="cursor-pointer text-sm hover:text-indigo-600">
                      Dashboard
                    </p>
                    <p className="cursor-pointer text-sm hover:text-indigo-600">
                      Applications
                    </p>
                    <p className="cursor-pointer text-sm text-red-500">
                      Logout
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <li className="cursor-pointer text-[18px] font-medium hover:text-indigo-600">
              <Link to="/">Home</Link>
              </li>
             <Link to="/login"><Button>Login</Button></Link> 
             <Link to="/signup"><Button>Sign Up</Button></Link> 
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
                <li className="font-medium">
                  <Link to="/">Home</Link>
                </li>
                <li className="font-medium">
                  {user.role === "jobseeker" ? "Browse Jobs" : "Post Job"}
                </li>
                <li className="font-medium">
                  {user.role === "jobseeker"
                    ? "My Applications"
                    : "Manage Applicants"}
                </li>
                <Button variant="outline" className="w-full">
                  Profile
                </Button>
              </>
            ) : (
              <>
                <li className="font-medium"><Link to="/">Home</Link></li>
                <Link to="/login">
                  {" "}
                  <Button className="w-full">
                    Login
                  </Button>
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
