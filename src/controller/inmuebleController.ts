import { Request, Response } from "express";

const listadoInmuebles = async (req: Request, res: Response) => {
  try {
    // const inmuebles: ILocatario[] = await Inmueble.findAll();
    // return res.json(inmuebles);
    console.log("Listado de inmuebles");
  } catch (error) {
    return res.status(500).json(error);
  }
}

const obtenerInmueble = async (req: Request, res: Response) => {
  // const { id } = req.params;
  try {
    // const inmueble: Inmueble = await Inmueble.findByPk(id);
    // if (!inmueble)
    //   return res.status(404).json({ message: "Inmueble no encontrado" });
    // return res.json(inmueble);
    console.log("Obtener inmueble");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const crearInmueble = async (req: Request, res: Response) => {
  try {
    // const inmueble: Inmueble = await Inmueble.create(req.body);
    // return res.json({ message: "Inmueble creado exitosamente", inmueble });
    console.log("Crear inmueble");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const editarInmueble = async (req: Request, res: Response) => {
  // const { id } = req.params;
  try {
    // const inmueble: Inmueble | null = await Inmueble.findByPk(id);
    // if (!inmueble)
    //   return res.status(404).json({ message: "Inmueble no encontrado" });
    // return res.json(inmueble);
    console.log("Editar inmueble");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const eliminarInmueble = async (req: Request, res: Response) => {
  // const { id } = req.params;
  try {
    // const inmueble: Inmueble | null = await Inmueble.findByPk(id);
    // if (!inmueble)
    //   return res.status(404).json({ message: "Inmueble no encontrado" });
    // await inmueble.destroy();
    // return res.json({ message: "Inmueble eliminado" });
    console.log("Eliminar inmueble");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export { listadoInmuebles, obtenerInmueble, crearInmueble, editarInmueble, eliminarInmueble };