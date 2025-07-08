// prompts.js
const { getChatGPTResponse } = require("./openai");

async function generateInstagramCaption(topic) {
  const prompt = `
You are an expert Instagram content creator.
Write a short, professional caption based on the topic below.

Topic: "${topic}"

Requirements:
- First line should grab attention
- 2–3 sentence insight in a professional tone
- End with a soft CTA (e.g., "Follow for more")
- Max 300 characters
  `;

  const response = await getChatGPTResponse(prompt);
  return `📸 *Instagram Caption:*\n\n${response}`;
}

async function generateYouTubeContent(topic) {
  const prompt = `
You are a professional YouTube marketer.

Generate a compelling video title and a 1-paragraph description for the following topic:
"${topic}"

Requirements:
- Title should be attention-grabbing (max 80 characters)
- Description should summarize value clearly
- Use a professional tone

Output Format:
Title: ...
Description: ...
  `;

  const response = await getChatGPTResponse(prompt);
  return `🎥 *YouTube Content:*\n\n${response}`;
}

module.exports = {
  generateInstagramCaption,
  generateYouTubeContent,
};
