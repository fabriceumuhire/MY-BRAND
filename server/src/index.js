import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import articles from "./routes/articles.js";
import fileupload from "express-fileupload";
import authRoute from "./routes/auth.js";
import queries from"./routes/queries.js";

dotenv.config({path: './config.env'});
const app = express();

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
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
const server = app.listen(process.env.PORT, () => {
  console.log("Server has started!");

});

export default app;
