import app from "./app.js";
import "dotenv/config.js";
import pool from "./db.js";

pool
  .connect()
  .then(() => {
    console.log("Connected to Database successfully");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
  });
