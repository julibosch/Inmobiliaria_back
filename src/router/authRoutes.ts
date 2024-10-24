import { Router } from "express";
import { handleInputsErrors } from "../middleware/locatarioMid";
import { login } from "../controller/authController";
import { reglasValidacionUsuario } from "../libs/authValidation";

const router = Router();

router.post("/login", reglasValidacionUsuario, handleInputsErrors as any, login as any);

export default router;
