import Locador from "../models/Locador";
import IContrato from "./ContratoTypes";
import { ILocatario } from "./LocatarioTypes";

interface IInmueble {
  id?: number;  // ID del inmueble
  calle: string;
  altura?: string;
  localidad: string;
  piso?: string;  // Opcional
  departamento?: string;  // Opcional
  locadorId?: number;  // Relación con Locador
  contratos?: IContrato[];  // Relación con contratos, si se incluye
}

//Este se usa para cuando hacemos el get(join) con locador, saca el campo id y agrega el objeto Locador
interface InmuebleJoin extends Omit<IInmueble, 'locadorId'> {
  locador: ILocatario;
}

export {IInmueble, InmuebleJoin};
