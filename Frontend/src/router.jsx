import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import HeroPage from "./pages/HeroPage";
import Browse from "./pages/Browse";
import CreateCompany from "./pages/recruiter/CreateCompany";
import MyCompanies from "./pages/recruiter/MyCompanies";
import CompanyCard from "./pages/recruiter/CompanyCard";
import UpdateCompany from "./pages/recruiter/UpdateCompany";
import CreateJob from "./pages/recruiter/CreateJob";
import MyJobs from "./pages/recruiter/MyJobs";
import JobDetails from "./pages/jobs/JobDetails";

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
            element: <CreateJob />
          },
          {
            path: "companies/:companyId/jobs",
            element: <h1>Company Jobs here:</h1>
          },
          {
            path: "my-jobs",
            element: <MyJobs />
          },
          {
            path: "jobs/:jobId",
            element: <JobDetails />
          }
      
        ],
      },
    ],
  },
]);
