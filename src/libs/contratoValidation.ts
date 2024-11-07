import { body, param } from "express-validator";

// Validaciones para el modelo Contrato
const reglasValidacionContrato = [
  body("id_locatario").isInt().withMessage("El ID del locatario debe ser un entero."),
  body("id_inmueble").isInt().withMessage("El ID del inmueble debe ser un entero."),
  body("fecha_inicio").isISO8601().withMessage("La fecha de inicio no es válida."),
  body("fecha_fin").isISO8601().withMessage("La fecha de fin no es válida."),
  body("estado")
    .isIn(['vigente', 'finalizado', 'proximo a vencer', 'rescindido'])
    .withMessage("El estado debe ser uno de los valores: vigente, finalizado, proximo a vencer, rescindido."),
  body("alerta_vencimiento")
    .isInt({ min: 1 })
    .withMessage("La alerta de vencimiento debe ser un número entero mayor que 0."),
  body("importe").isDecimal().withMessage("El importe debe ser un valor decimal."),
];

const reglaParamContrato = param('id').isInt().withMessage("ID no valido.");

export { reglasValidacionContrato, reglaParamContrato };
