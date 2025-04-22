// import nodemailer from "nodemailer";

// export async function sendVerificationEmail(to, token) {
//   const transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const verifyURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${token}`;

//   await transport.sendMail({
//     from: `"MyApp" <${process.env.EMAIL_USER}>`,
//     to,
//     subject: "Verify your email",
//     html: `<p>Click <a href="${verifyURL}">here</a> to verify your email.</p>`,
//   });
// }


import nodemailer from "nodemailer";

export async function sendVerificationEmail(email, link) {
  let transporter = nodemailer.createTransport({
    service: "gmail", // or any SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Next Auth" <${process.env.EMAIL}>`,
    to: email,
    subject: "Verify your Email",
    html: `<p>Click <a href="${link}">here</a> to verify your email.</p>`,
  });
}
