import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  "Frontend",
  "Backend",
  "Full Stack",
  "AI / ML",
  "Data Science",
  "UI/UX",
  "Internship",
  "Remote"
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/browse?keyword=${category.toLowerCase()}`);
  };

  return (
    <div className="mt-11 flex flex-col items-center">
      <h1 className=" text-2xl md:text-3xl font-bold">
        Browse by Category
      </h1>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl w-full px-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(cat)}
            className="cursor-pointer border border-purple-400 rounded-lg py-4 text-center font-medium hover:bg-purple-700 hover:text-white transition-all duration-300"
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
