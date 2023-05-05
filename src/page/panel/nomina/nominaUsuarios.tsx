import React, { Fragment } from "react";
import TableData from "../../../components/tableData";
import MenuModal from "../../../components/menuModal";
import { useNavigate, useParams } from "react-router-dom";
import Desplegable from "../../../components/desplegable";
import { NominaUsuario } from "../../../model/nominaUsuario";
import { listaNominaUsuarioAxios } from "../../../service/nominaService";
import { encrypt, decrypt } from "../../../element/encript";
import DetalleNominaUsuario from "./detalleNominaUsuario";

const NominaUsuarios = () => {
  const [listNominaUsuario, setListNominaUsuario] = React.useState<NominaUsuario[]>([]);

  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<JSX.Element>();

  const navigate = useNavigate();
  const { nomina, fecha } = useParams();

  const listaNominaUsuarioQuery = async (nomina: string) => await listaNominaUsuarioAxios(nomina);

  const filtrar = (list: NominaUsuario[], filtro: string): NominaUsuario[] => {
    return list.filter((nominaUsuario) => {
      if (nominaUsuario.usuario.numeroDocumento.toLowerCase().includes(filtro)) {
        return nominaUsuario;
      } else if (nominaUsuario.usuario.correo?.toLowerCase().includes(filtro)) {
        return nominaUsuario;
      } else if (nominaUsuario.usuario.apellido.toLowerCase().includes(filtro)) {
        return nominaUsuario;
      } else if (nominaUsuario.usuario.nombre.toLowerCase().includes(filtro)) {
        return nominaUsuario;
      } else if (nominaUsuario.usuario.tipoDocumento.abreviatura?.toLowerCase().includes(filtro)) {
        return nominaUsuario;
      } else if (nominaUsuario.usuario.tipoDocumento.nombre?.toLowerCase().includes(filtro)) {
        return nominaUsuario;
      }
    });
  };

  const detalle = (nominaUsuario: NominaUsuario) => {
    setTitle("Detalle Nómina Usuario");
    setOpen(true);
    setContent(<DetalleNominaUsuario nominaUsuario={nominaUsuario} />);
  };

  React.useEffect(() => {
    if (typeof nomina === "string" && typeof fecha === "string") {
      listaNominaUsuarioQuery(nomina).then((res) => {
        setListNominaUsuario(res.data);
      });
    }

  }, []);

  const body = (listNominaUsuario: NominaUsuario[]) => {
    return listNominaUsuario.map((nominaUsuario, index) => {
      return (
        <tr key={nominaUsuario.id}>
          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span
                className="text-sm font-normal text-gray-600">{nominaUsuario.usuario.tipoDocumento.abreviatura} - {nominaUsuario.usuario.numeroDocumento}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span
                className="text-sm font-normal text-gray-600">{nominaUsuario.usuario.nombre}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span
                className="text-sm font-normal text-gray-600">{nominaUsuario.usuario.apellido}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{nominaUsuario.horasTrabajadas}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{nominaUsuario.horasTrabajadasExtra}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <Desplegable data={[
              {
                label: "Ver Detalle",
                event: () => detalle(nominaUsuario)
              }, {
                label: "Ver Registros",
                event: () => navigate("/panel/nomina/" + nomina + "/" + fecha + "/empleados/" + encrypt(nominaUsuario.usuario.id.toString()) + "/" +
                  encrypt(nominaUsuario.usuario.nombre + " " + nominaUsuario.usuario.apellido + " (" + nominaUsuario.usuario.tipoDocumento.abreviatura + " - " + nominaUsuario.usuario.numeroDocumento + ")"))
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
          headers={["Documento", "Nombres", "Apellidos", "Horas trabajadas", "Horas extras", "Acciones"]}
          data={listNominaUsuario}
          eventSearch={filtrar}
          titulo={"Nómina del " + decrypt(fecha as string)}
          descripcion="Usuarios de la una nómina." tbody={body}
        />
      </div>

      <MenuModal open={open} setOpen={setOpen} title={title} content={content} />
    </Fragment>
  );
};

export default NominaUsuarios;