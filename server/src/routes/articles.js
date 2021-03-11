import express from "express";
import {tokenAuth} from "../middleware/verify.js";
import { getAll, getOne, postOne, updateOne, deleteOne } from "../controllers/articles.js";

const { Router } = express;
const router = Router();

router.get("/articles", getAll);

router.post("/articles", tokenAuth, postOne);

router.get("/articles/:id", getOne);

router.patch("/articles/:id", tokenAuth, updateOne);

router.delete("/articles/:id", tokenAuth, deleteOne);

export default router;
