// openai.js
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getChatGPTResponse(prompt) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful content generation assistant." },
      { role: "user", content: prompt },
    ],
    max_tokens: 300,
  });

  return completion.data.choices[0].message.content.trim();
}

module.exports = {
  getChatGPTResponse,
};
