import http from "./configService";
import {getToken} from "./token-config";
import {error} from "./error";

export const listaSedesActivasAxios = async () => {
    return await http.get(`/api/v1/sede/activas`);
}

export const listaSedesAxios = async () => {
    return await http.get(`/api/v1/sede/listar`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).catch((err: any) => {
        return error(err);
    });
};

export const cambiarEstadoSedeAxios = async (id: number, estado: string) => {
    return await http.post(`/api/v1/sede/estado`, {id: id, estado: estado}, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const agregarSedeAxios = async (nombre: string, direccion: string) => {
    return await http.post(`/api/v1/sede/guardar`, {
        nombre: nombre,
        direccion: direccion
    }, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const actualizarSedeAxios = async (id: number, nombre: string, direccion: string, estado: string) => {
    return await http.post(`/api/v1/sede/guardar`, {
        id: id,
        nombre: nombre,
        direccion: direccion,
        estado: estado
    }, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};