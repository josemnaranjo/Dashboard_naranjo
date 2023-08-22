import { Router } from "express";
import {
  checkIn,
  checkOut,
  setAbsent,
} from "../controllers/workday.controller.js";

const router = Router();

router.post("/check-in/:date", checkIn);
router.put("/check-out/:date", checkOut);
router.post("/set-absent/:date", setAbsent);

export default router;
