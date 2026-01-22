import { Router } from "express";
import { listTeachers } from "../controllers/teachers.controller.js";

const router = Router();
router.get("/", listTeachers);
export default router;
