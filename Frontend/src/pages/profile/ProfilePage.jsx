import React from "react";
import { useState, useEffect } from "react";
import api from "@/api/axios";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
import SocialLink from "@/components/common/SocialLink";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const formatDate = (date) => date?.split("T")[0];

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    profile: {
      gender: "",
      bio: "",
      skills: [],
      experience: [],
      education: [],
      resume: "",
      profilePhoto: "",
      socialLinks: {
        linkedin: "",
        github: "",
        leetcode: "",
        portfolio: "",
      },
    },
  });

  const [selectedExpId, setSelectedexpId] = useState(null);
  const [selectedEduId, setSelectededuId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await api.get("/api/v1/user/profile");
        setProfileData(res?.data?.user);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const confirmDeleteExperience = async () => {
    try {
      setDeleting(true);
      await api.delete(`/api/v1/user/profile/experience/${selectedExpId}`);
      toast.success("Experience deleted successfully");
      setProfileData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          experience: prev.profile.experience.filter(
            (exp) => exp._id !== selectedExpId,
          ),
        },
      }));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete experience",
      );
    } finally {
      setDeleting(false);
      setSelectedexpId(null);
    }
  };

  const confirmDeleteEducation = async () => {
    try {
      setDeleting(true);
      await api.delete(`/api/v1/user/profile/education/${selectedEduId}`);
      toast.success("Education deleted successfully");
      setProfileData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          education: prev.profile.education.filter(
            (edu) => edu._id !== selectedEduId,
          ),
        },
      }));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete education",
      );
    } finally {
      setDeleting(false);
      setSelectededuId(null);
    }
  };
  if (loading) return <Loader />;

  const { firstName, lastName, email, role, profile } = profileData;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 rounded-xl shadow-xl">
      <div className="bg-white p-6 ">
        <div className="flex flex-col gap-3 items-center justify-center">
          <img
            src={profile?.profilePhoto || "/avatar.png"}
            alt="profile image"
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-purple-700">
              {firstName} {lastName}
            </h1>
            <p className="font-semibold capitalize">{role}</p>
            <p className="text-gray-700">{email}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          {profile?.bio ? (
            <p className="text-gray-700">{profile.bio}</p>
          ) : (
            <p className="text-gray-500">No bio added yet</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-3">Skills</h2>
        {profile?.skills?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No skills added yet</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Experience</h2>
          <Link
            to="/profile/experience/add"
            className="text-purple-700 font-medium hover:underline"
          >
            + Add Experience
          </Link>
        </div>

        {profile?.experience?.length > 0 ? (
          <div className="space-y-4">
            {profile.experience.map((exp, index) => (
              <div
                key={index}
                className="border-2 border-gray-300 rounded-lg p-4"
              >
                <div className="">
                  <div>
                    <h3 className="font-semibold">
                      {exp.jobTitle} · {exp.company}
                    </h3>
                    <p className="text-sm text-gray-700 capitalize">
                      {exp.employmentType} ·{" "}
                      {exp.isCurrent
                        ? "Present"
                        : `${formatDate(exp.startDate)} To ${formatDate(exp.endDate)}`}
                    </p>
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  </div>

                  <button
                    onClick={() => setSelectedexpId(exp._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl border text-sm font-semibold mt-4 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No experience added yet</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <Link
            to="/profile/education/add"
            className="text-purple-700 font-medium hover:underline"
          >
            + Add Education
          </Link>
        </div>

        {profile?.education?.length > 0 ? (
          <div className="space-y-4">
            {profile.education.map((edu, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-sm text-gray-700">
                  {edu.institute} · {formatDate(edu.startYear)} To{" "}
                  {formatDate(edu.endYear)}
                </p>
                <button
                  onClick={() => setSelectededuId(edu._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl border text-sm font-semibold mt-4 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No education added yet</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-2">Resume</h2>
        {profile?.resume ? (
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="text-purple-700 underline"
          >
            View Resume
          </a>
        ) : (
          <p className="text-gray-500">No resume uploaded yet</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-3">Social Links</h2>

        <SocialLink label="LinkedIn" url={profile?.socialLinks?.linkedin} />
        <SocialLink label="GitHub" url={profile?.socialLinks?.github} />
        <SocialLink label="LeetCode" url={profile?.socialLinks?.leetcode} />
        <SocialLink label="Portfolio" url={profile?.socialLinks?.portfolio} />
      </div>

      <div className="flex justify-center mt-8">
        <Link
          to="/profile/update"
          className="px-8 py-4 bg-green-700 text-white border rounded-md font-semibold"
        >
          Update Profile
        </Link>
      </div>
      <AlertDialog
        open={!!selectedExpId}
        onOpenChange={() => setSelectedexpId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete experience?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              className="bg-red-600"
              disabled={deleting}
              onClick={confirmDeleteExperience}
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!selectedEduId}
        onOpenChange={() => setSelectededuId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete education?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              className="bg-red-600"
              disabled={deleting}
              onClick={confirmDeleteEducation}
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default ProfilePage;
