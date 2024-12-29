import type { Request, Response } from "express";
import Contrato from "../models/Contrato";
import { IContratoBase, IContratoJoin } from "../types/ContratoTypes";
import Inmueble from "../models/Inmueble";
import Locatario from "../models/Locatario";
import TipoContrato from "../models/TipoContrato";
import { Op, Sequelize } from "sequelize";
import { crearHistorialContratos } from "./historialContratoController";

const listadoContratos = async (req: Request, res: Response) => {
  const { finalizados } = req.query;
  // Convertir finalizados a booleano
  const esFinalizado = finalizados === "true"; // Interpreta "true" como verdadero, porque en el param pasa a ser string

  const hoy = new Date();
  const condicionFecha: any = esFinalizado
    ? { fecha_fin: { [Op.lt]: hoy } } //Trae Contratos finalizados
    : { fecha_fin: { [Op.gte]: hoy } }; //Trae Contratos no finalizados

  try {
    const contratos: IContratoJoin[] = await Contrato.findAll({
      where: condicionFecha,
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

export {
  crearContrato,
  listadoContratos,
  editarContrato,
  eliminarContrato,
};
