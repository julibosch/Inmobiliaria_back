import IInmueble from "./InmuebleTypes";

interface IContrato {
  id?: number;  // ID del contrato
  id_locatario: number;  // Relación con Locatario
  id_inmueble: number;  // Relación con Inmueble
  fecha_inicio: Date;
  fecha_fin: Date;
  estado: string;  // Ejemplos: "vigente", "finalizado", etc.
  alerta_vencimiento: number;  // Días antes para la alerta de vencimiento
  monto: number;  // Monto del alquiler
  locatario?: {
    nombre: string;
    apellido: string;
    dni: string;
  };  // Opcional, solo si necesitas datos del locatario
  inmueble?: IInmueble;  // Relación con inmueble, opcional
}

export default IContrato;
