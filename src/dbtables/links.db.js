import pool from "../db.js";

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        code VARCHAR(10) UNIQUE NOT NULL,
        target_url TEXT NOT NULL,
        total_clicks INT DEFAULT 0,
        last_clicked TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Table created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating table:", err.message);
    process.exit(1);
  }
};

createTable();
