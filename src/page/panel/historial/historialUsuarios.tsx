import React, { Fragment } from "react";
import TableData from "../../../components/tableData";
import Desplegable from "../../../components/desplegable";
import { Historial } from "../../../model/Historial";
import { listaHistorialAxios } from "../../../service/historialService";
import { formatDate } from "../../../element/formatDateSimpleFormat";
import MenuModal from "../../../components/menuModal";
import DetalleHistorial from "./detalleHistorial";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../../../element/encript";
import { TbRefresh } from "react-icons/all";

const HistorialUsuarios = () => {
  const [historial, setHistorial] = React.useState<Historial[]>([]);

  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<JSX.Element>();

  const navigate = useNavigate();

  const listaHistorialQuery = async () => await listaHistorialAxios();

  const filtrar = (historialUsuarios: Historial[], filtro: string): Historial[] => {
    return historialUsuarios.filter((historial) => {
      if (historial.tipo.toLowerCase().includes(filtro)) {
        return historial;
      } else if (historial.usuario.nombre.toLowerCase().includes(filtro)) {
        return historial;
      } else if (historial.usuario.apellido.includes(filtro)) {
        return historial;
      } else if (historial.usuario.correo?.includes(filtro)) {
        return historial;
      } else if (historial.fecha.includes(filtro)) {
        return historial;
      } else if (historial.usuario.numeroDocumento.includes(filtro)) {
        return historial;
      }
    });
  };

  const detalle = (historial: Historial) => {
    setTitle("Detalle Historial");
    setOpen(true);
    setContent(<DetalleHistorial historial={historial} />);
  };

  const listarHistorial = () => {
    setHistorial([]);
    listaHistorialQuery().then((res) => {
      setHistorial(res.data);
    });
  };

  React.useEffect(() => {
    listarHistorial();
  }, []);

  const body = (historial: Historial[]) => {
    return historial.map((historial) => {

      return (
        <tr key={historial.id}>
          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{historial.tipo}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{formatDate(historial.fecha)}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
                           <span
                             className="text-sm font-normal text-gray-600">{historial.usuario.nombre}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
                           <span
                             className="text-sm font-normal text-gray-600">{historial.usuario.apellido}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{historial.usuario.correo}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
                        <span
                          className="text-sm font-normal text-gray-600">{historial.usuario.tipoDocumento.abreviatura} - {historial.usuario.numeroDocumento}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <Desplegable data={[
              {
                label: "Ver detalles",
                event: () => detalle(historial)
              },
              {
                label: "Historial del usuario",
                event: () => navigate("/panel/historial/" + encrypt(historial.usuario.id.toString()))
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
          headers={["Tipo", "Fecha", "Nombres", "Apellidos", "Correo", "Documento", "Acciones"]}
          data={historial}
          eventSearch={filtrar}
          titulo="Historial de usuarios"
          descripcion="Historial de usuarios del sistema."
          tbody={body}
          utils={[
            {
              event: listarHistorial,
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

export default HistorialUsuarios;