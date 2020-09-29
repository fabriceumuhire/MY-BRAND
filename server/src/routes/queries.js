const express = require("express");
const router = express.Router();
const queries = require("../controllers/queries");

router.get("/queries", queries.getAll);

router.post("/queries", queries.postOne);

router.get("/queries/:id", queries.getOne);

module.exports = router;