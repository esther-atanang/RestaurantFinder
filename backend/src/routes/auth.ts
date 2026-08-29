import express from "express";
import { login, signup, createGuest } from "@/middlewares/auth.ts";

const router = express.Router();

router.get("/login", login);
router.post("/create_guest", createGuest);
router.post("/signup",signup);

export default router;


