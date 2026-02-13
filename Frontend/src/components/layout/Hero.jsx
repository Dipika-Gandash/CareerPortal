import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);

  let heading = "Find the Right Opportunity. Hire the Right Talent.";
  let subheading = "Carrier Portal connects ambitious professionals with top companies — making hiring and job searching simple, fast, and transparent.";
  let primaryBtn = "Get Started";
  let secondaryBtn = "Login";
  let image = "mainImage.jpg";

  if (user) {
    if (user.role === "jobseeker") {
      heading = "Step Into Opportunities That Match Your Ambition.";
      subheading = "Find jobs made for your skills, apply with confidence, and unlock the next chapter in your career journey.";
      primaryBtn = "Browse Jobs";
      secondaryBtn = "View Applications";
      image = "jobSeekerImage.jpg";
    } else if (user.role === "recruiter") {
      heading = `Discover Talent. Build Exceptional Teams.`;
      subheading = "Post jobs, connect with the best candidates, and make smarter hiring decisions — faster, easier, better.";
      primaryBtn = "Post a Job";
      secondaryBtn = "Manage Applicants";
      image = "recruiterImage.jpg";
    }
  }

  return (
    <section className="w-full py-14 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">{heading}</h1>
          <p className="mt-6 text-gray-600 text-lg max-w-xl">{subheading}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button className="bg-purple-600">{primaryBtn}</Button>
            <Button variant="outline" className="border-purple-600 text-purple-600">{secondaryBtn}</Button>
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
