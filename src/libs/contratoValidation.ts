import { body, param } from "express-validator";

// Validaciones para el modelo Contrato
const reglasValidacionContrato = [
  body("id_locatario")
    .isInt().withMessage("El ID del locatario debe ser un entero.")
    .toInt(), // Conversión a entero
  body("id_inmueble")
    .isInt().withMessage("El ID del inmueble debe ser un entero.")
    .toInt(), // Conversión a entero
  body("fecha_inicio")
    .isISO8601().withMessage("La fecha de inicio no es válida."),
  body("fecha_fin")
    .isISO8601().withMessage("La fecha de fin no es válida."),
  body("estado")
    .isIn(['vigente', 'finalizado', 'proximo_a_vencer', 'rescindido'])
    .withMessage("El estado debe ser uno de los valores: vigente, finalizado, proximo a vencer, rescindido."),
  body("alerta_vencimiento")
    .isInt({ min: 1 })
    .withMessage("La alerta de vencimiento debe ser un número entero mayor que 0.")
    .toInt(), // Conversión a entero
  body("importe")
    .isDecimal().withMessage("El importe debe ser un valor decimal.")
    .toFloat(), // Conversión a decimal
];

const reglaParamContrato = param('id').isInt().withMessage("ID no válido.");

export { reglasValidacionContrato, reglaParamContrato };
