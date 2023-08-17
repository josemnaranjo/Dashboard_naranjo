import { Router } from "express";
import { checkIn, checkOut } from "../controllers/workday.controller.js";

const router = Router();

router.post("/check-in/:date", checkIn);
router.put("/check-out/:date", checkOut);

export default router;
