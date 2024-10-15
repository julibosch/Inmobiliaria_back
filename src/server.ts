import colors from "colors";
import express, { Express } from "express";
import routerLocatario from "./router/locatarioRoutes";
import routerLocador from "./router/locadorRoutes";
import db from "./config/db";
import cors from 'cors'
import { corsConfig } from "./config/cors";

const conectarDB = async () => {
  try {
    await db.authenticate();
    db.sync(); // agregar {alter: true} si quiero modificar la tabla desde el modelo
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

export default server;
