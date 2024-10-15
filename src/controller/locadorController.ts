import { Request, Response } from "express";
import Locatario from "../models/Locatario";
import { ILocatario } from "../types/LocatarioTypes";
import { Op } from "sequelize";
import Locador from "../models/Locador";

const listadoLocador = async (req: Request, res: Response) => {
  try {
    const locador: ILocatario[] = await Locador.findAll();
    return res.json(locador);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const obtenerLocador = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const locador: Locatario = await Locador.findByPk(id);

    if (!locador)
      return res.status(404).json({ message: "Locador no encontrado" });

    return res.json(locador);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const crearLocador = async (req: Request, res: Response) => {
  try {
    const validarDniExistente = await Locador.findOne({
      where: { dni: req.body.dni },
    });
    if (validarDniExistente) return res.status(400).json({message: "Ya existe un Locador con ese DNI"});

    const locador: Locatario = await Locador.create(req.body);
    return res.json({ message: "Locador creado exitosamente", locador });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const editarLocador = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const locador: Locatario | null = await Locador.findByPk(id);
    if (!locador)
      return res.status(404).json({ message: "Locador no encontrado" });

    const validarDniExistente = await Locador.findOne({
      where: {
        dni: req.body.dni,
        id: {
          [Op.ne]: id, // Excluir el locatario que se está editando
        },
      },
    });
    if (validarDniExistente) return res.status(400).json({message: "Ya existe un Locador con ese DNI"});

    const locadorUpdate: Locatario = await locador.update(req.body);

    return res.json({message: "Locatario actualizado exitosamente!", locador: locadorUpdate});

  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const eliminarLocador = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const locador: Locatario | null = await Locador.findByPk(id);
    if (!locador)
      return res.status(404).json({ message: "Locador no encontrado" });

    await locador.destroy();
    return res.json({message: `Locador eliminado exitosamente!`});
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export { crearLocador, listadoLocador, obtenerLocador, editarLocador, eliminarLocador };
