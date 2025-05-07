const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL!");

    const res = await client.query("SELECT NOW()");
    console.log(res.rows[0]);

    await client.end();
  } catch (err) {
    console.error("Connection error", err.stack);
  }
}

connectDB();
