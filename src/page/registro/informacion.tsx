import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Usuario } from "../../model/usuario";
import { decrypt } from "../../element/encript";

const Informacion = () => {
  const [usuarioInfo, setUsuarioInfo] = useState<Usuario>();
  const { usuario, message, date } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setUsuarioInfo(JSON.parse(decrypt(usuario as string)));
    } catch (error) {
      navigate("/");
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center pt-24 mx-4">
      <div className="w-full max-w-lg overflow-hidden bg-white rounded-md shadow-lg">

        <div className="flex items-center justify-between px-6 py-3 backdrop-blur-lg bg-gray-800/20 ">
          <h1 className="mx-3 text-lg font-semibold text-white">Información
            usuario</h1>
          <h2 className="mx-3 text-sm font-semibold text-gray-400">{decrypt(date as string)}</h2>
        </div>

        <div className="px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800 text-center">{decrypt(message as string)}</h1>

          {<div className="flex items-center mt-4 text-gray-700">
            <label className="block text-sm font-medium text-gray-700">Nombre completo: </label>
            <h1 className="px-2 text-md">{usuarioInfo?.nombre} {usuarioInfo?.apellido}</h1>
          </div>}

          {<div className="flex items-center mt-4 text-gray-700">
            <label className="block text-sm font-medium text-gray-700">Documento: </label>
            <h1 className="px-2 text-md">{usuarioInfo?.tipoDocumento.nombre} - {usuarioInfo?.numeroDocumento}</h1>
          </div>}

          {usuarioInfo?.numeroCelular !== null && (
            <div className="flex items-center mt-4 text-gray-700">
              <label className="block text-sm font-medium text-gray-700">Celular: </label>
              <h1 className="px-2 text-md">{usuarioInfo?.numeroCelular}</h1>
            </div>
          )}

          {<div className="flex items-center mt-4 text-gray-700">
            <label className="block text-sm font-medium text-gray-700">Celular de emergencia: </label>
            <h1 className="px-2 text-md">{usuarioInfo?.numeroEmergencia}</h1>
          </div>}

          {usuarioInfo?.correo !== null && (
            <div className="flex items-center mt-4 text-gray-700">
              <label className="block text-sm font-medium text-gray-700">Correo: </label>
              <h1 className="px-2 text-md">{usuarioInfo?.correo}</h1>
            </div>
          )}

          {usuarioInfo?.area !== null && (
            <div className="flex items-center mt-4 text-gray-700">
              <label className="block text-sm font-medium text-gray-700">Area: </label>
              <h1 className="px-2 text-md">{usuarioInfo?.area?.nombre}</h1>
            </div>
          )}

          {usuarioInfo?.empresa !== null && (
            <div className="flex items-center mt-4 text-gray-700">
              <label className="block text-sm font-medium text-gray-700">Empresa: </label>
              <h1 className="px-2 text-md">{usuarioInfo?.empresa}</h1>
            </div>
          )}
        </div>
      </div>
    </main>
  );

};

export default Informacion;