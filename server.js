
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "MVC Express Movie API is running",
  });
});

app.use("/api/v1/movies", movieRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

const startServer = async () => {
  try {
    await connectDB(MONGO_URI);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
