import Locador from "../models/Locador";
import { IContratoBase } from "./ContratoTypes";
import { ILocatario } from "./LocatarioTypes";

interface IInmueble {
  id?: number; // ID del inmueble
  calle: string;
  altura?: string;
  torre?: string;  // Opcional
  localidad: string;
  piso?: string; // Opcional
  departamento?: string; // Opcional
  locadorId?: number; // Relación con Locador
  contratos?: IContratoBase[]; // Relación con contratos, si se incluye
}

//Este se usa para cuando hacemos el get(join) con locador, saca el campo id y agrega el objeto Locador
interface InmuebleJoin {
  locador: ILocatario;
}

export { IInmueble, InmuebleJoin };
