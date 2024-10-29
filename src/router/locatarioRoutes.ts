import { Router } from "express";
import { handleInputsErrors } from "../middleware/locatarioMid";
import {
  reglasValidacionLocatario,
  reglaParamLocatario,
} from "../libs/locatarioValidation";
import {
  crearLocatario,
  listadoLocatarios,
  obtenerLocatario,
  editarLocatario,
  eliminarLocatario,
} from "../controller/locatarioController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/locatario", listadoLocatarios as any);
router.get(
  "/locatario/:id",
  authMiddleware as any,
  reglaParamLocatario,
  handleInputsErrors as any,
  obtenerLocatario as any
);
router.post(
  "/locatario",
  authMiddleware as any,
  reglasValidacionLocatario,
  handleInputsErrors as any,
  crearLocatario as any
);
router.put(
  "/locatario/:id",
  authMiddleware as any,
  reglasValidacionLocatario,
  handleInputsErrors as any,
  editarLocatario as any
);
router.delete(
  "/locatario/:id",
  authMiddleware as any,
  eliminarLocatario as any
);

export default router;
