const express = require("express");
const mongoose = require("mongoose");
const queries = require("./queries");

mongoose
  .connect("mongodb://localhost:27017/blogdb", { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api", queries);

    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });