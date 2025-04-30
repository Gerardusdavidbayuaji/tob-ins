import { Router } from "express";
import {
  createPolicy,
  getAllPolicy,
  updatePolicy,
  deletePolicy,
} from "../controllers/policyController";

const router = Router();

router.post("/policies", createPolicy);
router.get("/policies", getAllPolicy);
router.put("/policies/:id", updatePolicy);
router.delete("/policies/:id", deletePolicy);

export default router;
