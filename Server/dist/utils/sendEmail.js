"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const axios_1 = __importDefault(require("axios"));
const sendEmail = async (to, subject, text) => {
    try {
        const response = await axios_1.default.post("https://api.brevo.com/v3/smtp/email", {
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
        }, {
            headers: {
                accept: "application/json",
                "api-key": process.env.BREVO_API_KEY,
                "content-type": "application/json",
            },
        });
        console.log("✅ Email sent:", response.data);
    }
    catch (error) {
        console.error("❌ Brevo API Error:", error?.response?.data || error.message);
    }
};
exports.sendEmail = sendEmail;
