import { Router } from "express";
import { handleInputsErrors } from "../middleware/locatarioMid";
import { listadoInmuebles, obtenerInmueble, crearInmueble, editarInmueble, eliminarInmueble } from "../controller/inmuebleController";
import { authMiddleware } from "../middleware/auth";
import { reglaParamInmueble, reglasValidacionInmueble } from "../libs/inmuebleValidation";
// Faltan reglas de validacion

const router = Router();

router.get("/inmuebles", authMiddleware as any, handleInputsErrors as any, listadoInmuebles as any)
router.get("/inmuebles/:id", authMiddleware as any, reglaParamInmueble, handleInputsErrors as any, obtenerInmueble as any)
router.post("/inmuebles", authMiddleware as any, reglasValidacionInmueble, handleInputsErrors as any, crearInmueble as any)
router.put("/inmuebles/:id", authMiddleware as any, reglaParamInmueble, reglasValidacionInmueble, handleInputsErrors as any, editarInmueble as any)
router.delete("/inmuebles/:id", authMiddleware as any, reglaParamInmueble, handleInputsErrors as any, eliminarInmueble as any)

export default router;