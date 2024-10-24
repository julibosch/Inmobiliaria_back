import { Router } from "express";
import { handleInputsErrors } from "../middleware/locatarioMid";
import { listadoInmuebles, obtenerInmueble, crearInmueble, editarInmueble, eliminarInmueble } from "../controller/inmuebleController";
import { reglaParamInmueble, reglasValidacionInmueble } from "../libs/inmuebleValidation";

const router = Router();

router.get("/inmuebles", handleInputsErrors as any, listadoInmuebles as any)
router.get("/inmuebles/:id", reglaParamInmueble, handleInputsErrors as any, obtenerInmueble as any)
router.post("/inmuebles", reglasValidacionInmueble, handleInputsErrors as any, crearInmueble as any)
router.put("/inmuebles/:id", reglaParamInmueble, reglasValidacionInmueble, handleInputsErrors as any, editarInmueble as any)
router.delete("/inmuebles/:id", reglaParamInmueble, handleInputsErrors as any, eliminarInmueble as any)

export default router;