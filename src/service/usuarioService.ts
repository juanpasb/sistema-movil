import http from "./configService";
import {getToken} from "./token-config";
import {error} from "./error";
import {UsuarioDto} from "../dto/usuarioDto";

export const numeroEmpleadosAxios = async () => {
    return await http.get(`/api/v1/usuario/numero-empleados`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).catch((err: any) => {
        return error(err);
    });
};

export const usuariosAxios = async () => {
    return await http.get(`/api/v1/usuario/listar`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).catch((err: any) => {
        return error(err);
    });
};

export const cambiarEstadoUsuariosAxios = async (id: number, estado: string) => {
    return await http.post(`/api/v1/usuario/estado`, {id: id, estado: estado}, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const agregarUsuarioAxios = async (usuario: UsuarioDto) => {
    return await http.post(`/api/v1/usuario/guardar`, usuario, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const actualizarUsuarioAxios = async (usuario: UsuarioDto) => {
    return await http.post(`/api/v1/usuario/actualizar`, usuario, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};