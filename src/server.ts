import colors from "colors";
import express, { Express } from "express";
import routerLocatario from "./router/locatarioRoutes";
import routerLocador from "./router/locadorRoutes";
import routerInmueble from "./router/inmuebleRoutes";
import routerAuth from "./router/authRoutes";
import routerContrato from "./router/contratoRoutes";
import routerTipoContrato from "./router/tipoContratoRoutes"
import routerHistorialContrato from "./router/historialContratoRoutes"
import routerDashboard from "./router/dashboardRoutes"
import db from "./config/db";
import cors from 'cors'
import { corsConfig } from "./config/cors";

const conectarDB = async () => {
  try {
    await db.authenticate();
    db.sync({ alter: true }); // agregar {alter: true} si quiero modificar la tabla desde el modelo
    console.log(colors.bgGreen.white("Conexion exitosa a la base de datos"));
  } catch (error) {
    console.log(colors.bgRed.white(`error al conectar db ${error}`));
  }
};

conectarDB();

const server: Express = express();
server.use(cors(corsConfig));

server.use(express.json());

//Usa un ruteo general como /api
server.use("/api", routerLocatario);
server.use("/api", routerLocador);
server.use("/api", routerInmueble);
server.use("/api", routerAuth);
server.use("/api", routerContrato);
server.use("/api", routerTipoContrato);
server.use("/api", routerHistorialContrato);
server.use("/api", routerDashboard);

export default server;
