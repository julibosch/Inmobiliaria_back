import { Router } from "express";
import { handleInputsErrors } from "../middleware/locatarioMid";
import { login, obtenerUsuario } from "../controller/authController";
import { reglasValidacionUsuario } from "../libs/authValidation";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/login", reglasValidacionUsuario, handleInputsErrors as any, login as any);
router.get("/usuario", authMiddleware as any, obtenerUsuario as any);

export default router;
