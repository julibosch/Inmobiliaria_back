import IContrato from "./ContratoTypes";

interface IInmueble {
  id?: number;  // ID del inmueble
  calle: string;
  altura?: string;
  localidad: string;
  piso?: string;  // Opcional
  departamento?: string;  // Opcional
  locadorId: number;  // Relación con Locador
  locador?: {
    nombre: string;
    apellido: string;
    dni: string;
  };  // Puedes incluir solo los campos que necesites del locador
  contratos?: IContrato[];  // Relación con contratos, si se incluye
}

export default IInmueble;
