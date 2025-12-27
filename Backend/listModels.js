import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function testHF() {
  try {
    const res = await axios.post(
      "https://router.huggingface.co/hf-inference/models/HuggingFaceH4/zephyr-7b-beta",
      { inputs: "Say hello" },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACEHUB_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    console.log("✅ HF response:", res.data);
  } catch (err) {
    console.error("❌ HF error:", err.response?.data || err.message);
  }
}

testHF();
