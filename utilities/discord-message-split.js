function splitMessage(message, { maxLength = 2000 } = {}) {
  if (message.length <= maxLength) return [message];

  const splitMessages = [];
  let currentMessage = "";

  for (const word of message.split(" ")) {
    if (currentMessage.length + word.length + 1 > maxLength) {
      splitMessages.push(currentMessage);
      currentMessage = "";
    }
    currentMessage += (currentMessage ? " " : "") + word;
  }

  if (currentMessage) {
    splitMessages.push(currentMessage);
  }

  return splitMessages;
}

module.exports = { splitMessage };
