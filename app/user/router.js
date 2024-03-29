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
  getMyQuiz,
  historyDetail,
  MyQuizDetailPage,
  getQuizByCode,
} = require("./controller");

router.get("/landingpage", landingPage);
router.post("/quiz/code", getQuizByCode);
router.get("/:id/detail", detailPage);
router.get("/category", category);
router.post("/category/create", createCategory);
router.post(
  "/quiz/create",
  isLoginUser,
  multer({ dest: os.tmpdir() }).single("banner"),
  createQuiz
);
router.get("/quiz/:id/result", isLoginUser, resultQuizPage);
router.post("/quiz/store-result", storeResult);
router.get("/quiz/history", isLoginUser, getHistoryQuiz);
router.get("/quiz/myquiz", isLoginUser, getMyQuiz);
router.get("/quiz/history/:id", isLoginUser, historyDetail);
router.get("/quiz/myquiz/:id", isLoginUser, MyQuizDetailPage);

module.exports = router;
