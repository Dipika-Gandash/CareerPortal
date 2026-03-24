import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendHiredEmail = async (candidateEmail, candidateName, jobTitle, companyName) => {
 try {
    const info = await transporter.sendMail({
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to: candidateEmail,
      subject: `Congratulations! You've been hired at ${companyName}`,
      html: `
        <h4>Congratulations ${candidateName}!</h4>
        <p>Hi ${candidateName}, you are hired for ${jobTitle} at ${companyName}</p>
        <p>Welcome aboard!</p>
      `
    });

    console.log("Hired email sent:", info.response);
  } catch (error) {
    console.error("Hired email error:", error.message);
    throw error; 
  }
}

 const sendRecruiterStatusEmail = async (recruiterEmail, recruiterName, isBlocked) => {
  try {
    const info = await transporter.sendMail({
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to: recruiterEmail,
      subject: isBlocked ? "Your account has been blocked" : "Your account has been unblocked",
      html: isBlocked ? `
        <h2>Hello ${recruiterName},</h2>
        <p>Your recruiter account has been <b>blocked</b>.</p>
      ` : `
        <h2>Hello ${recruiterName},</h2>
        <p>Your recruiter account has been <b>unblocked</b>.</p>
      `
    });

    console.log("Recruiter email sent:", info.response);
  } catch (error) {
    console.error("Recruiter email error:", error.message);
    throw error;
  }
}

export { sendHiredEmail , sendRecruiterStatusEmail};