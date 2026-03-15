import React from "react";
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

const AdminJobCard = ({ job, onDelete, deleting }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={job.company?.companyLogo || "/company_9712830.png"}
            alt={job.company?.name}
            className="w-11 h-11 rounded-full object-cover border shrink-0"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {job.company?.name}
            </p>
            <p className="text-xs text-gray-400">{job.company?.location}</p>
          </div>
        </div>

        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
            job.status === "Open"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {job.status === "Open" ? "Open" : "Closed"}
        </span>
      </div>

      <h2 className="mt-3 text-base font-bold text-gray-900">{job.title}</h2>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
        <span>📍 {job.location || "Not disclosed"}</span>
        <span>
          👤 {job.postedBy?.firstName} {job.postedBy?.lastName}
        </span>
        <span>📋 {job.applicationsCount} applications</span>
      </div>

      <div className="mt-4 flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              disabled={deleting}
              className="text-sm px-4 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 cursor-pointer"
            >
              Delete
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Job</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-800">{job.title}</span>{" "}
                at{" "}
                <span className="font-semibold text-gray-800">
                  {job.company?.name}
                </span>
                ? This will also remove all associated applications. This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(job._id)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AdminJobCard;