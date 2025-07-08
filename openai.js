// openai.js
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatGPTResponse(prompt) {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful content generation assistant." },
      { role: "user", content: prompt },
    ],
    max_tokens: 300,
  });

  return chatCompletion.choices[0].message.content.trim();
}

module.exports = {
  getChatGPTResponse,
};
