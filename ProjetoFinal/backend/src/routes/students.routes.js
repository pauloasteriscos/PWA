import { Router } from "express";
import { listStudents } from "../controllers/students.controller.js";

const router = Router();
router.get("/", listStudents);
export default router;
