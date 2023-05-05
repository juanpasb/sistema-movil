import http from "./configService";
import { getToken } from "./token-config";
import { error } from "./error";

export const listaAreasActivasAxios = async () => {
  return await http.get(`/api/v1/area/activas`);
};

export const listaAreasAxios = async () => {
  return await http.get(`/api/v1/area/listar`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).catch((err: any) => {
    return error(err);
  });
};

export const cambiarEstadoAreaAxios = async (id: number, estado: string) => {
  return await http.post(`/api/v1/area/estado`, { id: id, estado: estado }, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const agregarAreaAxios = async (nombre: string) => {
  return await http.post(`/api/v1/area/guardar`, { nombre: nombre }, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const actualizarAreaAxios = async (id: number, nombre: string, estado: string) => {
  return await http.post(`/api/v1/area/guardar`, { id: id, nombre: nombre, estado: estado }, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};
