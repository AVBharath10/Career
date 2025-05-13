const mongoose = require("mongoose");

// Use separate careerDB instance
const careerDB = global.careerDB || mongoose.connection.useDb("career");

const QuizResponseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  responses: [
    {
      questionId: String,
      answerId: String, // Change from "answer" to "answerId"
    },
  ],  
}, { timestamps: true });

module.exports = careerDB.model("QuizResponse", QuizResponseSchema, "quizresponses");
