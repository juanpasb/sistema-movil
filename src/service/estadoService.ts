import http from "./configService";
import { getToken } from "./token-config";
import { error } from "./error";

export const listaEstadosAxios = async () => {
  return await http.get(`/api/v1/estado/listar`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).catch((err: any) => {
    return error(err);
  });
};

export const listaRolesAxios = async () => {
  return await http.get(`/api/v1/rol/listar`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).catch((err) => {
    return error(err);
  });
};