import { Router } from "express";
import {
  createWorker,
  getAllWorkers,
  getOneWorker,
  deleteOneWorker,
  updateWorker,
  getAllWorkersOfAWorday,
  updateLicence,
  resetLicence,
  getWorkersWithLicence,
  getMonthReport,
  downloadMonthReport,
} from "../controllers/worker.controller.js";

const router = Router();

router.post("/create-worker", createWorker);
router.get("/get-workers", getAllWorkers);
router.get("/get-worker/:rut", getOneWorker);
router.delete("/delete-worker/:rut", deleteOneWorker);
router.put("/update-worker", updateWorker);
router.get("/get-workers-of-workday/:date", getAllWorkersOfAWorday);
router.put("/update-licence/:rut", updateLicence);
router.post("/reset-licence", resetLicence);
router.get("/get-workers-with-licence", getWorkersWithLicence);
router.post("/get-month-report", getMonthReport);
router.post("/download-month-report", downloadMonthReport);

export default router;
