import { Router } from "express";
import { syncFiles } from "../controllers/sync.controller";

const router = Router();

router.post("/", syncFiles);

export default router;