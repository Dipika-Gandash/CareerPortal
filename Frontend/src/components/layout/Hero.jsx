import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);

  let heading = "Find the Right Opportunity. Hire the Right Talent.";
  let subheading = "Carrier Portal connects ambitious professionals with top companies — making hiring and job searching simple, fast, and transparent.";
  let primaryBtn = "Get Started";
  let secondaryBtn = "Login";
  let image = "mainImage.jpg";
  let primaryLink = "/signup";
  let secondaryLink = "/login";
  let isBlocked = false;

  if (user) {
    if (user.role === "jobseeker") {
      heading = "Step Into Opportunities That Match Your Ambition.";
      subheading = "Find jobs made for your skills, apply with confidence, and unlock the next chapter in your career journey.";
      primaryBtn = "Search Jobs";
      secondaryBtn = "View Applications";
      image = "jobSeekerImage.jpg";
      primaryLink = "/browse";
      secondaryLink ="/my-applications";
    } else if (user.role === "recruiter") {
      isBlocked = user.isBlocked === true;

      heading = isBlocked
        ? "Your Account Has Been Suspended."
        : "Discover Talent. Build Exceptional Teams.";
      subheading = isBlocked
        ? "Your recruiter account has been blocked by the admin. Please contact support for assistance."
        : "Post jobs, connect with the best candidates, and make smarter hiring decisions — faster, easier, better.";
      primaryBtn = "Post a Job";
      secondaryBtn = "My Companies";
      image = "recruiterImage.jpg";
      primaryLink = "/recruiter/companies";
      secondaryLink = "/recruiter/companies";
    }
  }

  return (
    <section className="w-full py-14 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left">
            {isBlocked && (
            <div className="mb-4 inline-flex items-center gap-2 bg-red-100 text-red-700 border border-red-300 rounded-full px-4 py-1.5 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
              Account Blocked
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">{heading}</h1>
          <p className="mt-6 text-gray-600 text-lg max-w-xl">{subheading}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          {isBlocked ? (
              <Button disabled className="bg-purple-600 opacity-50 cursor-not-allowed">
                {primaryBtn}
              </Button>
            ) : (
              <Link to={primaryLink}>
                <Button className="bg-purple-600 cursor-pointer">{primaryBtn}</Button>
              </Link>
            )}
            
           {isBlocked ? (
              <Button disabled variant="outline" className="border-purple-600 text-purple-600 opacity-50 cursor-not-allowed">
                {secondaryBtn}
              </Button>
            ) : (
              <Link to={secondaryLink}>
                <Button variant="outline" className="border-purple-600 text-purple-600 cursor-pointer">
                  {secondaryBtn}
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img src={image} alt="Hero Illustration" className="w-full max-w-md md:max-w-lg object-contain" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
