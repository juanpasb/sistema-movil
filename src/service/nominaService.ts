import http from "./configService";
import {getToken} from "./token-config";
import {error} from "./error";
import {decrypt} from "../element/encript";

export const listaNominasAxios = async () => {
    return await http.get(`/api/v1/nomina/listar`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).catch((err: any) => {
        return error(err);
    });
};

export const procesarNominaAxios = async () => {
    return await http.get(`/api/v1/nomina/procesar`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const listaNominaUsuarioAxios = async (nomina: string) => {
    return await http.get(`/api/v1/nomina/listar/nomina`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        params: {
            nomina: decrypt(nomina)
        }
    }).catch((err: any) => {
        return error(err);
    });
};

export const listaRegistrosUsuarioAxios = async (nomina: string, usuario: string) => {
    return await http.get(`/api/v1/nomina/listar/nomina/usuario`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        params: {
            nomina: decrypt(nomina),
            usuario: decrypt(usuario)
        }
    }).catch((err: any) => {
        return error(err);
    });
};