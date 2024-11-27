import { Router } from "express";
import * as user from "../controllers/userController";

const router = Router();

router.get("/", user.getCurrentUser);

export default router;
