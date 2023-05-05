import { TipoDocumento } from "./tipoDocumento";
import { Rol } from "./rol";
import { Area } from "./area";

export interface Usuario {
  id: number;

  nombre: string;

  apellido: string;

  correo: string | null;

  tipoDocumento: TipoDocumento;

  numeroDocumento: string;

  estado: string;

  empresa: string;

  area: Area | null;

  numeroEmergencia: string | null;

  numeroCelular: string | null;

  roles: Rol[];

}