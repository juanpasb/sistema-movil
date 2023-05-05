import http from "./configService";
import { getToken } from "./token-config";
import { error } from "./error";
import { ConfigNomina } from "../model/configNomina";

export const obtenerConfigNominaAxios = async () => {
  return await http.get(`/api/v1/config-nomina/obtener`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).catch((err: any) => {
    return error(err);
  });
};

export const cambiarConfigNominaAxios = async (configNomina: ConfigNomina) => {
  return await http.post(`/api/v1/config-nomina/guardar`, configNomina, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};