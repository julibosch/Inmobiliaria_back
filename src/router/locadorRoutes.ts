import { Router } from "express";
import { handleInputsErrors } from "../middleware/locatarioMid";
import { reglasValidacionLocatario, reglaParamLocatario } from "../libs/locatarioValidation";
import { crearLocador, listadoLocador, obtenerLocador, editarLocador, eliminarLocador } from "../controller/locadorController"; 

const router = Router();

router.get("/locador", listadoLocador as any);
router.get("/locador/:id", reglaParamLocatario, handleInputsErrors as any, obtenerLocador as any);
router.post("/locador", reglasValidacionLocatario ,handleInputsErrors as any ,crearLocador as any);
router.put("/locador/:id", reglasValidacionLocatario ,handleInputsErrors as any ,editarLocador as any);
router.delete("/locador/:id", eliminarLocador as any);

export default router;
