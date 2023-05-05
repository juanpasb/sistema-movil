import Cookies from "js-cookie";
import { Usuario } from "../model/usuario";

/**
 * @description token
 */
export const getToken = (): string | null => {
  return Cookies.get("token") === undefined ? null : String(Cookies.get("token"));
};

export const getUsuario = (): Usuario | null => {
  return Cookies.get("user") === undefined ? null : JSON.parse(String(Cookies.get("user")));
};

export const clearToken = (): void => {
  Cookies.remove("token");
  Cookies.remove("user");
};