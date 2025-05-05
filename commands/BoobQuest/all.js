const { SlashCommandBuilder } = require("discord.js");

// tutorial
// https://discordjs.guide/slash-commands/parsing-options.html#subcommands

// https://i.pinimg.com/236x/9d/0f/a3/9d0fa3da5c7d68f800baf1dcbbb76e70.jpg
// Cup Size: DD (:coin:+11/paycheck)

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

        let betColor = interaction.options.getString("color");
        let resultColor = Math.floor(Math.random() * 2) == 0 ? "red" : "black";

        if (betColor === resultColor) {
          await interaction.reply("You bet on " + betColor + " and won! You won 🪙" + interaction.options.getInteger("wager") + " (new balance: $0).");
        } else {
          await interaction.reply("You bet on " + betColor + ", but it's " + resultColor + "! You lost 🪙" + interaction.options.getInteger("wager") + " (remaining balance: $0).");
        }
        break;
    }
  }
};
