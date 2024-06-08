// import nodemailer from "nodemailer";

// export async function sendEmail({
//   subject,
//   contact,
//   message,
// }: {
//   subject: string;
//   contact: string;
//   message?: string;
// }) {
//   const smtpTransport = nodemailer.createTransport({
//     service: "Gmail",
//     host: "smtp.gmail.com",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });
//   const mailOptions = {
//     from: contact,
//     to: process.env.EMAIL_USER,
//     subject: subject,
//     text: message,
//   };

//   let result;
//   let error;
//   smtpTransport.sendMail(mailOptions, function (error, response) {
//     if (error) {
//       console.log(error);
//     }
//     result = response;
//   });

//   return { result, error };
// }

// export async function sendRecoverEmail(email: string, msg?: string) {
//   const from = "suporte";
//   const message = msg;
//   const to = email;
//   const smtpTransport = nodemailer.createTransport({
//     service: "Gmail",
//     host: "smtp.gmail.com",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });
//   const mailOptions = {
//     from: from,
//     to: to,
//     subject: "Recuperação de senha - Não responda",
//     text: message,
//   };

//   let result;
//   let error;
//   smtpTransport.sendMail(mailOptions, function (error, response) {
//     if (error) {
//       console.log(error);
//     }
//     result = response;
//   });

//   return { result, error };
// }
