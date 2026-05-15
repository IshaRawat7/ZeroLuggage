import axios from "axios"

export const sendEmail = async (
  to: string,
  subject: string,
  text: string
) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Zero Luggage",
          email: process.env.SENDER_EMAIL,
        },

        to: [
          {
            email: to,
          },
        ],

        subject,

        htmlContent: `
          <div style="font-family:sans-serif;padding:20px;">
            <h2>${subject}</h2>
            <pre style="white-space:pre-wrap;font-family:sans-serif;">
${text}
            </pre>
          </div>
        `,
      },

      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    )

    console.log("✅ Email sent:", response.data)
  } catch (error: any) {
    console.error(
      "❌ Brevo API Error:",
      error?.response?.data || error.message
    )
  }
}