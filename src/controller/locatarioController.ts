import { Request, Response } from "express";
import Locatario from "../models/Locatario";
import { ILocatario } from "../types/LocatarioTypes";
import { Op } from "sequelize";

const listadoLocatarios = async (req: Request, res: Response) => {
  try {
    const locatarios: ILocatario[] = await Locatario.findAll();
    return res.json(locatarios);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const obtenerLocatario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const locatario: Locatario = await Locatario.findByPk(id);

    if (!locatario)
      return res.status(404).json({ message: "Locatario no encontrado" });

    return res.json(locatario);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const crearLocatario = async (req: Request, res: Response) => {
  try {
    const validarDniExistente = await Locatario.findOne({
      where: { dni: req.body.dni },
    });
    if (validarDniExistente) return res.status(400).json({message: "Ya existe un Locatario con ese DNI"});

    const locatario: Locatario = await Locatario.create(req.body);
    return res.json({ message: "Locatario creado exitosamente", locatario });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const editarLocatario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const locatario: Locatario | null = await Locatario.findByPk(id);
    if (!locatario)
      return res.status(404).json({ message: "Locatario no encontrado" });

    const validarDniExistente = await Locatario.findOne({
      where: {
        dni: req.body.dni,
        id: {
          [Op.ne]: id, // Excluir el locatario que se está editando
        },
      },
    });
    if (validarDniExistente) return res.status(400).json({message: "Ya existe un Locatario con ese DNI"});

    const locatarioUpdate: Locatario = await locatario.update(req.body);

    return res.json({message: "Locatario actualizado exitosamente!", locatario: locatarioUpdate});

  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const eliminarLocatario = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const locatario: Locatario | null = await Locatario.findByPk(id);
    if (!locatario)
      return res.status(404).json({ message: "Locatario no encontrado" });

    await locatario.destroy();
    return res.json({message: `Locatario eliminado exitosamente!`});
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export { crearLocatario, listadoLocatarios, obtenerLocatario, editarLocatario, eliminarLocatario };
