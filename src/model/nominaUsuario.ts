import { Usuario } from "./usuario";

export interface NominaUsuario {
  id: number;
  usuario: Usuario;
  horasTrabajadas: number;
  horasTrabajadasExtra: number;
}