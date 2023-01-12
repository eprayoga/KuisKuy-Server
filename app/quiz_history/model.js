const mongoose = require("mongoose");

let quizHistorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    answers: {
      type: Array,
    },
    correctAnswer: {
      type: Number,
    },
    points: {
      type: Array,
    },
    totalPoints: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizHistory", quizHistorySchema);
