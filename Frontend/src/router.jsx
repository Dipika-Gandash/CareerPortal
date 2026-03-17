import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./components/common/ProtectedRoutes";
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
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <ProtectedRoutes allowedRoles={["admin"]}>
        <AdminLayout />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "recruiters", element: <AdminRecruiters /> },
      { path: "companies", element: <AdminCompanies /> },
      { path: "jobs", element: <AdminJobs /> },
       { path: "*", element: <NotFound /> }
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
        element: (
          <ProtectedRoutes allowedRoles={["jobseeker"]}>
            <MyApplications />
          </ProtectedRoutes>
        ),
      },

      {
        path: "profile",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoutes>
                <ProfilePage />
              </ProtectedRoutes>
            ),
          },
          {
            path: "experience/add",
            element: (
              <ProtectedRoutes>
                <AddExperience />
              </ProtectedRoutes>
            ),
          },
          {
            path: "education/add",
            element: (
              <ProtectedRoutes>
                <AddEducation />
              </ProtectedRoutes>
            ),
          },
          {
            path: "update",
            element: (
              <ProtectedRoutes>
                <UpdateProfile />
              </ProtectedRoutes>
            ),
          },
        ],
      },
      {
        path: "recruiter",
        children: [
          {
            path: "company/create",
            element: (
              <ProtectedRoutes allowedRoles={["recruiter"]}>
                <CreateCompany />
              </ProtectedRoutes>
            ),
          },
          {
            path: "companies",
            element: (
              <ProtectedRoutes allowedRoles={["recruiter"]}>
                <MyCompanies />
              </ProtectedRoutes>
            ),
          },
          {
            path: "companies/:companyId",
            element: (
              <ProtectedRoutes allowedRoles={["recruiter"]}>
                <CompanyCard />
              </ProtectedRoutes>
            ),
          },
          {
            path: "companies/:companyId/update",
            element: (
              <ProtectedRoutes allowedRoles={["recruiter"]}>
                <UpdateCompany />
              </ProtectedRoutes>
            ),
          },
          {
            path: "companies/:companyId/create-job",
            element: (
              <ProtectedRoutes allowedRoles={["recruiter"]}>
                <CreateJob />
              </ProtectedRoutes>
            ),
          },
          {
            path: "companies/:companyId/jobs",
            element: (
              <ProtectedRoutes allowedRoles={["recruiter"]}>
                <CompanyJobs />
              </ProtectedRoutes>
            ),
          },
          {
            path: "my-jobs",
            element: (
              <ProtectedRoutes allowedRoles={["recruiter"]}>
                <MyJobs />
              </ProtectedRoutes>
            ),
          },
          {
            path: "jobs/:jobId",
            element: (
              <ProtectedRoutes allowedRoles={["recruiter"]}>
                <JobDetails />,
              </ProtectedRoutes>
            )
          },
          {
            path: "jobs/:jobId/applicants",
            element: (
              <ProtectedRoutes allowedRoles={["recruiter"]}>
                <MyApplicants />
              </ProtectedRoutes>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />
      }
    ],
  },
]);
