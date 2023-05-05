import { Usuario } from "./usuario";

export interface Historial {
  id: number;
  fecha: string;
  usuario: Usuario;
  descripcion: string;
  tipo: string;
}