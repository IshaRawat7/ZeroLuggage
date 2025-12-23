import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

// Knowledge base (business logic)
const knowledgeBase = [
  {
    keywords: ["what", "zeroluggage"],
    reply:
      "ZeroLuggage is a platform that allows travelers to securely store their luggage at verified locations."
  },
  {
    keywords: ["book", "booking", "slot"],
    reply:
      "To book a slot: Login → Choose location → Select date & time → Confirm booking."
  },
  {
    keywords: ["safe", "security"],
    reply:
      "Yes, your luggage is safe. All storage partners are verified and monitored."
  },
  {
    keywords: ["contact", "support", "help"],
    reply:
      "You can contact us via the Contact page or email support@zeroluggage.com."
  },
  {
    keywords: ["price", "cost", "fee"],
    reply:
      "Pricing depends on duration and location. Exact prices are shown during booking."
  }
]

// Small talk & greetings
const greetings = ["hi", "hello", "hey", "hii", "hy"]
const thanks = ["thanks", "thank you", "thx"]
const goodbyes = ["bye", "goodbye", "see you"]
const howAreYou = ["how are you", "how r you"]
const helpIntent = ["what can you do", "help me", "features"]

function getReply(message) {
  const msg = message.toLowerCase()

  // 1️⃣ Greetings
  if (greetings.some((g) => msg.includes(g))) {
    return "Hello 👋 How can I help you with ZeroLuggage?"
  }

  // 2️⃣ How are you
  if (howAreYou.some((h) => msg.includes(h))) {
    return "I'm doing great 😊 Ready to help you with ZeroLuggage!"
  }

  // 3️⃣ Thanks
  if (thanks.some((t) => msg.includes(t))) {
    return "You're welcome 😊 Happy to help!"
  }

  // 4️⃣ Goodbye
  if (goodbyes.some((b) => msg.includes(b))) {
    return "Goodbye 👋 Have a great journey!"
  }

  // 5️⃣ Help intent
  if (helpIntent.some((h) => msg.includes(h))) {
    return "I can help you with booking slots, safety, pricing, and general information about ZeroLuggage."
  }

  // 6️⃣ Business knowledge
  for (const item of knowledgeBase) {
    let matchCount = 0
    item.keywords.forEach((word) => {
      if (msg.includes(word)) matchCount++
    })
    if (matchCount >= 1) return item.reply
  }

  // 7️⃣ Fallback
  return "I'm not sure about that 🤔 You can ask me about booking, safety, pricing, or contact details."
}

app.post("/chat", (req, res) => {
  const { message } = req.body
  const reply = getReply(message)
  res.json({ reply })
})

app.listen(5000, () => {
  console.log("✅ Smart chatbot backend running at http://localhost:5000")
})
