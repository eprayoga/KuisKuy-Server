const Quiz = require("../quiz/model");
const Category = require("../category/model");
const QuizHistory = require("../quiz_history/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const quiz = await Quiz.find().select(
        "_id kuisName banner questions type"
      );
      res.status(200).json({
        data: {
          quiz: quiz,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const quiz = await Quiz.findOne({ _id: id })
        .populate("category")
        .populate("user");

      if (!quiz) {
        return res.status(404).json({ message: "Quiz tidak ditemukan.!" });
      }

      res.status(200).json({
        data: {
          quiz: quiz,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  category: async (req, res) => {
    try {
      const category = await Category.find();
      res.status(200).json({ data: category });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name } = req.body;

      let category = await Category({ name });
      await category.save();
      res.status(200).json({
        data: { category },
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  createQuiz: async (req, res, next) => {
    try {
      const payload = req.body;
      payload.user = req.user._id;
      payload.questions = JSON.parse(payload.questions);

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const quiz = new Quiz({ ...payload, banner: filename });

            await quiz.save();

            delete quiz._doc.password;

            res.status(201).json({ data: quiz });
          } catch (err) {
            if (err && err.name === "ValidationError") {
              return res.status(422).json({
                error: 1,
                message: err.message,
                fields: err.errors,
              });
            }
            next(err);
          }
        });
      } else {
        res.status(403).json({
          message: "Wajib menambahkan banner kuis.",
        });
      }
    } catch (err) {
      if (err && err.name === "ValidationError") {
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors,
        });
      }
      next(err);
    }
  },

  storeResult: async (req, res, next) => {
    try {
      const payload = req.body;

      // payload.answers = JSON.parse(payload.answers);
      // payload.points = JSON.parse(payload.points);

      let quizHistory = new QuizHistory(payload);

      await quizHistory.save();

      res.status(201).json({ data: quizHistory });
    } catch (err) {
      if (err && err.name === "ValidationError") {
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors,
        });
      }
      next(err);
    }
  },

  resultQuizPage: async (req, res) => {
    try {
      const { id } = req.params;

      const quizHistory = await QuizHistory.find({ quiz: id })
        .sort({ totalPoints: -1 })
        .populate("user")
        .populate("quiz");

      const quizResult = await QuizHistory.findOne(
        { quiz: id, user: req.user._id },
        { sort: { created_at: -1 } }
      )
        .select(
          "_id user quiz answers correctAnswer points totalPoints createdAt"
        )
        .populate("user")
        .populate("quiz");

      const dataQuiz = await Quiz.findOne({ _id: id }).populate("user");

      res.status(200).json({
        data: {
          quizHistory,
          quizResult,
          dataQuiz,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  getHistoryQuiz: async (req, res) => {
    try {
      const historyQuiz = await QuizHistory.find({ user: req.user._id })
        .populate("quiz")
        .populate("user");

      res.status(200).json({ data: { historyQuiz } });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },

  getMyQuiz: async (req, res) => {
    try {
      const myQuiz = await Quiz.find({ user: req.user._id }).populate("user");

      res.status(200).json({ data: { myQuiz } });
    } catch (error) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
