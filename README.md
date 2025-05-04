Run `node .` in the base dir to start the bot

# Send message in channel
To send a message `Hello world!` to a Discord channel with id `123`
```powershell
curl -Method POST http://localhost:3001/send-message `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{ "channel": "123", "message": "Hello world!" }'
```