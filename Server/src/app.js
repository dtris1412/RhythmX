import express from "express";
import dotenv from "dotenv";
import viewEngine from "./config/viewEngine.js";
import initWebRoutes from "./routes/web.js";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/web.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Config view engine
viewEngine(app);

// Init web routes
initWebRoutes(app);
app.use("/api/users", userRoutes);

// Connect to DB
connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
