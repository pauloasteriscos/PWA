import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listMine, createProposal, updateProposal, deleteProposal } from "../controllers/proposals.controller.js";

const router = Router();

router.get("/mine", requireAuth, listMine);
router.post("/", requireAuth, createProposal);
router.put("/:id", requireAuth, updateProposal);
router.delete("/:id", requireAuth, deleteProposal);

export default router;
