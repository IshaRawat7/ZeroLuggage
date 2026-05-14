import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string
) => {
  try {
    const response = await transporter.sendMail({
      from: `"Zero Luggage" <${process.env.SENDER_EMAIL}>`,
      to,
      subject,

      html: `
        <div style="font-family:sans-serif;padding:20px;">
          <h2>${subject}</h2>
          <p>${text}</p>
        </div>
      `,
    });

    console.log("✅ Email sent:", response.messageId);

    return true;
  } catch (err: any) {
    console.error("❌ SMTP error:", err);

    return false;
  }
};
