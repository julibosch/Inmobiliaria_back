import { Request, Response } from "express";
import HistorialContrato from "../models/HistorialContratos";
import { IContratoJoin } from "../types/ContratoTypes";
import { addMonths, getDate, isAfter, lastDayOfMonth } from "date-fns";
import Contrato from "../models/Contrato";

const listadoHistorialContratos = async (req: Request, res: Response) => {
  try {
    const historialContratos = await HistorialContrato.findAll({
      where: {
        estado: 'vigente',
      }
    });
    return res.json(historialContratos);
  } catch (error) {
    console.error("[ERROR] Error al listar el historial de contratos: ", error);
    return res.status(500).json({ message: `Error interno del servidor: ${error}` });
  }
}

const obtenerHistorial = async (req: Request, res: Response) => {
  try {
    console.log("id: ", req.params.id)
    const historialContrato = await HistorialContrato.findAll({
      where: {
        id_contrato: req.params.id,
      },
      order: [['fecha_actualizacion', 'ASC']],
    });
    return res.json(historialContrato);
  } catch (error) {
    console.error("[ERROR] Error al listar el historial del contrato: ", error);
    return res.status(500).json({ message: `Error interno del servidor: ${error}` });
  }
}

const actualizarCrearHistorialContratos = async (req: Request, res: Response) => {
  console.log("[ACTUALIZAR Y CREAR HIST] ", req.body);
  try {
    const { id_contrato, id_historial, importe_actualizado, plazo_aumento } = req.body;

    // Obtener el historial actual
    const historial_a_actualizar = await HistorialContrato.findOne({ where: { id: id_historial } });
    if (!historial_a_actualizar) {
      console.error("[WARNING] No se encontró el historial a actualizar ", id_historial);
      return res.status(404).json({ message: `No se encontró el historial: ${id_historial}` });
    }

    // Actualizar el estado a 'finalizado'
    if (historial_a_actualizar.dataValues.estado === 'vigente') {
      await historial_a_actualizar.update({ estado: 'finalizado' });
    }

    // Crear un nuevo historial
    const nueva_fecha_actualizacion = addMonths(new Date(historial_a_actualizar.dataValues.fecha_actualizacion), Number(plazo_aumento));

    const nuevo_historial = await HistorialContrato.create({
      id_contrato,
      importe_actualizado,
      fecha_actualizacion: nueva_fecha_actualizacion,
      estado: 'vigente',
    });

    // Actualizar el importe del contrato original
    const contrato_a_actualizar = await Contrato.findOne({ where: { id: id_contrato } });
    if (!contrato_a_actualizar) {
      console.error("[WARNING] No se encontró el contrato a actualizar ", id_contrato);
      return res.status(404).json({ message: `No se encontró el contrato: ${id_contrato}` });
    }

    const contrato_actualizado = await contrato_a_actualizar.update({ importe: importe_actualizado });

    console.log("[DEBUG] Contrato actualizado: ", contrato_actualizado);

    return res.json(nuevo_historial);

  } catch (error) {
    console.error("[ERROR] Error al actualizar y crear el historial del contrato: ", error);
    return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
  }
}

const crearHistorialContratos = async (res: Response, contratoJoin: IContratoJoin) => {
  const { id, fecha_inicio, fecha_fin, importe } = contratoJoin;

  const fechaInicioDate = new Date(fecha_inicio); // Fecha de inicio del contrato
  const fechaFinDate = new Date(fecha_fin); // Fecha de finalización del contrato
  const hoy = new Date(); // Fecha actual

  // Obtener el plazo de aumento (en meses)
  const plazoAumentoMeses = contratoJoin.tipo_contrato.plazo_aumento;

  let proximaFechaAumento = new Date(Date.UTC(fechaInicioDate.getUTCFullYear(), fechaInicioDate.getUTCMonth(), 1));

  // Iterar hasta encontrar el próximo aumento válido
  while (proximaFechaAumento <= hoy) {
    proximaFechaAumento = addMonths(proximaFechaAumento, plazoAumentoMeses);

    // Si la fecha cae en el último día del mes, ajustarla al primer día del mes siguiente
    if (proximaFechaAumento.getUTCDate() !== 1) {
      proximaFechaAumento = new Date(Date.UTC(proximaFechaAumento.getUTCFullYear(), proximaFechaAumento.getUTCMonth() + 1, 1));
    }

    console.log(proximaFechaAumento)
  }

  // Validar que la próxima fecha de aumento no exceda la fecha de finalización
  if (isAfter(proximaFechaAumento, fechaFinDate)) {
    console.log("No se generará historial: la próxima fecha excede la fecha de finalización.");
    throw new Error("No se generará historial: la próxima fecha excede la fecha de finalización.");
  }

  // Crear el historial para la próxima fecha válida
  const fecha_actualizacion_formateada = proximaFechaAumento.toISOString().split("T")[0];

  try {
    const nuevoHistorialContrato = await HistorialContrato.create({
      id_contrato: id,
      fecha_actualizacion: fecha_actualizacion_formateada,
      importe_actualizado: importe,
      estado: "vigente",
    });

    return nuevoHistorialContrato.get({ plain: true });

  } catch (error) {
    console.error("[ERROR] Error al crear el historial del contrato: ", error);
    throw new Error("Error al crear el historial del contrato.", error);
  }
};

export {
  listadoHistorialContratos,
  actualizarCrearHistorialContratos,
  crearHistorialContratos,
  obtenerHistorial
}