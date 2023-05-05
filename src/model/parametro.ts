export interface Parametro {
  id: number | null;
  descripcion: string;
  abreviatura: string;
  horaInicio: Date;
  horaFin: Date;
  hora: string | null;
  jornada: string | null;
  estado: string | null;
}