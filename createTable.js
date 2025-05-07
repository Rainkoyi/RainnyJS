const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const query = `
  CREATE TABLE IF NOT EXISTS memories (
    user_id VARCHAR(100) PRIMARY KEY,
    memory TEXT NOT NULL
  );
`;
const createTable = async () => {
  try {
    await client.connect();

    await client.query(query);
    console.log("Table created or already exists.");
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    await client.end();
  }
};

createTable();
