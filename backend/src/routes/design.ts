import { Router } from "express";
import { getDesigns } from "../controllers/designController";

const router = Router();

router.get("/", getDesigns);

export default router;
