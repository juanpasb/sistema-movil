import http from "./configService";
import {getToken} from "./token-config";
import {error} from "./error";
import {decrypt} from "../element/encript";

export const listaHistorialAxios = async () => {
    return await http.get(`/api/v1/historial/listar`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).catch((err: any) => {
        return error(err);
    });
};

export const historialUsuarioAxios = async (id: string) => {
    return await http.get(`/api/v1/historial/listar/usuario`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        params: {
            id: decrypt(id)
        }
    }).catch((err: any) => {
        return error(err);
    });
};