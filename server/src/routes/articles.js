const express = require("express");

const jwtverify = require("../middleware/verify");
const articles = require("../controllers/articles");

const router = express.Router();

router.get("/articles", articles.getAll);

router.post("/articles", jwtverify, articles.postOne);

router.get("/articles/:id", articles.getOne);

router.patch("/articles/:id", jwtverify, articles.updateOne);

router.delete("/articles/:id/:publicId",jwtverify, articles.deleteOne);

module.exports = router;