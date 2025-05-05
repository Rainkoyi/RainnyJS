const { SlashCommandBuilder } = require("discord.js");

// tutorial
// https://discordjs.guide/slash-commands/parsing-options.html#subcommands

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bq")
    .setDescription("Command for all interactions with BoobQuest.")
    .addSubcommand(subcommand => subcommand
			.setName('paycheck')
			.setDescription('Get some money (cooldown: 1h).')
    )
    .addSubcommand(subcommand => subcommand
			.setName('buyfruit')
			.setDescription('Test subcommand.')
     //  .addStringOption(option => option
     //    .setName('fruit')
     //    .setDescription('Test parameter.')
    	// 	.setRequired(true)
    	// 	.addChoices(
    	// 		{ name: 'Lemon', value: 'lemon' },
    	// 		{ name: 'Apple', value: 'apple' },
    	// 		{ name: 'Pear', value: 'pear' }
    	// 	)
    	// )
    )
  ,
  async execute(interaction) {

    switch(interaction.options.getSubcommand()) {
      case "paycheck":
        await interaction.reply("You chose paycheck.");
        break;
      case "buyfruit":
        await interaction.reply("You chose buyfruit.");
        // await interaction.reply("You chose " + interaction.options.getString('testchoice') + ".");
        break;
    }
  }
};
