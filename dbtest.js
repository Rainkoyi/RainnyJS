const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "myuser",
  password: "mypassword",
  database: "mydatabase",
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
