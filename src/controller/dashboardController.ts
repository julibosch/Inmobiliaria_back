import { Request, Response } from "express";
import Locatario from "../models/Locatario";
import Inmueble from "../models/Inmueble";
import Contrato from "../models/Contrato";
import Locador from "../models/Locador";
import db from "../config/db";

const totalDatos = async (req: Request, res: Response) => {
  try {
    const [totalLocatarios, totalLocadores, totalInmuebles, totalContratos] = await Promise.all([
      Locatario.count(),
      Locador.count(),
      Inmueble.count(),
      Contrato.count(),
    ]);
    return res.json({
      totalLocatarios,
      totalLocadores,
      totalInmuebles,
      totalContratos,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los datos" });
  }
}

const estadosContratos = async (req: Request, res: Response) => {
  try {
    const [results] = await db.query(`
      SELECT 
        DATE_FORMAT(fecha_fin, '%M') AS mes,
        estado,
        COUNT(*) AS cantidad
      FROM 
        contrato
      WHERE 
        YEAR(fecha_fin) = YEAR(CURDATE())
      GROUP BY 
        DATE_FORMAT(fecha_fin, '%M'), MONTH(fecha_fin), estado
        order by MONTH(fecha_fin)
    `);

    return res.json(results);
  } catch (error) {
    console.error("Error al obtener estados de contratos:", error);
    return res.status(500).json({ message: "Error al obtener los datos" });
  }
};

export {
  totalDatos,
  estadosContratos
}