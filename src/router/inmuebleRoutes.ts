import { Router } from "express";
import { handleInputsErrors } from "../middleware/locatarioMid";
import { listadoInmuebles, obtenerInmueble, crearInmueble, editarInmueble, eliminarInmueble } from "../controller/inmuebleController";
// Faltan reglas de validacion

const router = Router();

router.get("/inmuebles", handleInputsErrors as any, listadoInmuebles as any)
router.get("/inmuebles/:id", handleInputsErrors as any, obtenerInmueble as any)
router.post("/inmuebles", handleInputsErrors as any, crearInmueble as any)
router.put("/inmuebles/:id", handleInputsErrors as any, editarInmueble as any)
router.delete("/inmuebles/:id", handleInputsErrors as any, eliminarInmueble as any)

export default router;