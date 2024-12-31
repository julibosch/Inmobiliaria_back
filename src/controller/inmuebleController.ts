import { Request, Response } from "express";
import {IInmueble, InmuebleJoin} from "../types/InmuebleTypes";
import Inmueble from "../models/Inmueble";
import Locador from "../models/Locador";

const listadoInmuebles = async (req: Request, res: Response) => {
  try {
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
    const nuevoInmueble: IInmueble = req.body;
    const inmueble: Inmueble = await Inmueble.create(nuevoInmueble as any);
    return res.json({ message: "Inmueble creado exitosamente", inmueble });
  } catch (error) {
    console.log(`[ERROR] Error creando un nuevo inmueble: ${error}`)
    return res.status(500).json({ message: `Error interno del servidor: ${error}` });
  }
}

const editarInmueble = async (req: Request, res: Response) => {
  const { id } = req.params;
  const inmuebleActualizado: IInmueble = req.body;

  try {
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