import { Documento } from "./documento";
import { Sede } from "./sede";
import { Area } from "./area";

export interface Ingreso {
  nombre: string;
  apellido: string;
  documento: Documento | null;
  empresa: string | null;
  sede: Sede | null;
  placa: string | null;
  area: Area | null;
  numeroEmergencia: string;
  encargado: string | null;
  factura: string | null;
  unidades: number | null | string;
  peso: number | null | string;
  cargueDevolucion: string | null;
  tipoUsuario: string;
}