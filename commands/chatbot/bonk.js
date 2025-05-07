const { SlashCommandBuilder } = require("discord.js");
const { clearUserMemory } = require("../../utilities/db-chatbot-memory.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("bonk")
    .setDescription("Erase the bot's memory of you"),
  async execute(interaction) {
    const userId = interaction.user.id;
    await clearUserMemory(userId);
    await interaction.reply("Ow! Memory... gone. Brain... fuzzy...");
  },
};
