import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", getCurrentUser);

export default router;
