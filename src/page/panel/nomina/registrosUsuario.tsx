import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../element/formatDateSimpleFormat";
import Desplegable from "../../../components/desplegable";
import TableData from "../../../components/tableData";
import MenuModal from "../../../components/menuModal";
import { ParametroUsuario } from "../../../model/ParametroUsuario";
import { decrypt } from "../../../element/encript";
import { listaRegistrosUsuarioAxios } from "../../../service/nominaService";
import DetalleRegistroUsuario from "./detalleRegistroUsuario";

const RegistrosUsuario = () => {
  const [listParametroUsuario, setListParametroUsuario] = React.useState<ParametroUsuario[]>([]);

  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<JSX.Element>();

  const { nomina, fecha, usuario, nombre } = useParams();

  const listaRegistrosUsuarioQuery = async (nomina: string, usuario: string) => await listaRegistrosUsuarioAxios(nomina, usuario);

  const filtrar = (listParametroUsuario: ParametroUsuario[], filtro: string): ParametroUsuario[] => {
    return listParametroUsuario.filter((parametroUsuario) => {
      if (parametroUsuario.registro.placa?.toLowerCase().includes(filtro)) {
        return parametroUsuario;
      }
    });
  };

  const detalle = (parametroUsuario: ParametroUsuario) => {
    setTitle("Detalle Registro Usuario");
    setOpen(true);
    setContent(<DetalleRegistroUsuario parametroUsuario={parametroUsuario} />);
  };

  React.useEffect(() => {
    if (typeof nomina === "string" && typeof fecha === "string" && typeof usuario === "string" && typeof nombre === "string") {
      listaRegistrosUsuarioQuery(nomina as string, usuario as string).then((res) => {
        setListParametroUsuario(res.data);
      });
    }

  }, []);

  const body = (listParametroUsuario: ParametroUsuario[]) => {
    return listParametroUsuario.map((parametroUsuario) => {
      return (
        <tr key={parametroUsuario.id}>
          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span
                className="text-sm font-normal text-gray-600">{parametroUsuario.parametro === null ? "-" : parametroUsuario.parametro.abreviatura}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span
                className="text-sm font-normal text-gray-600">{formatDate(parametroUsuario.registro.fechaLlegada)}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span
                className="text-sm font-normal text-gray-600">{formatDate(parametroUsuario.registro.fechaSalida as string)}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{parametroUsuario.horasTrabajadas}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{parametroUsuario.horasTrabajadasExtra}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <Desplegable data={[
              {
                label: "Ver detalles",
                event: () => detalle(parametroUsuario)
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
          headers={["Tipo De Registro", "Llegada", "Salida", "Horas trabajadas", "Extras", "Acciones"]}
          data={listParametroUsuario}
          eventSearch={filtrar}
          titulo={"Registros de " + decrypt(nombre as string)}
          descripcion="Registros de un empleado." tbody={body}
        />
      </div>

      <MenuModal open={open} setOpen={setOpen} title={title} content={content} />
    </Fragment>
  );
};

export default RegistrosUsuario;