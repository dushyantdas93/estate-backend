import express from "express";
import {
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/resetpassword", resetPassword);
router.post("/login", login);

router.post("/logout", logout);

export default router;
