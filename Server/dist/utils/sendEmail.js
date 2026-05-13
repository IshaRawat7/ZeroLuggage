"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
const sendEmail = async (to, subject, text) => {
    try {
        const response = await resend.emails.send({
            from: "ishurawat267@gmail.com", // works without domain
            to,
            subject,
            html: `<p>${text}</p>`,
        });
        console.log("✅ Email sent:", response);
    }
    catch (err) {
        console.error("❌ Resend error:", err.message || err);
    }
};
exports.sendEmail = sendEmail;
