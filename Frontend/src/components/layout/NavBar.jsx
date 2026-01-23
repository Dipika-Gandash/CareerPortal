import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <h1 className="text-3xl font-bold text-indigo-600">
          Career<span className="text-black">Portal</span>
        </h1>

        <ul className="hidden items-center gap-8 md:flex">
          <li className="cursor-pointer text-[18px] font-medium hover:text-indigo-600">
            Home
          </li>
          <li className="cursor-pointer text-[18px] font-medium hover:text-indigo-600">
            Browse
          </li>
          <li className="cursor-pointer text-[18px] font-medium hover:text-indigo-600">
            Jobs
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
                <p className="cursor-pointer text-sm text-red-500">Logout</p>
              </div>
            </PopoverContent>
          </Popover>
        </ul>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t bg-white px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            <li className="font-medium">Home</li>
            <li className="font-medium">Browse</li>
            <li className="font-medium">Jobs</li>
            <Button variant="outline" className="w-full">
              Profile
            </Button>
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavBar;
