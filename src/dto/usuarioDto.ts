import { Documento } from "../model/documento";
import { Rol } from "../model/rol";
import { Area } from "../model/area";

export interface UsuarioDto {
  id?: number | null;
  nombre: string;

  apellido: string;

  correo?: string | null;

  password?: string | null;

  documento: Documento;

  empresa?: string | null;

  area?: Area | null;

  numeroEmergencia?: string;

  numeroCelular?: string | null;

  envioCorreo: boolean;

  roles: Rol[];
}