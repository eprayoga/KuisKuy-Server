var express = require("express");
var router = express.Router();
const multer = require("multer");
const os = require("os");
const { isLoginUser } = require("../middleware/auth");
const {
  createQuiz,
  createCategory,
  landingPage,
  detailPage,
  category,
  storeResult,
  resultQuizPage,
  getHistoryQuiz,
} = require("./controller");

router.get("/landingpage", landingPage);
router.get("/:id/detail", detailPage);
router.get("/category", category);
router.post("/category/create", createCategory);
router.post(
  "/quiz/create",
  multer({ dest: os.tmpdir() }).single("banner"),
  createQuiz
);
router.get("/quiz/:id/result", isLoginUser, resultQuizPage);
router.get("/quiz/history", isLoginUser, getHistoryQuiz);
router.post("/quiz/store-result", storeResult);

module.exports = router;
