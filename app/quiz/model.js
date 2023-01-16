const mongoose = require("mongoose");

let quizSchema = mongoose.Schema(
  {
    kuisName: {
      type: String,
      require: [true, "Nama Kuis harus diisi"],
    },
    code: {
      type: String,
    },
    reference: {
      type: String,
      default: null,
    },
    reference_link: {
      type: String,
    },
    description: {
      type: String,
    },
    banner: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    type: {
      type: String,
      default: "multiple choice",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    questions: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
