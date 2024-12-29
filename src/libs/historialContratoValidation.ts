import { body, param } from "express-validator";

// Validaciones para el modelo Contrato
const reglasValidacionHistorialContrato = [
  body("id_contrato")
    .isInt().withMessage("El ID del contrato debe ser un entero.")
    .toInt(), // Conversión a entero
  body("fecha_inicio")
    .isISO8601().withMessage("La fecha de inicio no es válida."),
  body("importe_actualizado")
    .isDecimal().withMessage("El importe actualizado debe ser un valor decimal.")
    .toFloat(),
  body("estado")
    .isIn(['vigente', 'finalizado'])
    .withMessage("El estado debe ser uno de los valores: vigente', 'finalizado."),
  body("fecha_actualizacion")
    .isISO8601().withMessage("La fecha actualizacion no es válida."),
];

const reglasValidacionActualizarHistorialContrato = [
  body("id_contrato")
    .isInt().withMessage("El ID del contrato debe ser un entero.")
    .toInt(), // Conversión a entero
  body("id_historial")
    .isInt().withMessage("El ID del historial debe ser un entero.")
    .toInt(), // Conversión a entero
  body("importe_actualizado")
    .isDecimal().withMessage("El importe actualizado debe ser un valor decimal.")
    .toFloat(),
  body("plazo_aumento")
    .isInt().withMessage("El plazo de aumento debe ser un entero.")
    .toInt(),
];

const reglaParamHistorialContrato = param('id').isInt().withMessage("ID no válido.");

export { reglasValidacionHistorialContrato, reglaParamHistorialContrato, reglasValidacionActualizarHistorialContrato };
