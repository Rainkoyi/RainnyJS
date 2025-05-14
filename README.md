# RainnyJS

RainnyJS is a Discord bot written in NodeJS. It supports PostgreSQL for database as well as chatbot features using the OpenRouter platform.

# Installation
Clone the repository
```
https://github.com/Rainkoyi/RainnyJS.git
```
## Prerequisites
- The latest LTS version of NodeJS: https://nodejs.org/
- Docker desktop: https://www.docker.com/products/docker-desktop/

## Configuration
Create a file called `.env` in the root directory that includes the following
```env
# Application Environment
PORT=
# Discord
API_KEY=
BOT_ID=
SERVER_ID=
# OpenRouter
LLM_KEY=
LLM_MODEL=
LLM_CONTEXT_LENGTH=<int>
# Database
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```
## Setup
Go to the root directory of the project and run the following command to install the dependencies:
```
cd RainnyJS
npm install
```
Set up the postgres database using Docker:
```
docker-compose up --build
```
Create tables and register commands
```
node createTable.js
node deploy-commands.js
```
Start the bot
```
node .
```

## Useful commands

- `docker-compose down -v` to delete container if envs have been changed
- `node deploy-commands.js` to register commands if new commands have been added or changed
- `node createTable.js` to create tables if new tables have been added or changed

# Send message in channel
To send a message `Hello world!` to a Discord channel with id `123`
```powershell
curl -Method POST http://localhost:3001/send-message `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{ "channel": "123", "message": "Hello world!" }'
```

# Send ban embed message in channel
To send a ban embed message to a Discord channel with id `1365476539558268988`
```powershell
curl -Method POST http://localhost:3001/send-ban-embed `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{ "channel": "1365476539558268988", "message": "I was just wondering how you knew",
  "username": "tofutheloafu", "platform": "twitch"}'
```

# Useful documentation pages
https://discord.js.org/docs/packages/discord.js/14.19.3/CommandInteraction:Class
https://discord.js.org/docs/packages/discord.js/14.19.3/Client:Class
https://discord.js.org/docs/packages/discord.js/14.19.3/TextChannel:Class