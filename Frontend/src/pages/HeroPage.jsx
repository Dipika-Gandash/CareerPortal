import React from "react";
import Hero from "@/components/layout/Hero";
import SearchBar from "@/components/layout/SearchBar";
import FeaturedJobs from "@/components/layout/FeaturedJobs";
import Categories from "@/components/layout/Categories";
import WhyChooseUs from "@/components/layout/WhyChooseUs";
import { useSelector } from "react-redux";
import RecruiterCTA from "@/components/layout/RecruiterCTA";

const HeroPage = () => {
  const user = useSelector((store) => store.auth.user);
  return (
    <div>
      <Hero />
      {user?.role === "jobseeker" && (
        <>
          <SearchBar />
          <FeaturedJobs />
          <Categories />
        </>
      )}
      {user?.role === "recruiter" && <RecruiterCTA />}
      <WhyChooseUs role={user?.role}/>
    
    </div>
  );
};

export default HeroPage;
