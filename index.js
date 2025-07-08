// index.js
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { generateInstagramCaption, generateYouTubeContent } = require("./prompts");

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `👋 Welcome to *Instabot* – your AI-powered content assistant!

Choose a platform to generate content for:
`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Instagram", callback_data: "instagram" },
            { text: "YouTube", callback_data: "youtube" },
          ],
        ],
      },
      parse_mode: "Markdown",
    }
  );
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `❓ *Instabot Help*

Use /start to begin.
Then choose a platform and enter a topic (e.g., "startup tips").

I'll send you a professional caption or video idea instantly.`,
    { parse_mode: "Markdown" }
  );
});

const userState = {};

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  userState[chatId] = { platform: data };

  bot.sendMessage(chatId, `Great! Please enter your topic or idea:`);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  // Ignore /start and /help here
  if (msg.text.startsWith("/")) return;

  const state = userState[chatId];
  if (!state || !state.platform) {
    return bot.sendMessage(chatId, "Please type /start to begin.");
  }

  const topic = msg.text;
  bot.sendMessage(chatId, "⏳ Generating your content...");

  try {
    let response;
    if (state.platform === "instagram") {
      response = await generateInstagramCaption(topic);
    } else if (state.platform === "youtube") {
      response = await generateYouTubeContent(topic);
    }
    bot.sendMessage(chatId, response);
  } catch (err) {
    bot.sendMessage(chatId, "❌ Something went wrong. Please try again later.");
    console.error(err);
  }
});
