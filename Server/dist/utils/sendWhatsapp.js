"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWhatsAppMessage = void 0;
const axios_1 = __importDefault(require("axios"));
const sendWhatsAppMessage = async ({ phone, message, }) => {
    try {
        const response = await axios_1.default.post(`https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
            messaging_product: "whatsapp",
            to: phone,
            type: "text",
            text: {
                body: message,
            },
        }, {
            headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                "Content-Type": "application/json",
            },
        });
        console.log("✅ WhatsApp message sent:", response.data);
        return {
            success: true,
            data: response.data,
        };
    }
    catch (error) {
        console.error("❌ WhatsApp Error:", error?.response?.data || error.message);
        return {
            success: false,
            error: error?.response?.data || error.message,
        };
    }
};
exports.sendWhatsAppMessage = sendWhatsAppMessage;
