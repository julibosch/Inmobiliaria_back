import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { estadosContratos, totalDatos } from "../controller/dashboardController";

const router = Router();

router.get("/dashboard/total-datos", authMiddleware as any, totalDatos as any)
router.get("/dashboard/estados-contratos", authMiddleware as any, estadosContratos as any)

export default router;