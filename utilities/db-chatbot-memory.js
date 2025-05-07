const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function getUserMemory(userId) {
  try {
    const res = await pool.query(
      "SELECT memory FROM memories WHERE user_id = $1",
      [userId]
    );
    if (res.rowCount > 0 && res.rows[0].memory) {
      return res.rows[0].memory;
    } else {
      return "";
    }
  } catch (err) {
    console.error("Error getting user memory:", err);
    return "";
  }
}

async function updateUserMemory(userId, newMemory) {
  const contextLength = parseInt(process.env.LLM_CONTEXT_LENGTH);
  try {
    await pool.query(
      `
            INSERT INTO memories (user_id, memory)
            VALUES ($1, $2)
            ON CONFLICT (user_id)
            DO UPDATE SET 
                memory = EXCLUDED.memory
        `,
      [userId, newMemory.slice(-contextLength)] // Limit memory to context length
    );
  } catch (err) {
    console.error("Error updating user memory:", err);
  }
}

async function clearUserMemory(userId) {
  try {
    await pool.query("DELETE FROM memories WHERE user_id = $1", [userId]);
  } catch (err) {
    console.error("Error clearing user memory:", err);
  }
}

module.exports = {
  getUserMemory,
  updateUserMemory,
  clearUserMemory,
};
