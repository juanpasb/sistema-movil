import http from "./configService";
import {getToken} from "./token-config";
import {error} from "./error";

export const listaTipoDocumentoActivosAxios = async () => {
    return await http.get(`/api/v1/tipo-documento/activos`);
};

export const listaTipoDocumentoAxios = async () => {
    return await http.get(`/api/v1/tipo-documento/listar`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).catch((err: any) => {
        return error(err);
    });
};

export const cambiarEstadoTipoDocumentoAxios = async (id: number, estado: string) => {
    return await http.post(`/api/v1/tipo-documento/estado`, {id: id, estado: estado}, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const agregarTipoDocumentoAxios = async (nombre: string, abreviatura: string) => {
    return await http.post(`/api/v1/tipo-documento/guardar`, {
        nombre: nombre,
        abreviatura: abreviatura
    }, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const actualizarTipoDocumentoAxios = async (id: number, nombre: string, abreviatura: string, estado: string) => {
    return await http.post(`/api/v1/tipo-documento/guardar`, {
        id: id,
        nombre: nombre,
        abreviatura: abreviatura,
        estado: estado
    }, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

