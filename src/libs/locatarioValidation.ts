import { body, param } from "express-validator";

// Definir las validaciones para `Locatario`
const reglasValidacionLocatario = [
  body("nombre").isString().withMessage("El nombre no es string").notEmpty().withMessage("Error, Nombre no puede ir vacío"),
  body("apellido").isString().withMessage("El apellido no es string").notEmpty().withMessage("Error, apellido no puede ir vacío"),
  body("dni").isString().withMessage("El dni no es string").notEmpty().withMessage("Error, dni no puede ir vacío"),
  body("telefono").isString().withMessage("El telefono no es string").notEmpty().withMessage("Error, telefono no puede ir vacío"),
];

const reglaParamLocatario = param('id').isInt().withMessage("ID no valido.");

export {reglasValidacionLocatario, reglaParamLocatario}