import { Registro } from "./registro";
import { Parametro } from "./parametro";

export interface ParametroUsuario {
  id: number;
  registro: Registro;
  parametro:Parametro;
  horasTrabajadasExtra: number;
  horasTrabajadas: number;
}