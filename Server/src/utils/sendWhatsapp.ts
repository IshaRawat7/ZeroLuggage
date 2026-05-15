import axios from "axios"

type SendWhatsAppParams = {
  phone: string
  message: string
}

export const sendWhatsAppMessage = async ({
  phone,
  message,
}: SendWhatsAppParams) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: {
          body: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    )

    console.log("✅ WhatsApp message sent:", response.data)

    return {
      success: true,
      data: response.data,
    }
  } catch (error: any) {
    console.error(
      "❌ WhatsApp Error:",
      error?.response?.data || error.message
    )

    return {
      success: false,
      error: error?.response?.data || error.message,
    }
  }
}