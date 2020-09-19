const express = require("express");
const mongoose = require("mongoose");
const articles = require("./routes/articles");
const fileupload = require("express-fileupload");
const authRoute = require("./routes/auth");


mongoose
  .connect("mongodb://localhost:27017/blogdb", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(fileupload({
        createParentPath: true,
        useTempFiles: true
    }))
    app.use("/api/routes", articles);
    app.use("/api/routes", authRoute);

    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });