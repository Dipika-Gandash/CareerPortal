import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendHiredEmail = async (candidateEmail, candidateName, jobTitle, companyName) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Career Portal <onboarding@resend.dev>",
      to: candidateEmail,
      subject: `Congratulations! You've been hired at ${companyName}`,
      html: `
        <h4>Congratulations ${candidateName}!</h4>
        <p>Hi ${candidateName}, you are hired for ${jobTitle} at ${companyName}</p>
        <p>Welcome aboard!</p>
      `
    });

    if (error) throw new Error(error.message);
    console.log("Hired email sent:", data.id);
  } catch (error) {
    console.error("Hired email error:", error.message);
    throw error;
  }
};

const sendRecruiterStatusEmail = async (recruiterEmail, recruiterName, isBlocked) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Career Portal <onboarding@resend.dev>",
      to: recruiterEmail,
      subject: isBlocked ? "Your account has been blocked" : "Your account has been unblocked",
      html: isBlocked ? `
        <h4>Hello ${recruiterName},</h4>
        <p>Your recruiter account has been <b>blocked</b>.</p>
      ` : `
        <h4>Hello ${recruiterName},</h4>
        <p>Your recruiter account has been <b>unblocked</b>.</p>
      `
    });

    if (error) throw new Error(error.message);
    console.log("Recruiter email sent:", data.id);
  } catch (error) {
    console.error("Recruiter email error:", error.message);
    throw error;
  }
};

export { sendHiredEmail, sendRecruiterStatusEmail };
