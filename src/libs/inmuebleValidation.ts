import { body, param } from "express-validator";

// Definir las validaciones para `Inmueble`
const reglasValidacionInmueble = [
  body("calle").isString().withMessage("La calle debe ser un string").notEmpty().withMessage("La calle no puede estar vacía"),
  body("altura").optional().isString().withMessage("La altura debe ser un string"),
  body("torre").optional().isString().withMessage("La torre debe ser un string"),
  body("localidad").isString().withMessage("La localidad debe ser un string").notEmpty().withMessage("La localidad no puede estar vacía"),
  body("piso").optional().isString().withMessage("El piso debe ser un string"),
  body("departamento").optional().isString().withMessage("El departamento debe ser un string"),
  body("locadorId").isInt().withMessage("El locadorId debe ser un entero").notEmpty().withMessage("El locadorId no puede estar vacío"),
];

const reglaParamInmueble = param('id').isInt().withMessage("ID no válido.");

export { reglasValidacionInmueble, reglaParamInmueble };