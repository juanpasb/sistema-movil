import React, { Fragment } from "react";
import { formatDate } from "../../../element/formatDateSimpleFormat";
import Desplegable from "../../../components/desplegable";
import TableData from "../../../components/tableData";
import MenuModal from "../../../components/menuModal";
import { useParams } from "react-router-dom";
import { Usuario } from "../../../model/usuario";
import { registrosUsuarioAxios } from "../../../service/registroService";
import { Registro } from "../../../model/registro";
import DetalleRegistro from "./detalleRegistro";
import { formatName } from "../../../element/formatName";

const UsuarioRegistrosGet = () => {
  const [registros, setRegistros] = React.useState<Registro[]>([]);

  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<JSX.Element>();
  const [usuario, setUsuario] = React.useState<Usuario | null>(null);

  const { id } = useParams();

  const registrosUsuarioQuery = async (id: string) => await registrosUsuarioAxios(id);

  const filtrar = (registros: Registro[], filtro: string): Registro[] => {
    return registros.filter((registro) => {
      if (registro.estado.toLowerCase() === filtro) {
        return registro;
      } else if (registro.sede?.nombre.includes(filtro)) {
        return registro;
      } else if (registro.sede?.direccion.toLowerCase().includes(filtro)) {
        return registro;
      } else if (registro.fechaLlegada.toLowerCase().includes(filtro)) {
        return registro;
      } else if (registro.fechaSalida?.toLowerCase().includes(filtro)) {
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

  React.useEffect(() => {
    if (typeof id === "string") {
      registrosUsuarioQuery(id).then((res) => {
        setRegistros(res.data);
        setUsuario(res.data[0].usuario);
      });
    }

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
          headers={["Sede", "Tipo de usuario", "Llegada", "Salida", "Estado", "Acciones"]}
          data={registros}
          eventSearch={filtrar}
          titulo={"Registros de " + formatName(usuario)}
          descripcion="Registros de un usuario especifico"
          tbody={body}
        />
      </div>
      <MenuModal open={open} setOpen={setOpen} title={title} content={content} />
    </Fragment>
  );
};

export default UsuarioRegistrosGet;