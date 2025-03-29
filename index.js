// Importing modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { save_user_details } from "./controllers/save_user_details.js";
import { save_file } from "./controllers/save_file.js";
import uploadBase64File from "./middleware/upload_file.js";
// import { logRequest } from "./controllers/logRequest.js";

// Initializing modules
const app = express();
dotenv.config();

const domain = process.env.CLIENT_URL || "http://localhost:5173";

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
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello to Farm-Karo API");
});

app.post("/save-user-details", save_user_details);
app.post("/data_upload", uploadBase64File, save_file);
// app.post("/data_upload", logRequest);

// Server setup
const PORT = process.env.PORT || 8080;

app.listen(PORT, 8080, () => {
  console.log(`Server is running on port ${PORT} successfully.....`);
});
