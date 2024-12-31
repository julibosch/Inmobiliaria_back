import { Request, Response } from "express";
import TipoContrato from "../models/TipoContrato";
import { ITipoContrato } from "../types/TipoContratoTypes";
import { Op } from "sequelize";

const listadoTipoContrato = async (req: Request, res: Response) => {
  try {
    const tipoContratos = await TipoContrato.findAll();
    return res.json(tipoContratos);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const crearTipoContrato = async (req: Request, res: Response) => {
  try {
    const validarTipoContrato = await TipoContrato.findOne({
      where: {
        duracion: req.body.duracion,
        plazo_aumento: req.body.plazo_aumento,
      },
    });
    if (validarTipoContrato)
      return res.status(400).json({
        message:
          "Ya existe un tipo de contrato con esa duracion y plazo aumento.",
      });
    const tipoContrato: ITipoContrato = await TipoContrato.create(req.body);
    return res.json({
      message: "Tipo contrato credo exitosamente.",
      tipoContrato,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const editarTipoContrato = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tipoContrato: TipoContrato | null = await TipoContrato.findByPk(id);

    if (!tipoContrato)
      return res.status(404).json({ message: "Tipo contrato no encontrado" });

    // Validar si ya existe un tipo de contrato con la misma duración y plazo aumento, excluyendo el actual
    const validarTipoContrato = await TipoContrato.findOne({
      where: {
        duracion: req.body.duracion,
        plazo_aumento: req.body.plazo_aumento,
        id: { [Op.ne]: id }, // Excluir el contrato actual
      },
    });

    if (validarTipoContrato)
      return res.status(400).json({
        message:
          "Ya existe un tipo de contrato con esa duración y plazo aumento.",
      });

    const tipoContratoUpdate: ITipoContrato = await tipoContrato.update(
      req.body
    );

    return res.json({
      message: "Tipo contrato actualizado exitosamente.",
      tipoContrato: tipoContratoUpdate,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const eliminarTipoContrato = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tipoContrato: TipoContrato | null = await TipoContrato.findByPk(id);
    if (!tipoContrato)
      return res.status(404).json({ message: "Tipo contrato no encontrado" });

    await tipoContrato.destroy();
    return res.json({ message: `Tipo contrato eliminado exitosamente!` });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export {
  listadoTipoContrato,
  crearTipoContrato,
  editarTipoContrato,
  eliminarTipoContrato,
};
