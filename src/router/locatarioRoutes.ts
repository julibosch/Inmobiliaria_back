import { Router } from "express";
import { handleInputsErrors } from "../middleware/locatarioMid";
import { reglasValidacionLocatario, reglaParamLocatario } from "../libs/locatarioValidation";
import { crearLocatario, listadoLocatarios, obtenerLocatario, editarLocatario, eliminarLocatario } from "../controller/locatarioController"; 

const router = Router();

router.get("/locatario", listadoLocatarios as any);
router.get("/locatario/:id", reglaParamLocatario, handleInputsErrors as any, obtenerLocatario as any);
router.post("/locatario", reglasValidacionLocatario ,handleInputsErrors as any ,crearLocatario as any);
router.put("/locatario/:id", reglasValidacionLocatario ,handleInputsErrors as any ,editarLocatario as any);
router.delete("/locatario/:id", eliminarLocatario as any);

export default router;
