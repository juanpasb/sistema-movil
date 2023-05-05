import http from "./configService";
import {getToken} from "./token-config";
import {error} from "./error";
import {Parametro} from "../model/parametro";

export const listaParametrosAxios = async () => {
    return await http.get(`/api/v1/parametro/listar`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).catch((err: any) => {
        return error(err);
    });
};

export const cambiarEstadoParametroAxios = async (id: number, estado: string) => {
    return await http.post(`/api/v1/parametro/estado`, {id: id, estado: estado}, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const agregarParametroAxios = async (parametro: Parametro) => {
    return await http.post(`/api/v1/parametro/guardar`, parametro, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const listarTipoHoraAxios = async () => {
    return await http.get(`/api/v1/parametro/tipo-hora`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).catch((err: any) => {
        return error(err);
    });
};

export const listarTipoJornadaAxios = async () => {
    return await http.get(`/api/v1/parametro/tipo-jornada`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).catch((err: any) => {
        return error(err);
    });
};
