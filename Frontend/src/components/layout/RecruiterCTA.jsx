const RecruiterCTA = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl font-bold">
        Hire the Best Talent
      </h1>

      <p className="mt-3 text-gray-600">
      Hire and Manage Your Job Listings
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button className="bg-black text-white px-6 py-2 rounded-lg">
          Post a Job
        </button>
    
        <button className="border border-black px-6 py-2 rounded-lg">
        My Jobs
        </button>

         <button className="border border-black px-6 py-2 rounded-lg">
        My Companies
        </button>
      </div>
    </div>
  );
};

export default RecruiterCTA;