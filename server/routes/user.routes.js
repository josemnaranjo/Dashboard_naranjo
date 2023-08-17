import { Router } from "express";
import {
  Register,
  Login,
  Logout,
  EditUser,
  DeleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", Register);
router.post("/logout", Logout);
router.post("/login", Login);
router.post("/edit-user", EditUser);
router.post("/delete-user", DeleteUser);

export default router;
