import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  reglaParamContrato,
  reglasValidacionContrato,
} from "../libs/contratoValidation";
import { handleInputsErrors } from "../middleware/locatarioMid";
import {
  crearContrato,
  listadoContratos,
  editarContrato,
  eliminarContrato,
} from "../controller/contratoController";

const router = Router();

router.get("/contratos", listadoContratos as any);
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

router.delete(
  "/contratos/:id",
  // authMiddleware as any,
  reglaParamContrato,
  handleInputsErrors as any,
  eliminarContrato as any
);

export default router;
