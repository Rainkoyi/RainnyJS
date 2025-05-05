require("dotenv").config();
const LLM_KEY = process.env.LLM_KEY;

fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${LLM_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "deepseek/deepseek-chat-v3-0324:free",
    messages: [
      {
        role: "user",
        content: "What is the meaning of life?",
      },
    ],
  }),
})
  .then((response) => response.json()) // Parse JSON response
  .then((data) => {
    // Extract the response text
    const answer = data.choices[0].message.content;
    console.log("Response:", answer);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
