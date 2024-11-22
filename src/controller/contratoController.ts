import type { Request, Response } from "express";
import Contrato from "../models/Contrato";
import { IContratoBase, IContratoJoin } from "../types/ContratoTypes";
import Inmueble from "../models/Inmueble";
import Locatario from "../models/Locatario";

const listadoContratos = async (req: Request, res: Response) => {
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
        {
          model: Locatario,
        },
      ],
    });
    return res.json(contratos);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const crearContrato = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    //! ver si agregar Validacion de un contrato para que no se repita, es en base a (locatario, inmueble, fecha_desde fecha_hasta).
    const contrato: IContratoBase = await Contrato.create(req.body);
    return res.json({ message: "Contrato creado exitosamente", contrato });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const editarContrato = async (req: Request, res: Response) => {
  try {
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
      include: [{ model: Inmueble }, { model: Locatario }],
    });
    //!Ver si agregar validacion para no repetir contrato.
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
    if (!contrato) return res.status(404).json({message: "Contrato no encontrado"});

    await contrato.destroy();
    return res.json({message: "Contrato eliminado exitosamente."});
  } catch (error) {
    return res.status(500).json({message: error});
  }
}

export { crearContrato, listadoContratos, editarContrato, eliminarContrato };
