console.log("app is running");
import express from "express";
import "dotenv/config";
import connectDB from "./utils/settings/database.js";
import Routes from "./routes/index.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

const PORT = process.env.PORT || 4500;

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

//** database connection */
connectDB();

app.use("/api", Routes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
