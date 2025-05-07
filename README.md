
Run `node .` in the base dir to start the bot
Run `docker-compose up -d` in base dir to start the database
Run `docker-compose down -v` to delete container if envs are changed

# Send message in channel
To send a message `Hello world!` to a Discord channel with id `123`
```powershell
curl -Method POST http://localhost:3001/send-message `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{ "channel": "123", "message": "Hello world!" }'
```

# Useful documentation pages
https://discord.js.org/docs/packages/discord.js/14.19.3/CommandInteraction:Class
https://discord.js.org/docs/packages/discord.js/14.19.3/Client:Class
https://discord.js.org/docs/packages/discord.js/14.19.3/TextChannel:Class