import express from "express";
import auth from "../controllers/auth.js";

const { Router } = express;
const router = Router();

router.get("/register", auth.getUser);

router.post("/register", auth.registerUser);

router.post("/login", auth.loginUser);

export default router;
