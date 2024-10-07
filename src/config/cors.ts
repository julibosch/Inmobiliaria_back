import { CorsOptions } from "cors";

const corsConfig: CorsOptions = {
  //Origin es el dominio que viene del front
  origin: (origin, callback) => {
    const domPermitidos = [process.env.FRONTEND_URL];

    if (domPermitidos.includes(origin)) return callback(null, true);
    return callback(new Error("Error de Cors"));
  }
}

export {
  corsConfig
}