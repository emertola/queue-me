import { Router } from "express";
import { verifyAuth } from "../middlewares";
import { assignPersonnelToWindow, getPersonnelPagedList } from "../controllers";

const router = Router();

router.get("/list", verifyAuth, getPersonnelPagedList);
router.put("/:personnelId", verifyAuth, assignPersonnelToWindow);

export default router;
