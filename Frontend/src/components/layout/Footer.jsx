import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20 w-full bg-black text-white p-6">
     <div className="text-center">
      © {new Date().getFullYear()} CareerPortal. All rights reserved.
     </div>
    </footer>
  );
};

export default Footer;
