const express = require("express");
const mongoose = require("mongoose");
const articles = require("./routes/articles");
const fileupload = require("express-fileupload");
const authRoute = require("./routes/auth");
const queries = require("./routes/queries");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./swagger.json');
const app = express();


mongoose
  .connect("mongodb://localhost:27017/blogdb", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log("DB Connected")
});

app.use(express.json());
app.use(fileupload({
    createParentPath: true,
    useTempFiles: true
}))
app.use("/api/routes", articles);
app.use("/api/routes", authRoute);
app.use("/api/routes", queries);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/doc', queries);

const server = app.listen(5000, () => {
  console.log("Server has started!");

});

module.exports = server;