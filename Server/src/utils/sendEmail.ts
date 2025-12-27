import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
export const sendEmail = async (to: string, subject: string, text: string) => {
  const msg = {
    to,
    from: process.env.EMAIL_USER!,
    replyTo: process.env.EMAIL_USER!,
    subject,
    text,
  };
 try {
  await sgMail.send(msg);
  console.log("✅ Email sent");
} catch (err: any) {
  console.error("⚠️ SendGrid error:", err.response?.body || err.message);
}

};
