const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bq")
    .setDescription("Command for all interactions with BoobQuest.")
    .addStringOption(option =>
  		option.setName('testchoice')
  			.setDescription('A test parameter.')
  			.setRequired(true)
  			.addChoices(
  				{ name: 'Lemon', value: 'lemon' },
  				{ name: 'Apple', value: 'apple' },
  				{ name: 'Pear', value: 'pear' }
			  )
      ),
  async execute(interaction) {
    await interaction.reply("You chose " + interaction.options.getString('testchoice') + ".");
  }
};
