import { Router } from "express";
import { handleInputsErrors } from "../middleware/locatarioMid";
import { authMiddleware } from "../middleware/auth";
import { reglaParamTipoContrato, reglasValidacionTipoContrato } from "../libs/tipoContratoValidation";
import { crearTipoContrato, editarTipoContrato, eliminarTipoContrato, listadoTipoContrato } from "../controller/tipoContratoController";

const router = Router();

router.get("/tipoContrato", listadoTipoContrato as any);
router.get(
  "/tipoContrato/:id",
  authMiddleware as any,
  reglaParamTipoContrato,
  handleInputsErrors as any,
);
router.post(
  "/tipoContrato",
  authMiddleware as any,
  reglasValidacionTipoContrato,
  handleInputsErrors as any,
  crearTipoContrato as any
);
router.put(
  "/tipoContrato/:id",
  authMiddleware as any,
  reglasValidacionTipoContrato,
  handleInputsErrors as any,
  editarTipoContrato as any
);
router.delete(
  "/tipoContrato/:id",
  authMiddleware as any,
  reglaParamTipoContrato,
  eliminarTipoContrato as any
);

export default router;
