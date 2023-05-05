import { Sede } from "./sede";
import { Usuario } from "./usuario";

export interface Registro {
  id: number;
  fechaLlegada: string;
  fechaSalida: string | null;
  usuario: Usuario;
  placa: string | null;
  sede: Sede | null;
  tipoUsuario: string;
  encargado: string | null;
  factura: string | null;
  unidades: number | null;
  peso: number | null;
  cargueDevolucion: string | null;
  estado: string;
}