const express = require("express");
const authMiddleware = require("../middleware/auth");
const QuizResponse = require("../models/quiz");

const router = express.Router();

// Submit Quiz Responses
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { responses } = req.body;
    if (!responses || !Array.isArray(responses)) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const userId = req.user.userId;

    const quizResponse = new QuizResponse({ userId, responses });
    await quizResponse.save();

    res.status(201).json({ message: "Quiz responses submitted successfully" });
  } catch (error) {
    console.error("❌ Quiz Submission Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch User Quiz Responses
router.get("/responses", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const userResponses = await QuizResponse.findOne({ userId });

    res.json(userResponses || { responses: [] }); // Ensure consistent response format
  } catch (error) {
    console.error("❌ Fetch Quiz Responses Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
