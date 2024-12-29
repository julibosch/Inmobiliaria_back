import { Router } from "express";
import { handleInputsErrors } from "../middleware/locatarioMid";
import { authMiddleware } from "../middleware/auth";
import { reglaParamHistorialContrato, reglasValidacionActualizarHistorialContrato, reglasValidacionHistorialContrato } from "../libs/historialContratoValidation";
import { actualizarCrearHistorialContratos, crearHistorialContratos, listadoHistorialContratos, obtenerHistorial } from "../controller/historialContratoController";

const router = Router();

router.get("/historial-contratos", authMiddleware as any, listadoHistorialContratos as any);
router.get("/historial-contratos/:id", authMiddleware as any, reglaParamHistorialContrato, handleInputsErrors as any, obtenerHistorial as any);

router.post(
  "/historial-contratos",
  authMiddleware as any,
  reglasValidacionHistorialContrato,
  handleInputsErrors as any,
  crearHistorialContratos as any
);

router.put(
  "/nuevo-historial",
  authMiddleware as any,
  reglasValidacionActualizarHistorialContrato,
  handleInputsErrors as any,
  actualizarCrearHistorialContratos as any
);

export default router;
