import pkg from "pg";
import "dotenv/config.js";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DatabaseURL,
});
export default pool;
