FROM node:22.15.0-alpine3.20

WORKDIR /home/node/app

# Copy package.json and package-lock.json
# Install dependencies
COPY package*.json ./
RUN npm install

# Copy ALL other files
COPY . .

# Commands to run before starting the server
RUN node deploy-commands.js
RUN node createTable.js

# Expose the port your Express server is running on
EXPOSE 3001
CMD ["node", "index.js"]