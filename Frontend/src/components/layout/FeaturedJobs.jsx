import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import api from "@/api/axios";

const FeaturedJobs = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await api.get("/api/v1/job/allJobs?page=1&limit=6");
      setFeaturedJobs(res.data.jobs);
      console.log(res.data.jobs)
    };
    fetchJobs();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center mt-11 mx-24">
      <div>
        <h1 className=" text-2xl md:text-3xl font-bold">Featured Jobs</h1>
      </div>

      <div className="flex gap-5 md:gap-8 flex-wrap items-center justify-center mx-12 mt-8">
        {featuredJobs.length === 0 ? (
          <p>No Jobs Found!</p>
        ) : (
          featuredJobs.map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default FeaturedJobs;
