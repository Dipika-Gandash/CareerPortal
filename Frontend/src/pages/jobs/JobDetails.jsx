import api from "@/api/axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import Loader from "@/components/common/Loader";

const JobDetails = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await api.get(`/api/v1/job/${jobId}`);
        setJobDetails(res.data?.job);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleJobStatus = async (jobId, newStatus) => {
    try {
      const res = await api.patch(`/api/v1/job/${jobId}/status`, {
        status: newStatus,
      });
      if (res.data.success) {
        setJobDetails((prev) => ({
          ...prev,
          status: newStatus,
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "");
    }
  };

  const handleDeleteJob = async () => {
    try {
      const res = await api.delete(`/api/v1/job/${jobId}`);
      if (res?.data?.message) {
        toast.success("Job deleted successfully");
        navigate("/recruiter/my-jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "");
    }
  };

  const handleApplyJob = async () => {
    try {
      setApplying(true);
      const res = await api.post(`/api/v1/application/${jobId}/apply`);
      if (res.data.success) {
        toast.success("Applied successfully!");
        navigate("/browse");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-5xl mx-auto mt-11 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {jobDetails?.title}
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              {jobDetails?.company?.name}
            </p>
          </div>

          <span className="px-4 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
            {jobDetails?.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-semibold">Location:</span>{" "}
            {jobDetails?.location}
          </div>

          <div>
            <span className="font-semibold">Salary:</span> ₹
            {jobDetails?.salary?.min} - ₹{jobDetails?.salary?.max}
          </div>

          <div>
            <span className="font-semibold">Experience:</span>{" "}
            {jobDetails?.experienceLevel}
          </div>

          <div>
            <span className="font-semibold">Work Mode:</span>{" "}
            {jobDetails?.workMode}
          </div>

          <div>
            <span className="font-semibold">Job Type:</span>{" "}
            {jobDetails?.jobType}
          </div>
          
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p className="text-gray-600 leading-relaxed">
            {jobDetails?.description}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Requirements</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {jobDetails?.requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="pt-6 border-t flex gap-4">
          {!user && (
            <button
              onClick={() =>
                navigate("/login", { state: { from: `/jobs/${jobId}/apply` } })
              }
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Login to Apply
            </button>
          )}
          {user?.role === "jobseeker" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Apply Now
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Apply for {jobDetails?.title}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-800">
                    {jobDetails?.company?.name} · {jobDetails?.location} — Your
                    profile resume will be used for this application.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleApplyJob}
                    disabled={applying}
                  >
                    {applying ? "Applying..." : "Confirm & Apply"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {user?.role === "recruiter" &&
            jobDetails?.postedBy?._id.toString() === user?.id && (
              <>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="px-4 py-2 rounded-xl bg-yellow-500 text-white cursor-pointer hover:bg-yellow-600">
                      Update Status
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Update Job Status</AlertDialogTitle>

                      <AlertDialogDescription className="text-gray-800">
                        Current status: <strong>{jobDetails?.status}</strong>
                        {jobDetails?.status === "Open"
                          ? " This will close the job and candidates will no longer be able to apply."
                          : " This will reopen the job and candidates can apply again."}
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction
                        onClick={() =>
                          handleJobStatus(
                            jobDetails?._id,
                            jobDetails?.status === "Open" ? "Closed" : "Open",
                          )
                        }
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        {jobDetails?.status === "Open"
                          ? "Close Job"
                          : "Open Job"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="px-4 py-2 rounded-xl bg-red-600 text-white cursor-pointer">
                      Delete
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this company?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-700">
                        This action cannot be undone. This will permanently
                        delete your company and all related jobs.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteJob}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <button
                  onClick={() =>
                    navigate(`/recruiter/jobs/${jobId}/applicants`)
                  }
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  View Applicants
                </button>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
