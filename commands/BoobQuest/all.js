// tutorial
// https://discordjs.guide/slash-commands/parsing-options.html#subcommands

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const cashEmoji = "<:diamondwebp:1368797185235488868>";

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
    .addSubcommand(subcommand => subcommand
      .setName("testembed")
      .setDescription("Test waifu embeds.")
    )
    .addSubcommand(subcommand => subcommand
      .setName("me")
      .setDescription("See your own BoobQuest profile.")
    )
    .addSubcommand(subcommand => subcommand
      .setName("user")
      .setDescription("See others' BoobQuest profile.")
      .addUserOption(option => option.setName("user").setDescription("The user whose profile you want to see.")))
    )
  ,
  async execute(interaction) {

    switch(interaction.options.getSubcommand()) {
        
      case "paycheck":
        await interaction.reply("You didn't get paid 'cuz I HATE you.");
        break;
        
      case "roulette":
        let betColor = interaction.options.getString("color");
        let resultColor = Math.floor(Math.random() * 2) == 0 ? "red" : "black";

        if (betColor === resultColor) {
          await interaction.reply(`You bet on ${betColor} and won! You won ${interaction.options.getInteger("wager") + cashEmoji} (new balance: 0${cashEmoji}).`);
        } else {
          await interaction.reply(`You bet on ${betColor}, but it's ${resultColor}! You lost ${interaction.options.getInteger("wager") + cashEmoji} (remaining balance: 0${cashEmoji}).`);
        }
        break;

      case "testembed":
        await interaction.reply({ embeds: [
          new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Uzaki Hana")
            // .setDescription('Some description here')
            .setThumbnail("https://ih1.redbubble.net/image.4598705569.7727/raf,360x360,075,t,fafafa:ca443f4786.jpg")
            .addFields(
              { name: "Cup Size", value: `DD (+11${cashEmoji}/paycheck)` },
              { name: "From", value: "*Uzaki-chan Wants to Hang Out!*" },
            )
            .setFooter({ text: "BoobQuest" })
        ] });
        break;

      case "me":
      case "user":
        await interaction.reply("You want to see a profile.");
        break;
    }
  }
};
