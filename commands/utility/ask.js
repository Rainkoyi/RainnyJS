const { SlashCommandBuilder } = require("discord.js");
const { getLLMResponse } = require("../../utilities/llm");
const { splitMessage } = require("../../utilities/discord-message-split");
const {
  getUserMemory,
  updateUserMemory,
} = require("../../utilities/db-chatbot-memory.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Ask the AI a question")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("Your question for the AI")
        .setRequired(true)
    ),

  async execute(interaction) {
    // Defer reply while processing
    await interaction.deferReply();
    const userMessage = interaction.options.getString("prompt");
    const userName = interaction.user.displayName;
    const userId = interaction.user.id;
    const botName = interaction.client.user.displayName;
    const memory = await getUserMemory(userId);
    const prompt = `${memory}\n${userName}:\n${userMessage}\n${botName}:\n`;

    // Get AI response and split in case of long messages
    const response = await getLLMResponse(prompt);
    const messages = splitMessage(response);
    console.log(messages);

    // store memory
    const newMemory = `${prompt}${response}`;
    await updateUserMemory(userId, newMemory);
    console.log(newMemory);

    // Send messages as a reply to the interaction
    await interaction.editReply(messages[0]);
    for (let i = 1; i < messages.length; i++) {
      await interaction.followUp(messages[i]);
    }
  },
};
