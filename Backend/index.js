import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pipeline } from "@xenova/transformers";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ===== Rule-based data =====
const greetings = ["hi", "hello", "hey", "hy", "hii","hlo"];
const knowledgeBase = [
  {
    keywords: ["what", "zeroluggage"],
    reply:
      "ZeroLuggage is a platform that allows travelers to securely store their luggage at verified locations.",
  },
  {
    keywords: ["book", "booking", "slot"],
    reply:
      "To book a slot: Login → Choose location → Select date & time → Confirm booking.",
  },
  {
    keywords: ["safe", "security"],
    reply:
      "Yes, your luggage is safe. All storage partners are verified and monitored.",
  },
  {
    keywords: ["contact", "support", "help"],
    reply:
      "You can contact us via the Contact page or email support@zeroluggage.com.",
  },
  {
    keywords: ["price", "cost", "fee"],
    reply:
      "Pricing depends on duration and location. Exact prices are shown during booking.",
  },
  {
    keywords: ["cancel", "cancellation", "refund"],
    reply:
      "You can cancel your booking anytime before the start time. Refunds depend on the cancellation policy shown during booking.",
  },
  {
    keywords: ["location", "where", "places"],
    reply:
      "ZeroLuggage partners with verified storage locations in major cities. You can view available spots in the app or website.",
  },
  {
    keywords: ["time", "hours", "open", "closing"],
    reply:
      "Storage hours vary by partner location. Exact timings are displayed when you select a spot.",
  },
  {
    keywords: ["lost", "missing", "stolen"],
    reply:
      "In case of lost or stolen luggage, contact support immediately. All partners are verified and monitored to minimize risks.",
  },
  {
    keywords: ["payment", "pay", "method", "card"],
    reply:
      "We accept major credit/debit cards and digital wallets. Payment options are shown at checkout.",
  },
  {
    keywords: ["discount", "offer", "coupon"],
    reply:
      "Occasional discounts or promo codes may be available. Check the app or website for current offers.",
  },
  {
    keywords: ["register", "signup", "account", "login"],
    reply:
      "To register: Click Sign Up → Enter details → Verify email → Start booking.",
  },
  {
    keywords: ["language", "support", "translate"],
    reply:
      "ZeroLuggage supports multiple languages. You can change your preferred language in settings.",
  },
  // ===== Fun & Casual Queries =====
  {
    keywords: ["joke", "funny", "laugh"],
    reply:
      "Why don’t scientists trust atoms? Because they make up everything! 😄",
  },
  {
    keywords: ["weather", "forecast", "temperature"],
    reply:
      "I can’t fetch live weather yet, but checking a weather app will give you the latest forecast 🌤️.",
  },
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    reply:
      "Hello 👋 How’s your day going?",
  },
  {
    keywords: ["thanks", "thankyou", "thank","nice"],
    reply:
      "You’re welcome! Happy to help 😊",
  },
  {
    keywords: ["bye", "goodbye", "see you",],
    reply:
      "Goodbye 👋 Have a great day!",
  },
];


// ===== Rule-based reply =====
function getRuleBasedReply(message) {
  const words = message.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);

  if (words.some((w) => greetings.includes(w))) {
    return "Hello 👋 How can I help you with ZeroLuggage?";
  }

  for (const item of knowledgeBase) {
    if (item.keywords.some((k) => words.includes(k))) {
      return item.reply;
    }
  }

  return null;
}

// ===== Local AI using Xenova/distilgpt2 =====
let generator;

async function generateAIReply(message) {
  try {
    const prompt = `User: ${message}\nAssistant:`;
    const result = await generator(prompt, {
      max_new_tokens: 50,
      stop: ["User:"],
    });

    // Remove repeated "Assistant:" and trim output
    const raw = result?.[0]?.generated_text || "";
    const cleaned = raw.split("Assistant:").pop().trim();
    return cleaned || null;
  } catch (err) {
    console.error("⚠️ Local AI failed:", err.message);
    return null;
  }
}

// ===== /chat endpoint =====
app.post("/chat", async (req, res) => {
  const message = req.body.message?.trim();
  if (!message) return res.json({ reply: "Hi 👋 How can I help you?" });

  // Rule-based first
  const ruleReply = getRuleBasedReply(message);
  if (ruleReply) return res.json({ reply: ruleReply });

  // AI fallback
  const aiReply = await generateAIReply(message);

  res.json({
    reply: aiReply || "Sorry, I'm unable to answer that right now. Please try again later.",
  });
});


// ===== Load model first, then start server =====
(async () => {
  console.log("⏳ Loading AI model (Xenova/distilgpt2)...");
  generator = await pipeline("text-generation", "Xenova/distilgpt2");
  console.log("✅ Model loaded successfully!");

  app.listen(5000, () =>
    console.log("✅ Chatbot backend running at http://localhost:5000")
  );
})();
