import React from "react";

const WhyChooseUs = ({ role }) => {
  const features =
    role === "jobseeker"
      ? [
          {
            title: "Smart Job Search",
            desc: "Find jobs easily using keyword and category filters.",
          },
          {
            title: "Easy Apply",
            desc: "Apply to jobs quickly with a single click.",
          },
          {
            title: "Verified Companies",
            desc: "All recruiters and companies are verified.",
          },
          {
            title: "Career Growth",
            desc: "Discover opportunities that match your skills.",
          },
        ]
      : [
          {
            title: "Post Jobs Easily",
            desc: "Create and publish job listings in just a few clicks.",
          },
          {
            title: "Manage Applicants",
            desc: "Track, review, and shortlist candidates from your dashboard.",
          },
          {
            title: "Find Top Talent",
            desc: "Connect with skilled professionals that match your requirements.",
          },
          {
            title: "Efficient Hiring Process",
            desc: "Streamline your recruitment workflow with smart tools.",
          },
        ];
  return (
    <div className="mt-11 flex flex-col items-center px-4">
      <h1 className=" text-2xl md:text-3xl font-bold text-center">
        Why Choose Us
      </h1>

      <p className="mt-3 text-gray-600 text-center max-w-xl">
        We connect talented professionals with top companies in the industry.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white border border-purple-400 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold">{feature.title}</h2>
            <p className="mt-2 text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
