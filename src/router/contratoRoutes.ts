import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { reglaParamContrato, reglasValidacionContrato } from "../libs/contratoValidation";
import { handleInputsErrors } from "../middleware/locatarioMid";
import { crearContrato, listadoContratos, editarContrato } from "../controller/contratoController";

const router = Router();

router.get("/contratos", listadoContratos as any );
router.post(
  "/contratos",
  authMiddleware as any,
  reglasValidacionContrato,
  handleInputsErrors as any,
  crearContrato as any
);

router.put(
  "/contratos/:id",
  // authMiddleware as any,
  reglaParamContrato,
  reglasValidacionContrato,
  handleInputsErrors as any,
  editarContrato as any
);

export default router;