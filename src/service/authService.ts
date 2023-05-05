import http from "./configService";
import { getToken } from "./token-config";

export const recuperarClaveAxios = async (correo: string) => {
  return await http.post(`/api/v1/auth/recover-password`, {}, {
    headers: {},
    params: {
      "email": correo
    }
  });
};

export interface VerificateCode {
  code: string;
  id: number;
  password?: string;
}

export const validarCodigoAxios = async (verificateCode: VerificateCode) => {
  return await http.post(`/api/v1/auth/verificate-code-recovery`, verificateCode, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const cambiarClaveAxios = async (verificateCode: VerificateCode) => {
  return await http.post(`/api/v1/auth/change-password`, verificateCode, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export interface AuthService {
  clave: string;
  correo: string;
}

export const autenticarseAxios = (auth: AuthService) => {
  return http.post(`/api/v1/auth/authenticate`, auth, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const logoutAxios =  () => {
  return  http.post(`/api/v1/auth/logout`, null, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};