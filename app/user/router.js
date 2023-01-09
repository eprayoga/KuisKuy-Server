var express = require("express");
var router = express.Router();
const multer = require("multer");
const os = require("os");
const {
  createQuiz,
  createCategory,
  landingPage,
  detailPage,
} = require("./controller");

router.get("/landingpage", landingPage);
router.get("/:id/detail", detailPage);
router.post("/category/create", createCategory);
router.post(
  "/quiz/create",
  multer({ dest: os.tmpdir() }).single("banner"),
  createQuiz
);

module.exports = router;
