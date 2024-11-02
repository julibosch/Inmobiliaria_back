import { Request, Response } from "express";
import TipoContrato from "../models/TipoContrato";
import { ITipoContrato } from "../types/TipoContratoTypes";
import Contrato from "../models/Contrato";

const listadoTipoContrato = async (req: Request, res: Response) => {
  try {
    const tipoContratos = await TipoContrato.findAll();
    return res.json(tipoContratos);
  } catch (error) {
    return res.status(500).json({message: error});
  }
};

const crearTipoContrato = async (req: Request, res: Response) => {
  try {
    const validarContrato = await Contrato.findOne({where: req.body.duracion});
    if (validarContrato) return res.status(400).json({message: "Ya existe un tipo de contrato con esa duracion."});
    const contrato: ITipoContrato = await TipoContrato.create(req.body);
    return res.json({message: "Tipo contrato credo exitosamente.", contrato});
  } catch (error) {
    return res.status(500).json({message: error});
  }
};
const editarTipoContrato = async (req: Request, res: Response) => {};
const eliminarTipoContrato = async (req: Request, res: Response) => {};

export {
  listadoTipoContrato,
  crearTipoContrato,
  editarTipoContrato,
  eliminarTipoContrato,
};
