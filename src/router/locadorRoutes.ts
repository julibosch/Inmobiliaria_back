import { Router } from "express";
import { handleInputsErrors } from "../middleware/locatarioMid";
import {
  reglasValidacionLocatario,
  reglaParamLocatario,
} from "../libs/locatarioValidation";
import {
  crearLocador,
  listadoLocador,
  obtenerLocador,
  editarLocador,
  eliminarLocador,
} from "../controller/locadorController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/locador", listadoLocador as any);
router.get(
  "/locador/:id",
  authMiddleware as any,
  reglaParamLocatario,
  handleInputsErrors as any,
  obtenerLocador as any
);
router.post(
  "/locador",
  authMiddleware as any,
  reglasValidacionLocatario,
  handleInputsErrors as any,
  crearLocador as any
);
router.put(
  "/locador/:id",
  authMiddleware as any,
  reglasValidacionLocatario,
  handleInputsErrors as any,
  editarLocador as any
);
router.delete("/locador/:id", authMiddleware as any, eliminarLocador as any);

export default router;
