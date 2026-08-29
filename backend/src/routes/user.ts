import express from "express";
import { getUserDetails, deleteUser } from "@/middlewares/user.ts";

const router = express.Router();

router.get("/details/:id", getUserDetails);
router.delete("/:id", deleteUser);

export default router