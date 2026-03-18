import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard, Users, Building2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "@/store/authSlice";

const navLinks = [
  { label: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
  { label: "Recruiters", path: "/admin/recruiters", icon: <Users size={20} /> },
  { label: "Companies", path: "/admin/companies", icon: <Building2 size={20} /> },
  { label: "Jobs", path: "/admin/jobs", icon: <Briefcase size={20} /> },
];

const SideBar = () => {
  const [open, setOpen] = useState(false);
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
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-600 text-white p-2 rounded-md"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white shadow-2xl z-40
          flex flex-col px-4 py-6
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}  
          md:translate-x-0 md:static md:flex
        `}
      >
        <h1 className="text-2xl font-bold text-purple-600 mb-10">
          Career<span className="text-black">Portal</span>
        </h1>

        <ul className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button onClick={handleLogOut} className="bg-red-700 text-white mt-4">Logout</Button>
      </aside>
    </>
  );
};

export default SideBar;