import { TipoDocumento } from "./tipoDocumento";

export interface Documento {
  tipo?:TipoDocumento | null;
  numero?:string | null;
}