import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HeroPage from "./pages/HeroPage";
import Browse from "./pages/Browse";
import CreateCompany from "./pages/recruiter/CreateCompany";
import MyCompanies from "./pages/recruiter/MyCompanies";
import CompanyCard from "./pages/recruiter/CompanyCard";
import UpdateCompany from "./pages/recruiter/UpdateCompany";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HeroPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "browse",
        element: <Browse />,
      },
      {
        path: "recruiter",
        children: [
          {
            path: "company/create",
            element: <CreateCompany />,
          },
          {
            path: "companies",
            element: <MyCompanies />,
          },
          {
            path: "companies/:companyId",
            element: <CompanyCard />,
          },
          {
            path: "companies/:companyId/update",
            element: <UpdateCompany />,
          },
          {
            path: "companies/:companyId/create-job",
            element: <h1>Create Jobs for your company</h1>,
          },
        ],
      },
    ],
  },
]);
