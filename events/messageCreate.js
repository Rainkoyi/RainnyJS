const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Check if bot is mentioned
    const mentionedBot = message.mentions.has(message.client.user);

    // Check if message is a reply to the bot
    let isReplyToBot = false;
    if (message.reference) {
      try {
        const repliedMessage = await message.channel.messages.fetch(
          message.reference.messageId
        );
        isReplyToBot = repliedMessage.author.id === message.client.user.id;
      } catch (error) {
        console.error("Error fetching referenced message:", error);
      }
    }

    // Respond to mentions or replies
    if (mentionedBot || isReplyToBot) {
      // Customize your response here
      const response = `Hey ${message.author}, you mentioned or replied to me! How can I help?`;

      // Send response with a mention
      await message.reply({
        content: response,
        allowedMentions: { repliedUser: true },
      });
    }
  },
};
