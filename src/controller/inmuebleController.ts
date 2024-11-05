import { Request, Response } from "express";
import {IInmueble, InmuebleJoin} from "../types/InmuebleTypes";
import Inmueble from "../models/Inmueble";
import Locador from "../models/Locador";

const listadoInmuebles = async (req: Request, res: Response) => {
  try {
    console.log("[INFO] Listado de inmuebles");
    const inmuebles: InmuebleJoin[] = await Inmueble.findAll({
      include: [{ model: Locador }]
    });
    if (!inmuebles) {
      return res.status(404).json({ message: "No se encontraron inmuebles" });
    }
    return res.json(inmuebles);
  } catch (error) {
    console.log(`[ERROR] Error obteniendo listado de inmuebles: ${error}`)
    return res.status(500).json({ message: `Error interno del servidor: ${error}` });
  }
}

const obtenerInmueble = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log(`[INFO] Obtener inmueble: ${id}`);
    const inmueble: InmuebleJoin = await Inmueble.findByPk(id);
    if (!inmueble) {
      return res.status(404).json({ message: "Inmueble no encontrado" });
    }
    return res.json(inmueble);
  } catch (error) {
    console.log(`[ERROR] Error obteniendo inmueble por ID ${id}: ${error}`)
    return res.status(500).json({ message: `Error interno del servidor: ${error}` });
  }
}

const crearInmueble = async (req: Request, res: Response) => {
  try {
    console.log("[INFO] Crear inmueble");
    const inmueble: Inmueble = await Inmueble.create(req.body);
    return res.json({ message: "Inmueble creado exitosamente", inmueble });
  } catch (error) {
    console.log(`[ERROR] Error creando un nuevo inmueble: ${error}`)
    return res.status(500).json({ message: `Error interno del servidor: ${error}` });
  }
}

const editarInmueble = async (req: Request, res: Response) => {
  const { id } = req.params;
  const inmuebleActualizado = req.body;

  try {
    console.log(`[INFO] Editar inmueble: ${id}`);
    const inmueble: Inmueble = await Inmueble.findByPk(id);
    if (!inmueble) {
      return res.status(404).json({ message: "Inmueble no encontrado" });
    }

    await inmueble.update(inmuebleActualizado)

    return res.json(inmueble);
  } catch (error) {
    console.error(`[ERROR] Error al editar inmueble ${id}: ${error}`);
    return res.status(500).json({ message: `Error interno del servidor: ${error}` });
  }
}

const eliminarInmueble = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log(`[INFO] Eliminar inmueble: ${id}`);
    const inmueble: Inmueble = await Inmueble.findByPk(id);
    if (!inmueble) {
      return res.status(404).json({ message: "Inmueble no encontrado" });
    }

    await inmueble.destroy();
    return res.json({ message: `Inmueble eliminado exitosamente!` });
  } catch (error) {
    console.error(`[ERROR] Error al eliminar inmueble ${id}: ${error}`);
    return res.status(500).json({ message: `Error interno del servidor: ${error}` });
  }
}

export { listadoInmuebles, obtenerInmueble, crearInmueble, editarInmueble, eliminarInmueble };