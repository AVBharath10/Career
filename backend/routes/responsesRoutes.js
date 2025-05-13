const express = require("express");
const QuizResponse = require("../models/quiz");

const router = express.Router();

// Fetch all responses (for testing)
router.get("/", async (req, res) => {
    try {
        const responses = await QuizResponse.find();
        res.json(responses);
    } catch (error) {
        console.error("❌ Fetch Responses Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
