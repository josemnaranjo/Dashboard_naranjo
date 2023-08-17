import { Router } from "express";
import { Register, Login, Logout } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", Register);
router.post("/logout", Logout);
router.post("/login", Login);

export default router;
