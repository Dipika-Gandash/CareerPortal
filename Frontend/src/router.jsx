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
import CompanyJobs from "./pages/recruiter/CompanyJobs";
import AddExperience from "./pages/profile/AddExperience";
import AddEducation from "./pages/profile/AddEducation";
import ProfilePage from "./pages/profile/ProfilePage";
import UpdateProfile from "./pages/profile/UpdateProfile";
import MyApplications from "./pages/jobs/MyApplications";
import MyApplicants from "./pages/recruiter/MyApplicants";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminCompanies from "./pages/admin/AdminCompanies";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminRecruiters from "./pages/admin/AdminRecruiters";
import AdminDashboard from "./pages/admin/AdminDashboard";

export const router = createBrowserRouter([
  {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <AdminDashboard /> },
    { path: "recruiters", element: <AdminRecruiters /> },
    { path: "companies", element: <AdminCompanies /> },
    { path: "jobs", element: <AdminJobs /> },
  ],
},
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
        path: "jobs/:jobId/apply",
        element: <JobDetails />,
      },
      {
        path: "my-applications",
        element: <MyApplications />,
      },
     
      {
        path: "profile",
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: "experience/add",
            element: <AddExperience />,
          },
          {
            path: "education/add",
            element: <AddEducation />,
          },
          {
            path: "update",
            element: <UpdateProfile />,
          },
        ],
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
            element: <CreateJob />,
          },
          {
            path: "companies/:companyId/jobs",
            element: <CompanyJobs />,
          },
          {
            path: "my-jobs",
            element: <MyJobs />,
          },
          {
            path: "jobs/:jobId",
            element: <JobDetails />,
          },
          {
            path: "jobs/:jobId/applicants",
            element: <MyApplicants />,
          },
        ],
      },
    ],
  },
]);
