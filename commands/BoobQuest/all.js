const { SlashCommandBuilder } = require("discord.js");

// tutorial
// https://discordjs.guide/slash-commands/parsing-options.html#subcommands

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bq")
    .setDescription("Command for all interactions with BoobQuest.")
    .addSubcommand(subcommand => subcommand
      .setName("paycheck")
      .setDescription("Get some money (cooldown: 1h).")
    )
    .addSubcommand(subcommand => subcommand
      .setName("roulette")
      .setDescription("Gamble.")
      .addIntegerOption(option => option
        .setName("wager")
        .setDescription("How much money you want to bet.")
        .setRequired(true)
      )
      .addStringOption(option => option
        .setName("color")
        .setDescription("What color you're betting on.")
        .setRequired(true)
        .addChoices(
          { name: "Red", value: "red" },
          { name: "Black", value: "black" }
        )
      )
    )
  ,
  async execute(interaction) {

    switch(interaction.options.getSubcommand()) {
      case "paycheck":
        await interaction.reply("You chose paycheck.");
        break;
      case "roulette":
        await interaction.reply("You bet on " + interaction.options.getString("color") + ", but it's green! You lost $" + interaction.options.getInteger("wager") + ".");
        break;
    }
  }
};
