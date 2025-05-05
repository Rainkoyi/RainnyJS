const { SlashCommandBuilder } = require("discord.js");
const { getLLMResponse } = require("../../services/llm");

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
    try {
      // Defer reply while processing
      await interaction.deferReply();

      const prompt = interaction.options.getString("prompt");

      // Get AI response
      const response = await getLLMResponse(prompt);

      // 2000 character limit for Discord messages
      await interaction.editReply({
        content: response.slice(0, 2000),
        allowedMentions: { users: [interaction.user.id] },
      });
    } catch (error) {
      console.error("Ask command error:", error);
      await interaction.editReply(
        "Failed to get AI response. Please try again later."
      );
    }
  },
};
