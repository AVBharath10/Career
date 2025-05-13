require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend origin
    credentials: true, // Allow cookies & authentication headers
  })
);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "CareerDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🟢 MongoDB Connected: CareerDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/responses", require("./routes/responsesRoutes"));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Unexpected Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
