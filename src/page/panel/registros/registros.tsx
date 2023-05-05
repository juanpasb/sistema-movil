import React, { Fragment } from "react";
import { Estado } from "../../../model/estado";
import TableData from "../../../components/tableData";
import Desplegable from "../../../components/desplegable";
import { Registro } from "../../../model/registro";
import { listaRegistrosAxios } from "../../../service/registroService";
import { formatDate } from "../../../element/formatDateSimpleFormat";
import MenuModal from "../../../components/menuModal";
import { encrypt } from "../../../element/encript";
import { useNavigate } from "react-router-dom";
import DetalleRegistro from "./detalleRegistro";
import { TbRefresh } from "react-icons/all";

const Registros = () => {
  const [registros, setRegistros] = React.useState<Registro[]>([]);

  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<JSX.Element>();

  const listaRegistrosQuery = async () => await listaRegistrosAxios();

  const navigate = useNavigate();

  const filtrar = (registros: Registro[], filtro: string): Registro[] => {
    return registros.filter((registro) => {
      if (registro.usuario.numeroDocumento.toLowerCase().includes(filtro)) {
        return registro;
      } else if (registro.estado.toLowerCase() === filtro) {
        return registro;
      } else if (registro.sede?.nombre.includes(filtro)) {
        return registro;
      } else if (registro.sede?.direccion.toLowerCase().includes(filtro)) {
        return registro;
      } else if (registro.fechaLlegada.toLowerCase().includes(filtro)) {
        return registro;
      } else if (registro.fechaSalida?.toLowerCase().includes(filtro)) {
        return registro;
      } else if (registro.usuario.nombre.toLowerCase().includes(filtro)) {
        return registro;
      } else if (registro.usuario.apellido.toLowerCase().includes(filtro)) {
        return registro;
      } else if (registro.tipoUsuario.toLowerCase().includes(filtro)) {
        return registro;
      }
    });
  };

  const detalle = (registro: Registro) => {
    setTitle("Detalle Registro");
    setOpen(true);
    setContent(<DetalleRegistro registro={registro} />);
  };

  const listarRegistros = () => {
    setRegistros([]);
    listaRegistrosQuery().then((res) => {
      setRegistros(res.data);
    });
  };

  React.useEffect(() => {
    listarRegistros();
  }, []);

  const body = (registros: Registro[]) => {
    return registros.map((registro) => {
      return (
        <tr key={registro.id}>
          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
                           <span
                             className="text-sm font-normal text-gray-600">{registro.sede?.nombre} - {registro.sede?.direccion}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
                  <span
                    className="text-sm font-normal text-gray-600">{registro.tipoUsuario === null ? "-" : registro.tipoUsuario}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
                           <span
                             className="text-sm font-normal text-gray-600">{registro.usuario.nombre}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
                           <span
                             className="text-sm font-normal text-gray-600">{registro.usuario.apellido}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
                        <span
                          className="text-sm font-normal text-gray-600">{registro.usuario.tipoDocumento.abreviatura} - {registro.usuario.numeroDocumento}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{formatDate(registro.fechaLlegada)}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
                  <span
                    className="text-sm font-normal text-gray-600">{registro.fechaSalida ? formatDate(registro.fechaSalida) : null}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <div
                className="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-md gap-x-2">
                {registro.estado}
              </div>
            </div>
          </td>

          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <Desplegable data={[
              {
                label: "Ver detalles",
                event: () => detalle(registro)
              },
              {
                label: "Registros del usuario",
                event: () => navigate("/panel/registros/" + encrypt(registro.usuario.id.toString()))
              }
            ]} />
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
          headers={["Sede", "Tipo de usuario", "Nombres", "Apellidos", "Documento", "Llegada", "Salida", "Estado", "Acciones"]}
          data={registros}
          eventSearch={filtrar}
          titulo="Registros"
          descripcion="Lista de registros en el sistema."
          tbody={body}
          utils={[
            {
              event: listarRegistros,
              icon: TbRefresh,
              title: "Actualizar"
            }
          ]}
        />
      </div>
      <MenuModal open={open} setOpen={setOpen} title={title} content={content} />
    </Fragment>
  );
};

export default Registros;