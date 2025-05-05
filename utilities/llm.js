require("dotenv").config();
const LLM_KEY = process.env.LLM_KEY;
const LLM_MODEL = process.env.LLM_MODEL;

async function getLLMResponse(prompt) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LLM_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: LLM_MODEL,
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("LLM API Error:", error);
    return "Sorry, I'm having trouble thinking right now.";
  }
}

module.exports = { getLLMResponse };
