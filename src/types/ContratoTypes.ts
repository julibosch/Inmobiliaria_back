import { IInmueble } from "./InmuebleTypes";

interface IContratoBase {
  id?: number;
  id_locatario: number;
  id_inmueble: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado: Estado;
  alerta_vencimiento: number;
  importe: number;
}

enum Estado {
  VIGENTE = "vigente",
  FINALIZADO = "finalizado",
  RESCINDIDO = "rescindido",
  PROXIMO_A_VENCER = "proximo_a_vencer",
}

interface IContratoJoin {
  id?: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado: Estado;
  alerta_vencimiento: number;
  importe: number;
  locatario?: {
    id?: number;
    nombre: string;
    apellido: string;
    dni: string;
  };
  inmueble?: IInmueble;
  tipo_contrato?: {
    id?: number;
    duracion: number;
    plazo_aumento: number;
    alarma_aumento: number;
  }
}

export { IContratoBase, IContratoJoin, Estado };
