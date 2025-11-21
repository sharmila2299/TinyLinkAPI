import express from "express";
import cors from "cors";
import healthCheckRouter from "./routes/healthCheck.route.js";
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use("/health", healthCheckRouter);
export default app;
