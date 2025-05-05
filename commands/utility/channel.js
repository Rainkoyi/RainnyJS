const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("channel")
    .setDescription("Get current channel information."),
  async execute(interaction) {
    interaction.module;
    const channelID = interaction.channel.id;
    const channelName = interaction.channel.name;
    const channelType = interaction.channel.type;
    await interaction.reply(
      "Your current channel is " +
        channelName +
        " (" +
        channelID +
        ") of type " +
        channelType +
        "."
    );
  },
};
