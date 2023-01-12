var express = require("express");
var router = express.Router();
const multer = require("multer");
const os = require("os");
const {
  createQuiz,
  createCategory,
  landingPage,
  detailPage,
  category,
  storeResult,
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
router.post("/quiz/store-result", storeResult);

module.exports = router;
