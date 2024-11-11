import { CorsOptions } from "cors";

const corsConfig: CorsOptions = {
  //Origin es el dominio que viene del front
  //!Esto usarlo en produccion
//   origin: (origin, callback) => {
//     const domPermitidos = [process.env.FRONTEND_URL];
    
//     if (domPermitidos.includes(origin)) return callback(null, true);
//     return callback(new Error("Error de Cors"));
//   }
// }
//!Esto usarlo en desarrollo
origin: (origin, callback) => {
  // Permitir si el origin es undefined (como en Postman) o si es un dominio permitido
  const domPermitidos = ["*"];

  // Si el origin es undefined o está en la lista de permitidos
  if (!origin || domPermitidos.includes("*")) {
    return callback(null, true);
  }

  // Si el origin no está permitido
  return callback(new Error("Error de Cors"));
}
};
export {
  corsConfig
}