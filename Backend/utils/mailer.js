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
        <h2>Congratulations ${candidateName}!</h2>
        <p>You have been <b>selected</b> for the position of <b>${jobTitle}</b> at <b>${companyName}</b>.</p>
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