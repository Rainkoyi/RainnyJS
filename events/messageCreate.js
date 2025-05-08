const { Events } = require("discord.js");
const { getLLMResponse } = require("../utilities/llm");
const { splitMessage } = require("../utilities/discord-message-split");
const {
  getUserMemory,
  updateUserMemory,
} = require("../utilities/db-chatbot-memory.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Check if bot is mentioned
    const mentionedBot = message.mentions.has(message.client.user);

    // Check if message is a reply to the bot
    let isReplyToBot = false;
    if (message.reference) {
      try {
        const repliedMessage = await message.channel.messages.fetch(
          message.reference.messageId
        );
        isReplyToBot = repliedMessage.author.id === message.client.user.id;
      } catch (error) {
        console.error("Error fetching referenced message:", error);
      }
    }

    // Respond to mentions or replies
    if (mentionedBot || isReplyToBot) {
      // Show typing indicator
      await message.channel.sendTyping();
      const botName = message.client.user.displayName;
      const botId = message.client.user.id;
      const userMessage = message.content.replaceAll(`<@${botId}>`, "");
      const userName = message.author.displayName;
      const userId = message.author.id;
      const memory = await getUserMemory(userId);
      const prompt = `${memory}\n${userName}:\n${userMessage}\n${botName}:\n`;

      // Read character settings from file and replace placeholders
      const filePath = path.join(__dirname, "../test.txt");
      const characterSettings = fs
        .readFileSync(filePath, "utf8")
        .replaceAll("{{user}}", userName)
        .replaceAll("{{char}}", botName);
      // Get AI response and split in case of long messages
      const input = characterSettings + prompt;
      console.log("Input to LLM:", input);
      const response = await getLLMResponse(input);
      const messages = splitMessage(response);
      console.log("Response from LLM:", response);

      // store memory
      const newMemory = `${prompt}${response}`;
      await updateUserMemory(userId, newMemory);
      console.log("Updated memory:", newMemory);

      // Send response with a mention
      await message.reply({
        content: messages[0],
        allowedMentions: { repliedUser: true },
      });
      for (let i = 1; i < messages.length; i++) {
        await message.channel.send(messages[i]);
      }
    }
  },
};
