import { Router } from "express";
import {
  createPolis,
  getAllPolis,
  updatePolis,
  deletePolis,
} from "../controllers/polisController";

const router = Router();

router.post("/create", createPolis);
router.get("/all", getAllPolis);
router.put("/update/:id", updatePolis);
router.delete("/delete/:id", deletePolis);

export default router;
