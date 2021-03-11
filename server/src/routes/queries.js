import express from "express";
import { getAll, getOne, postOne} from "../controllers/queries.js";

const { Router } = express;
const router = Router();

router.get("/queries", getAll);

router.post("/queries", postOne);

router.get("/queries/:id", getOne);

export default router;
