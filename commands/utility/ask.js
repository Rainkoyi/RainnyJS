const { SlashCommandBuilder } = require("discord.js");
const { getLLMResponse } = require("../../utilities/llm");
const { splitMessage } = require("../../utilities/discord-message-split");

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

    const prompt = interaction.options.getString("prompt");

    // Get AI response and split in case of long messages
    const response = await getLLMResponse(prompt);
    const messages = splitMessage(response);

    // Send messages as a reply to the interaction
    await interaction.editReply(messages[0]);
    for (let i = 1; i < messages.length; i++) {
      await interaction.followUp(messages[i]);
    }
  },
};
