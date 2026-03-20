import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendHiredEmail = async (candidateEmail, candidateName, jobTitle, companyName) => {
  await transporter.sendMail({
    from: `"Job Portal" <${process.env.EMAIL_USER}>`,
    to: candidateEmail,
    subject: `Congratulations! You've been hired at ${companyName}`,
    html: `
      <h2>Congratulations ${candidateName}!</h2>
      <p>You have been <b>selected</b> for the position of <b>${jobTitle}</b> at <b>${companyName}</b>.</p>
      <p>Welcome aboard!</p>
    `
  })
}

export { sendHiredEmail };