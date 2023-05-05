import React, { Fragment } from "react";
import { Usuario } from "../../../model/usuario";
import {
  actualizarUsuarioAxios,
  agregarUsuarioAxios,
  cambiarEstadoUsuariosAxios,
  usuariosAxios
} from "../../../service/usuarioService";
import { Estado } from "../../../model/estado";
import TableData from "../../../components/tableData";
import Desplegable from "../../../components/desplegable";
import MenuModal from "../../../components/menuModal";
import { TipoDocumento } from "../../../model/tipoDocumento";
import CambiarEstado from "../cambiarEstado";
import AlertMessage, { AlertType } from "../../../components/alertMessage";
import { getUsuario } from "../../../service/token-config";
import FormularioArea from "../areas/formularioArea";
import { Area } from "../../../model/area";
import FormularioUsuarios from "./formularioUsuarios";
import { UsuarioDto } from "../../../dto/usuarioDto";
import { TbRefresh } from "react-icons/all";

const Usuarios = () => {
  const [usuarios, setUsuarios] = React.useState<Usuario[]>([]);
  const [alertMessage, setAlertMessage] = React.useState<AlertType>({ show: false });

  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<JSX.Element>();

  const usuariosQuery = async () => await usuariosAxios();
  const cambiarEstadoUsuariosQuery = async (id: number, estado: string) => await cambiarEstadoUsuariosAxios(id, estado);
  const agregarUsuarioQuery = async (usuario: UsuarioDto) => await agregarUsuarioAxios(usuario);
  const actualizarUsuarioQuery = async (usuario: UsuarioDto) => await actualizarUsuarioAxios(usuario);

  const filtrar = (usuarios: Usuario[], filtro: string): Usuario[] => {
    return usuarios.filter((usuario) => {
      if (usuario.nombre.toLowerCase().includes(filtro)) {
        return usuario;
      } else if (usuario.apellido.toLowerCase().includes(filtro)) {
        return usuario;
      } else if (usuario.correo != null ? usuario.correo.toLowerCase().includes(filtro) : "") {
        return usuario;
      } else if (usuario.numeroDocumento.includes(filtro)) {
        return usuario;
      } else if (usuario.tipoDocumento.abreviatura.toLowerCase().includes(filtro)) {
        return usuario;
      } else if (usuario.tipoDocumento.nombre.toLowerCase().includes(filtro)) {
        return usuario;
      } else if (usuario.roles.map((rol) => rol.nombre).join(" ").toLowerCase().includes(filtro)) {
        return usuario;
      } else if (usuario.estado.toLowerCase() === filtro) {
        return usuario;
      } else if (usuario.numeroCelular?.includes(filtro)) {
        return usuario;
      } else if (usuario.numeroEmergencia?.includes(filtro)) {
        return usuario;
      }
    });
  };

  const agregar = (): void => {
    setTitle("Agregar Usuario");
    setOpen(true);
    setContent(<FormularioUsuarios
      modalProps={{
        message: setAlertMessage,
        exit: exitModal
      }}
      event={agregarUsuarioQuery}
    />);
  };

  const actualizar = (usuario: Usuario): void => {
    setTitle("Actualizar Usuario");
    setOpen(true);
    setContent(<FormularioUsuarios
      usuario={usuario}
      modalProps={{
        message: setAlertMessage,
        exit: exitModal
      }}
      event={actualizarUsuarioQuery}
    />);
  };

  const exitModal = (usuario: Usuario, estado: boolean): void => {
    setOpen(false);
    let listTemp: Usuario[] = usuarios;
    if (!estado) {
      listTemp.push(usuario);// Agregar
    } else {
      listTemp.map((u: Usuario) => { // Actualizar
        if (u.id === usuario.id) {
          u.nombre = usuario.nombre;
          u.apellido = usuario.apellido;
          u.correo = usuario.correo;
          u.tipoDocumento = usuario.tipoDocumento;
          u.numeroCelular = usuario.numeroCelular;
          u.numeroDocumento = usuario.numeroDocumento;
          u.numeroEmergencia = usuario.numeroEmergencia;
          u.area = usuario.area;
          u.empresa = usuario.empresa;
          u.tipoDocumento = usuario.tipoDocumento;
          u.roles = usuario.roles;
          u.estado = usuario.estado;
        }
      }, []);
    }
    // Ordenar
    setUsuarios(listTemp.sort((a, b) => a.apellido > b.apellido ? 1 : -1));
  };

  const cambiarEstado = (usuario: Usuario): void => {
    setTitle("Cambiar estado");
    setOpen(true);
    setContent(<CambiarEstado
      modalProps={{
        message: setAlertMessage,
        exit: exitModal
      }}
      id={usuario.id}
      event={cambiarEstadoUsuariosQuery}
      estado={usuario.estado}
    />);
  };

  const listarUsuarios = () => {
    setUsuarios([]);
    usuariosQuery().then((res) => {
      setUsuarios(res.data);
    });
  };

  React.useEffect(() => {
    listarUsuarios();
  }, []);

  const body = (usuarios: Usuario[]) => {
    return usuarios.map((usuario) => {
      const list = [{
        label: "Editar",
        event: () => actualizar(usuario)
      }];

      if (getUsuario()?.id !== usuario.id) {
        list.push({
          label: "Cambiar estado",
          event: () => cambiarEstado(usuario)
        });
      }

      return (
        <tr key={usuario.id}>
          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{usuario.nombre}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{usuario.apellido}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span
                className="text-sm font-normal text-gray-600">{usuario.correo === null || usuario.correo === "" ? "-" : usuario.correo}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
                    <span
                      className="text-sm font-normal text-gray-600">{usuario.numeroCelular === null || usuario.numeroCelular === "" ? "-" : usuario.numeroCelular}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
                        <span
                          className="text-sm font-normal text-gray-600">{usuario.numeroEmergencia === null || usuario.numeroEmergencia === "" ? "-" : usuario.numeroEmergencia}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
                              <span
                                className="text-sm font-normal text-gray-600">{usuario.tipoDocumento.abreviatura} - {usuario.numeroDocumento}</span>
            </div>
          </td>

          <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
            {usuario.roles.length > 0 ? usuario.roles.map((rol) => (
              <div
                className="inline px-3 py-1 text-sm font-normal rounded-md text-emerald-500 gap-x-2 bg-emerald-100/60">
                {rol.nombre}
              </div>
            )) : null}
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <div
                className="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-md gap-x-2">
                {
                  usuario.estado
                }
              </div>
            </div>
          </td>

          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <Desplegable data={list} />
          </td>
        </tr>
      );
    });
  };

  return (
    <Fragment>
      <div className="pt-24">
        {/* data table */}
        <TableData
          headers={["Nombre", "Apellido", "Correo", "Celular", "Numero Emergencia", "Documento", "Permisos", "Estado", "Acciones"]}
          data={usuarios}
          eventAdd={agregar}
          eventSearch={filtrar}
          titulo="Usuarios"
          descripcion="Lista de usuarios en el sistema."
          tbody={body}
          utils={[
            {
              event: listarUsuarios,
              icon: TbRefresh,
              title: "Actualizar"
            }
          ]}
        />
      </div>

      <AlertMessage alert={alertMessage} setAlert={() => setAlertMessage({ show: false })} />
      <MenuModal open={open} setOpen={setOpen} title={title} content={content} />
    </Fragment>
  );
};

export default Usuarios;