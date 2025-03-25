// Importing modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { save_user_details } from "./controllers/save_user_details.js";
import { save_asset } from "./controllers/save_asset.js";

// Initializing modules
const app = express();
dotenv.config();

const domain = process.env.CLIENT_URL || "http://localhost:5173"; // Use environment variable for flexibility

// CORS configuration
app.use(
  cors({
    origin: domain,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON parser & cookie parser
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Hello to Farm-Karo API");
});

app.post("/save-user-details", save_user_details);
app.post("/save-asset", save_asset);

// Server setup
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT} successfully.....`);
});
