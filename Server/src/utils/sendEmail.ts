import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendEmail = async (
  to: string,
  subject: string,
  text: string
) => {
  try {
    const response = await resend.emails.send({
      from: "ishurawat267@gmail.com", // works without domain
      to,
      subject,
      html: `<p>${text}</p>`,
    });


    console.log("✅ Email sent:", response); 
  } catch (err: any) {
    console.error("❌ Resend error:", err.message || err);
  }
};