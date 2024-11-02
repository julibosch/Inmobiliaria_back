import { body, param } from "express-validator";

// Definir las validaciones para `tipoContrato`
const reglasValidacionTipoContrato = [
  body("duracion").isInt().withMessage("La duracion debe ser numero").notEmpty().withMessage("Error, duracion no puede ir vacío"),
  body("plazo_aumento").isInt().withMessage("El plazo aumento debe ser numero").notEmpty().withMessage("Error, plazo aumento no puede ir vacío"),
  body("alarma_aumento").isInt().withMessage("La alarma aumento debe ser numero").notEmpty().withMessage("Error, Alarma aumento no puede ir vacío")
];

const reglaParamTipoContrato = param('id').isInt().withMessage("ID no valido.");

export {reglasValidacionTipoContrato, reglaParamTipoContrato}