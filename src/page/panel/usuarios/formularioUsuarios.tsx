import React, { useEffect } from "react";
import { TipoDocumento } from "../../../model/tipoDocumento";
import { success, timeoutConfig, warning } from "../../../config/config";
import { ModalProps } from "../../../components/menuModal";
import Load from "../../../components/load";
import { error } from "../../../service/error";
import { Usuario } from "../../../model/usuario";
import { Rol } from "../../../model/rol";
import { listaTipoDocumentoAxios } from "../../../service/tipoDocumentoService";
import { listaRolesAxios } from "../../../service/estadoService";
import { UsuarioDto } from "../../../dto/usuarioDto";
import { getUsuario } from "../../../service/token-config";
import Cookies from "js-cookie";
import { Area } from "../../../model/area";
import { listaAreasActivasAxios } from "../../../service/areaService";

const FormularioUsuarios = (props: { usuario?: Usuario | undefined, event: any, modalProps: ModalProps }) => {
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [tipoDocumentos, setTipoDocumentos] = React.useState<TipoDocumento[]>([]);
  const [rolesList, setRolesList] = React.useState<Rol[]>([]);
  const [areasList, setAreasList] = React.useState<Area[]>([]);

  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [numeroDocumento, setNumeroDocumento] = React.useState("");
  const [tipoDocumento, setTipoDocumento] = React.useState<TipoDocumento>();
  const [numeroCelular, setNumeroCelular] = React.useState("");
  const [numeroEmergencia, setNumeroEmergencia] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rol, setRol] = React.useState<Rol | null>();
  const [sendEmail, setSendEmail] = React.useState(false);
  const [area, setArea] = React.useState<Area | null>(null);
  const [empresa, setEmpresa] = React.useState<string>();

  const listaTipoDocumentosQuery = async () => await listaTipoDocumentoAxios();
  const listaRolesQuery = async () => await listaRolesAxios();

  const listaAreasActivasQuery = async () => await listaAreasActivasAxios();

  const userUpdate = (usuario: Usuario): UsuarioDto => {
    const list: Rol[] = [];
    if (rol != null) {
      list.push(rol);
    }
    return {
      id: props.usuario?.id,
      envioCorreo: sendEmail,
      nombre: nombre,
      apellido: apellido,
      empresa: empresa === "" ? null : empresa,
      area: area === null ? null : area,
      correo: correo === "" ? null : correo === usuario.correo ? null : correo,
      documento: {
        numero: numeroDocumento,
        tipo: tipoDocumento
      },
      numeroCelular: numeroCelular,
      numeroEmergencia: numeroEmergencia,
      password: password === "" ? null : password,
      roles: list
    };
  };

  const userRegister = (): UsuarioDto => {
    const list: Rol[] = [];
    if (rol != null) {
      list.push(rol);
    }
    return {
      id: null,
      envioCorreo: sendEmail,
      nombre: nombre,
      empresa: empresa === "" ? null : empresa,
      area: area === null ? null : area,
      apellido: apellido,
      correo: correo === "" ? null : correo,
      documento: {
        numero: numeroDocumento,
        tipo: tipoDocumento
      },
      numeroCelular: numeroCelular,
      numeroEmergencia: numeroEmergencia,
      password: password === "" ? null : password,
      roles: list
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnDisabled(true);

    props.event(props.usuario?.id ? userUpdate(props.usuario) : userRegister()).then((res: any) => {
      updateUserAuth(res.data.data);
      props.modalProps.exit(res.data.data, props.usuario !== undefined);
      props.modalProps.message({
        show: true, message: res.data.message, type: success,
        event: () => props.modalProps.message({ show: false })
      });
    }).catch((err: any) => {
      setTimeout(() => {
        setBtnDisabled(false);
      }, timeoutConfig);

      error(err);// Error

      if (err.response.status === 500 || err.response.status === 400) {
        props.modalProps.message({
          show: true, message: err.response.data.message, type: warning,
          event: () => props.modalProps.message({ show: false })
        });
      }
    });
  };

  const updateUserAuth = (usuario: Usuario) => {
    const user = getUsuario() as Usuario;
    if (usuario.id === user.id) {
      Cookies.set("user", JSON.stringify(usuario), { secure: false, sameSite: "strict", expires: 1 });
      window.location.reload();
    }
  };

  useEffect(() => {
    listaTipoDocumentosQuery().then((res: any) => {
      setTipoDocumentos(res.data);
    });

    listaRolesQuery().then((res: any) => {
      setRolesList(res.data);
    });

    listaAreasActivasQuery().then((res: any) => {
      setAreasList(res.data);
    });

    setNombre(props.usuario?.nombre || "");
    setApellido(props.usuario?.apellido || "");
    setEmpresa(props.usuario?.empresa || "");
    setArea(props.usuario?.area || null);
    setCorreo(props.usuario?.correo || "");
    setNumeroDocumento(props.usuario?.numeroDocumento || "");
    setTipoDocumento(props.usuario?.tipoDocumento || undefined);
    setNumeroCelular(props.usuario?.numeroCelular || "");
    setNumeroEmergencia(props.usuario?.numeroEmergencia || "");
    setRol(props.usuario?.roles[0] || null);
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="rounded-md p-8 grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombres <span className="text-red-500">*</span>
          </label>
          <input
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            type="text"
            name="nombre"
            placeholder="Ingrese el nombre"
            id="nombre"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                  py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                  focus:ring-red-500 sm:text-sm"
          />
          <span id="span-nombre" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
            Apellidos <span className="text-red-500">*</span>
          </label>
          <input
            value={apellido}
            onChange={(e) => {
              setApellido(e.target.value);
            }}
            type="text"
            placeholder="Ingrese el apellido"
            name="apellido"
            id="apellido"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                  py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                  focus:ring-red-500 sm:text-sm"
          />
          <span id="span-apellido" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="documento.numero" className="block text-sm font-medium text-gray-700">
            Documento <span className="text-red-500">*</span>
          </label>
          <input
            value={numeroDocumento}
            onChange={(e) => {
              setNumeroDocumento(e.target.value);
            }}
            type="number"
            min={0}
            placeholder="Ingrese el numero de documento"
            name="documento.numero"
            id="documento.numero"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                  py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                  focus:ring-red-500 sm:text-sm"
          />
          <span id="span-documento.numero" className="text-sm" />
          <span id="documento" className="text-sm" />
          <span id="span-documento" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="documento.tipo" className="block text-sm font-medium text-gray-700">
            Tipo de Documento <span className="text-red-500">*</span>
          </label>
          <select
            onChange={(e) => {
              setTipoDocumento(JSON.parse(e.target.value));
            }}
            name="documento.tipo"
            id="documento.tipo"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                  py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                  focus:ring-red-500 sm:text-sm"
          >
            <option disabled selected>Seleccione...</option>
            {tipoDocumentos.map((tipoDocumento: TipoDocumento) => (
              <option
                selected={tipoDocumento.id === props.usuario?.tipoDocumento?.id}
                key={tipoDocumento.id}
                value={JSON.stringify(tipoDocumento)}>
                {tipoDocumento.abreviatura} - {tipoDocumento.nombre}
              </option>
            ))}
          </select>
          <span id="span-documento.tipo" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
            Correo
          </label>
          <input
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value);
            }}
            type="email"
            placeholder="Ingrese el correo"
            name="correo"
            id="correo"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                  py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                  focus:ring-red-500 sm:text-sm"
          />
          <span id="span-correo" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="numeroCelular" className="block text-sm font-medium text-gray-700">
            Celular
          </label>
          <input
            value={numeroCelular}
            onChange={(e) => {
              setNumeroCelular(e.target.value);
            }}
            placeholder="Ingrese el numero de celular"
            type="number"
            name="numeroCelular"
            id="numeroCelular"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                  py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                  focus:ring-red-500 sm:text-sm"
          />
          <span id="span-numeroCelular" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="numeroEmergencia" className="block text-sm font-medium text-gray-700">
            Celular Emergencia <span className="text-red-500">*</span>
          </label>
          <input
            value={numeroEmergencia}
            onChange={(e) => {
              setNumeroEmergencia(e.target.value);
            }}
            type="number"
            name="numeroEmergencia"
            placeholder="Ingrese el numero de celular de emergencia"
            id="numeroEmergencia"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                  py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                  focus:ring-red-500 sm:text-sm"
          />
          <span id="span-numeroEmergencia" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">
            Empresa
          </label>
          <input
            value={empresa}
            onChange={(e) => {
              setEmpresa(e.target.value);
            }}
            type="text"
            placeholder="Ingrese la contraseña"
            name="empresa"
            id="empresa"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                  py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                  focus:ring-red-500 sm:text-sm"
          />
          <span id="span-empresa" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">
            Area
          </label>
          <select onChange={(e) => setArea(JSON.parse(e.target.value))}
                  id="area"
                  name="area"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                  py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                  focus:ring-red-500 sm:text-sm"
          >
            <option disabled selected>Seleccione...</option>
            {areasList.map((area: Area, index: number) => (
              <option selected={props.usuario?.area?.id === area.id} key={index} value={JSON.stringify(area)}>{area.nombre}</option>
            ))}
          </select>
          <span id="span-area" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="roles" className="block text-sm font-medium text-gray-700">
            Permisos <span className="text-red-500">*</span>
          </label>
          <select
            onChange={(e) => {
              setRol(JSON.parse(e.target.value));
            }}
            name="roles"
            id="roles"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                  py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                  focus:ring-red-500 sm:text-sm"
          >
            <option disabled selected>Seleccione...</option>
            {rolesList.map((rol: Rol) => (
              <option
                selected={rol.id === props.usuario?.roles[0]?.id}
                key={rol.id}
                value={JSON.stringify(rol)}>
                {rol.nombre}
              </option>
            ))}
          </select>
          <span id="span-roles" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Ingrese la contraseña"
            name="password"
            id="password"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                  py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                  focus:ring-red-500 sm:text-sm"
          />
          <span id="span-password" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-2 flex justify-center">
          <input
            checked={sendEmail}
            disabled={correo === "" || password === ""}
            onChange={(e) => {
              setSendEmail(e.target.checked);
            }}
            type="checkbox"
            role="switch"
            name="sendEmail"
            id="sendEmail"
            className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none
            rounded-[0.4375rem] bg-neutral-300 dark:bg-neutral-600
            before:pointer-events-none before:absolute before:h-3.5
            before:w-3.5 before:rounded-full before:bg-transparent
            before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem]
            after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100
            dark:after:bg-neutral-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)]
             after:transition-[background-color_0.2s,transform_0.2s] after:content-['']
             checked:bg-primary dark:checked:bg-primary checked:after:absolute
             checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem]
              checked:after:h-5 checked:after:w-5 checked:after:rounded-full
               checked:after:border-none checked:after:bg-primary dark:checked:after:bg-primary
                checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)]
                checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-['']
                hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12]
                focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)]
                focus:before:transition-[box-shadow_0.2s,transform_0.2s]
                focus:after:absolute focus:after:z-[1] focus:after:block
                focus:after:h-5 focus:after:w-5 focus:after:rounded-full
                focus:after:content-[''] checked:focus:border-primary
                checked:focus:bg-primary checked:focus:before:ml-[1.0625rem]
                checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]
                checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]
                disabled:opacity-30 disabled:cursor-not-allowed"
          />
          <span>Enviar Credenciales</span>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={btnDisabled}
          className="inline-flex justify-center py-2 px-4 border border-transparent
                shadow-sm text-sm font-medium rounded-md text-white bg-red-600
                hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-red-500 disabled:opacity-80 disabled:cursor-not-allowed
                disabled:hover:bg-red-500"
        >
          {btnDisabled && <Load />}
          {props.usuario ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default FormularioUsuarios;