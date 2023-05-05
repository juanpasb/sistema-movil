import { Usuario } from "../model/usuario";

export const formatName = (usuario: Usuario | null) => {
  let nombre = "";
  if (usuario !== null) {
    nombre = usuario.nombre.split(" ")[0] + " " + usuario.apellido.split(" ")[0];
  }
  return nombre;
};