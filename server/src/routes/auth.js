import express from "express";
import UserAccount from "../controllers/auth.js";
import { emailExist, authenticationMiddleware } from "../middleware/verify.js";

const { Router } = express;
const router = Router();

router.get("/register", UserAccount.getUser);

router.post("/register", emailExist, UserAccount.registerUser);

router.post("/login", authenticationMiddleware, UserAccount.loginUser);

export default router;
