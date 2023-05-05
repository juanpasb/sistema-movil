import http from "./configService";
import {Ingreso} from "../model/ingreso";
import {Documento} from "../model/documento";
import {getToken} from "./token-config";
import {error} from "./error";
import {Sede} from "../model/sede";
import {decrypt} from "../element/encript";

export const listaTipoUsuarioAxios = async () => {
    return await http.get(`/api/v1/registro/tipoUsuario`);
};

export const listaTipoCargaAxios = async () => {
    return await http.get(`/api/v1/registro/carga`);
};

export const registroIngresoAxios = async (ingreso: Ingreso) => {
    return await http.post("/api/v1/registro/registro", ingreso);
};

export const registroIngresoEmpleadoAxios = async (ingreso: {
    documento: Documento;
    sede: Sede;
}) => {
    return await http.post("/api/v1/registro/ingreso", ingreso);
};

export const registroSalidaAxios = async (documento: Documento) => {
    return await http.post("/api/v1/registro/salida", documento);
};

export const listaRegistrosAxios = async () => {
    return await http.get(`/api/v1/registro/listar`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).catch((err) => {
        return error(err);
    });
};

export const registrosUsuarioAxios = async (id: string) => {
    return await http.get(`/api/v1/registro/listar/usuario`, {
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