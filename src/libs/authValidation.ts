import { body, param } from "express-validator";

// Definir las validaciones para `Usuario`
const reglasValidacionUsuario = [
  body("nombre").isString().withMessage("El nombre no es string").notEmpty().withMessage("Error, Nombre no puede ir vacío"),
  body("password").isString().withMessage("El apellido no es string").notEmpty().withMessage("Error, password no puede ir vacío"),
];

export {reglasValidacionUsuario}