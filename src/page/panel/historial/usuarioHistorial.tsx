import React, { Fragment } from "react";
import { Historial } from "../../../model/Historial";
import { historialUsuarioAxios } from "../../../service/historialService";
import DetalleHistorial from "./detalleHistorial";
import { formatDate } from "../../../element/formatDateSimpleFormat";
import Desplegable from "../../../components/desplegable";
import TableData from "../../../components/tableData";
import MenuModal from "../../../components/menuModal";
import { useParams } from "react-router-dom";
import { Usuario } from "../../../model/usuario";
import { formatName } from "../../../element/formatName";

const UsuarioHistorial = () => {
  const [historial, setHistorial] = React.useState<Historial[]>([]);

  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<JSX.Element>();
  const [usuario, setUsuario] = React.useState<Usuario | null>(null);

  const { id } = useParams();

  const historialUsuarioQuery = async (id: string) => await historialUsuarioAxios(id);

  const filtrar = (historialUsuarios: Historial[], filtro: string): Historial[] => {
    return historialUsuarios.filter((historial) => {
      if (historial.tipo.toLowerCase().includes(filtro)) {
        return historial;
      } else if (historial.fecha.includes(filtro)) {
        return historial;
      }
    });
  };

  const detalle = (historial: Historial) => {
    setTitle("Detalle Historial");
    setOpen(true);
    setContent(<DetalleHistorial historial={historial} />);
  };

  React.useEffect(() => {
    if (typeof id === "string") {
      historialUsuarioQuery(id).then((res) => {
        setHistorial(res.data);
        setUsuario(res.data[0].usuario);
      });
    }

  }, []);

  const body = (historial: Historial[]) => {
    return historial.map((historial, index) => {
      return (
        <tr key={historial.id}>
          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{historial.tipo}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{historial.descripcion}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{formatDate(historial.fecha)}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <Desplegable data={[
              {
                label: "Ver detalles",
                event: () => detalle(historial)
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
          headers={["Tipo", "Descripción", "Fecha", "Acciones"]}
          data={historial}
          eventSearch={filtrar}
          titulo={"Historial de " + formatName(usuario)}
          descripcion="Historial de un usuario especifico." tbody={body}
        />
      </div>
      <MenuModal open={open} setOpen={setOpen} title={title} content={content} />
    </Fragment>
  );
};

export default UsuarioHistorial;