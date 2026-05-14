import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",

  port: 465,
  secure: true,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  try {
    const response = await transporter.sendMail({
      from: `"Zero Luggage" <${process.env.SENDER_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", response.messageId);

    return true;
  } catch (err: any) {
    console.error("❌ SMTP error:", err);

    return false;
  }
};
