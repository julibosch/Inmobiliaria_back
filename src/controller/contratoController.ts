import type { Request, Response } from "express";
import Contrato from "../models/Contrato";
import { IContratoBase, IContratoJoin } from "../types/ContratoTypes";
import Inmueble from "../models/Inmueble";
import Locatario from "../models/Locatario";
import TipoContrato from "../models/TipoContrato";
import { Op } from "sequelize";
import { crearHistorialContratos } from "./historialContratoController";

const listadoContratos = async (_req: Request, res: Response) => {

  try {
    const contratos: IContratoJoin[] = await Contrato.findAll({
      attributes: [
        "id",
        "fecha_inicio",
        "fecha_fin",
        "estado",
        "alerta_vencimiento",
        "importe",
      ],
      include: [
        { model: Inmueble },
        { model: Locatario },
        { model: TipoContrato },
      ],
    });
    return res.json(contratos);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const crearContrato = async (req: Request, res: Response) => {
  try {
    // Esto es opcional, si decides agregar la validación.
    const { id_locatario, id_inmueble, fecha_inicio, fecha_fin } = req.body;
    const contratoExistente = await Contrato.findOne({
      where: {
        id_locatario,
        id_inmueble,
        fecha_inicio,
        fecha_fin,
      },
    });

    if (contratoExistente) {
      return res.status(400).json({
        message: "Ya existe un contrato con los mismos datos.",
      });
    }
    // Si no existe un contrato con los mismos datos, procedemos a crear el contrato.
    const contrato: IContratoBase = await Contrato.create(req.body);

    // Obtenemos el contrato con las relaciones (join) al igual que en `editarContrato`.
    const contratoJoin = await Contrato.findByPk(contrato.id, {
      attributes: [
        "id",
        "fecha_inicio",
        "fecha_fin",
        "estado",
        "alerta_vencimiento",
        "importe",
      ],
      include: [
        { model: Inmueble },
        { model: Locatario },
        { model: TipoContrato },
      ],
    });
    const contratoPlano = contratoJoin.get({ plain: true });

    const historial_contrato = crearHistorialContratos(res, contratoPlano);

    return res.json({
      message: "Contrato creado exitosamente",
      contrato: contratoJoin,
      historial_contrato: historial_contrato,
    });
  } catch (error) {
    console.error("[ERROR] Error al crear el contrato: ", error);
    return res.status(500).json({ message: error });
  }
};

const editarContrato = async (req: Request, res: Response) => {
  try {
    const { id_locatario, id_inmueble, fecha_inicio, fecha_fin } = req.body;

    // Verificar si ya existe un contrato con los mismos datos (excepto el que se está editando)
    const contratoExistente = await Contrato.findOne({
      where: {
        id_locatario,
        id_inmueble,
        fecha_inicio,
        fecha_fin,
        id: { [Op.ne]: req.params.id }, // Excluir el contrato actual
      },
    });

    if (contratoExistente) {
      return res.status(400).json({
        message: "Ya existe un contrato con los mismos datos.",
      });
    }

    const contrato: Contrato | null = await Contrato.findByPk(req.params.id);
    if (!contrato) {
      return res.status(404).json({ message: "Contrato no encontrado." });
    }

    await contrato.update(req.body);

    const contratoJoin: IContratoJoin = await Contrato.findByPk(req.params.id, {
      attributes: [
        "id",
        "fecha_inicio",
        "fecha_fin",
        "estado",
        "alerta_vencimiento",
        "importe",
      ],
      include: [
        { model: Inmueble },
        { model: Locatario },
        { model: TipoContrato },
      ],
    });

    return res.json({
      message: "Contrato actualizado exitosamente",
      contrato: contratoJoin,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const eliminarContrato = async (req: Request, res: Response) => {
  try {
    const contrato = await Contrato.findByPk(req.params.id);
    if (!contrato)
      return res.status(404).json({ message: "Contrato no encontrado" });

    await contrato.destroy();
    return res.json({ message: "Contrato eliminado exitosamente." });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const actualizarEstadoContrato = async (req: Request, res: Response) => {
  try {
    const contrato = await Contrato.findByPk(req.params.id);
    if (!contrato) {
      return res.status(404).json({ message: "Contrato no encontrado." });
    }

    await contrato.update({ estado: req.body.estado });
    return res.json({ message: "Estado del contrato actualizado exitosamente." });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export {
  crearContrato,
  listadoContratos,
  editarContrato,
  eliminarContrato,
  actualizarEstadoContrato
};
