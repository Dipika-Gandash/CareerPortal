import api from "@/api/axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profile: {
      gender: "",
      bio: "",
      skills: [],
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

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["firstName", "lastName", "phoneNumber"].includes(name)) {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          [name]: value,
        },
      }));
    }
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        socialLinks: {
          ...prev.profile.socialLinks,
          [name]: value,
        },
      },
    }));
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          profilePhoto: file,
        },
      }));
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          resume: file,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      setSubmitting(true);
      data.append("firstName", profileData.firstName);
      data.append("lastName", profileData.lastName);
      data.append("phoneNumber", profileData.phoneNumber);
      data.append("profile[gender]", profileData.profile.gender);
      data.append("profile[bio]", profileData.profile.bio);

      profileData.profile.skills.forEach((skill) => {
        data.append("profile[skills]", skill);
      });

      if (profileData.profile.profilePhoto instanceof File) {
        data.append("profilePhoto", profileData.profile.profilePhoto);
      }

      if (profileData.profile.resume instanceof File) {
        data.append("resume", profileData.profile.resume);
      }

      const social = profileData.profile.socialLinks;
      data.append("profile[socialLinks][linkedin]", social.linkedin);
      data.append("profile[socialLinks][github]", social.github);
      data.append("profile[socialLinks][leetcode]", social.leetcode);
      data.append("profile[socialLinks][portfolio]", social.portfolio);

      await api.patch("/api/v1/user/profile", data);
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to Update Profile ",
      ) 
    } finally{
      setSubmitting(false);
    }
  };
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await api.get("/api/v1/user/profile");
        const user = res?.data?.user;
        setProfileData({
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          phoneNumber: user?.phoneNumber || "",
          profile: {
            gender: user?.profile?.gender || "",
            bio: user?.profile?.bio || "",
            skills: user?.profile?.skills || [],
            resume: user?.profile?.resume || "",
            profilePhoto: user?.profile?.profilePhoto || "",
            socialLinks: {
              linkedin: user?.profile?.socialLinks?.linkedin || "",
              github: user?.profile?.socialLinks?.github || "",
              leetcode: user?.profile?.socialLinks?.leetcode || "",
              portfolio: user?.profile?.socialLinks?.portfolio || "",
            },
          },
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="flex items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white px-10 py-8 rounded-2xl shadow-xl space-y-6"
      >
        <div className="flex flex-col items-center space-y-3">
          <label className="cursor-pointer">
            <img
              src={
                profileData.profile.profilePhoto instanceof File
                  ? URL.createObjectURL(profileData.profile.profilePhoto)
                  : profileData.profile.profilePhoto
              }
              alt="Profile"
              className="w-30 h-30 rounded-full object-cover border-2 border-purple-300"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePhotoChange}
            />
          </label>
          <p className="text-sm text-gray-600">Click image to change</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            name="lastName"
            type="text"
            value={profileData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNo">Phone Number</Label>
          <Input
            id="phoneNo"
            name="phoneNumber"
            type="tel"   
            value={profileData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <div className="flex flex-wrap gap-6">
            {["male", "female", "non-binary", "prefer-not-to-say"].map(
              (option) => (
                <label key={option} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={profileData.profile.gender === option}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ),
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <textarea
            name="bio"
            value={profileData.profile.bio}
            onChange={handleChange}
            className="w-full border-2 rounded-md p-3"
            placeholder="Write your bio..."
          />
        </div>

       
       <div className="space-y-2">
        <Label htmlFor="skills">Skills</Label>
        <Input
        id="skills"
          placeholder="Skills (comma separated)"
          value={profileData.profile.skills.join(", ")}
          onChange={(e) =>
            setProfileData((prev) => ({
              ...prev,
              profile: {
                ...prev.profile,
                skills: e.target.value.split(",").map((s) => s.trim()),
              },
            }))
          }
        />
        </div>

        <div className="space-y-2">
          <Label>Resume (PDF)</Label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleResumeChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 space-y-2">
          <Label>Socials</Label>
          <Input
            name="linkedin"
            value={profileData.profile.socialLinks.linkedin}
            onChange={handleSocialChange}
            placeholder="LinkedIn URL"
          />
          <Input
            name="github"
            value={profileData.profile.socialLinks.github}
            onChange={handleSocialChange}
            placeholder="GitHub URL"
          />
          <Input
            name="leetcode"
            value={profileData.profile.socialLinks.leetcode}
            onChange={handleSocialChange}
            placeholder="LeetCode URL"
          />
          <Input
            name="portfolio"
            value={profileData.profile.socialLinks.portfolio}
            onChange={handleSocialChange}
            placeholder="Portfolio URL"
          />
        </div>

       <button
  type="submit"
  disabled={submitting}
  className={`px-4 py-2 rounded-md text-white 
    ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
  `}
>
  {submitting ? "Saving..." : "Save Changes"}
</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
