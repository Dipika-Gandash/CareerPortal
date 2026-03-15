import api from "@/api/axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
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

const DeleteButton = ({ company, deleting, onDelete }) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <button
        disabled={deleting}
        className="text-sm px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition cursor-pointer disabled:opacity-50 shrink-0"
      >
        Delete
      </button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Company</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">{company.name}</span>?
          This will also remove all associated jobs and applications. This
          action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => onDelete(company._id)}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {deleting ? "Deleting..." : "Yes, Delete"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const AdminCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get("/api/v1/admin/all-companies");
        setCompanies(res.data.companies);
        setTotalCompanies(res.data.totalCompanies);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleDelete = async (companyId) => {
    if (deleting) return;
    setDeleting(true);
    try {
      await api.delete(`/api/v1/admin/companies/${companyId}`);
      setCompanies((prev) => prev.filter((c) => c._id !== companyId));
      setTotalCompanies((prev) => prev - 1);
      toast.success("Company deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete company");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-purple-700">
          All Companies
        </h1>
        <span className="bg-purple-100 text-purple-700 font-semibold px-4 py-1 rounded-full text-sm">
          Total: {totalCompanies}
        </span>
      </div>

      {companies.length === 0 ? (
        <div className="text-center text-gray-700 mt-20 text-lg">
          No companies found.
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 md:hidden">
            {companies.map((company) => (
              <div
                key={company._id}
                className="bg-white rounded-2xl shadow border border-gray-200 p-4 flex items-start gap-4"
              >
                <img
                  src={company.companyLogo || "/company_9712830.png"}
                  alt="logo"
                  className="w-14 h-14 rounded-full object-cover border shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-base truncate">
                    {company.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    📍 {company.location || "Not disclosed"}
                  </p>
                  {company.website && (
                    <p className="text-sm text-purple-600 mt-0.5 truncate">
                      🌐 {company.website}
                    </p>
                  )}
                </div>
                <DeleteButton
                  company={company}
                  deleting={deleting}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>

          <div className="hidden md:block bg-white rounded-2xl shadow border border-gray-300 overflow-hidden">
            <table className="w-full">
              <thead className="bg-purple-50 text-purple-700 uppercase text-sm">
                <tr>
                  <th className="px-6 py-4 text-left">Logo</th>
                  <th className="px-6 py-4 text-left">Company Name</th>
                  <th className="px-6 py-4 text-left">Location</th>
                  <th className="px-6 py-4 text-left">Website</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {companies.map((company) => (
                  <tr
                    key={company._id}
                    className="hover:bg-purple-50 transition cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={company.companyLogo || "/company_9712830.png"}
                        alt="logo"
                        className="w-14 h-14 rounded-full object-cover border"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {company.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {company.location || "Not disclosed"}
                    </td>
                    <td className="px-6 py-4 text-purple-600">
                      {company.website || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <DeleteButton
                        company={company}
                        deleting={deleting}
                        onDelete={handleDelete}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCompanies;