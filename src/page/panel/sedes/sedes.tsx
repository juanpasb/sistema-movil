import React, { Fragment } from "react";
import TableData from "../../../components/tableData";
import Desplegable from "../../../components/desplegable";
import { Sede } from "../../../model/sede";
import {
  actualizarSedeAxios,
  agregarSedeAxios,
  cambiarEstadoSedeAxios,
  listaSedesAxios
} from "../../../service/sedeService";
import MenuModal from "../../../components/menuModal";
import AlertMessage, { AlertType } from "../../../components/alertMessage";
import CambiarEstado from "../cambiarEstado";
import FormularioSedes from "./formularioSedes";
import { Area } from "../../../model/area";
import { TbRefresh } from "react-icons/all";

const Sedes = () => {
  const [sedes, setSedes] = React.useState<Sede[]>([]);
  const [alertMessage, setAlertMessage] = React.useState<AlertType>({ show: false });

  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<JSX.Element>();

  const listaSedesQuery = async () => await listaSedesAxios();
  const cambiarEstadoSedeQuery = async (id: number, estado: string) => await cambiarEstadoSedeAxios(id, estado);
  const agregarSedeQuery = async (nombre: string, direccion: string) => await agregarSedeAxios(nombre, direccion);
  const actualizarSedeQuery = async (id: number, nombre: string, direccion: string, estado: string) => await actualizarSedeAxios(id, nombre, direccion, estado);

  const filtrar = (sedes: Sede[], filtro: string): Sede[] => {
    return sedes.filter((area) => {
      if (area.nombre.toLowerCase().includes(filtro)) {
        return area;
      } else if (area.direccion.toLowerCase().includes(filtro)) {
        return area;
      } else if (area.estado === filtro) {
        return area;
      }
    });
  };

  const agregar = (): void => {
    setTitle("Agregar Sede");
    setOpen(true);
    setContent(<FormularioSedes
      modalProps={{
        message: setAlertMessage,
        exit: exitModal
      }}
      event={agregarSedeQuery}
    />);
  };

  const actualizar = (sede: Sede): void => {
    setTitle("Actualizar Sede");
    setOpen(true);
    setContent(<FormularioSedes
      sede={sede}
      modalProps={{
        message: setAlertMessage,
        exit: exitModal
      }}
      event={actualizarSedeQuery}
    />);
  };

  const exitModal = (sede: Sede, estado: boolean): void => {
    setOpen(false);
    let listTemp: Sede[] = sedes;
    if (!estado) {
      listTemp.push(sede);// Agregar
    } else {
      listTemp.map((s: Sede) => { // Actualizar
        if (s.id === sede.id) {
          s.nombre = sede.nombre;
          s.direccion = sede.direccion;
          s.estado = sede.estado;
        }
      }, []);
    }
    // Ordenar
    setSedes(listTemp.sort((a, b) => a.nombre > b.nombre ? 1 : -1));
  };

  const cambiarEstado = (sede: Sede): void => {
    setTitle("Cambiar estado");
    setOpen(true);
    setContent(<CambiarEstado
      modalProps={{
        message: setAlertMessage,
        exit: exitModal
      }}
      id={sede.id}
      event={cambiarEstadoSedeQuery}
      estado={sede.estado}
    />);
  };

  const listarSedes = () => {
    setSedes([]);
    listaSedesQuery().then((res) => {
      setSedes(res.data);
    });
  };

  React.useEffect(() => {
    listarSedes();
  }, []);

  const body = (sedes: Sede[]) => {
    return sedes.map((sede) => {
      return (<tr key={sede.id}>
        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
          <div>
            <span className="text-sm font-normal text-gray-600">{sede.nombre}</span>
          </div>
        </td>

        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
          <div>
            <span className="text-sm font-normal text-gray-600">{sede.direccion}</span>
          </div>
        </td>

        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
          <div>
            <div
              className="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-md gap-x-2">
              {sede.estado}
            </div>
          </div>
        </td>

        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <Desplegable data={[
            {
              label: "Editar",
              event: () => actualizar(sede)
            },
            {
              label: "Cambiar estado",
              event: () => cambiarEstado(sede)
            }
          ]} />
        </td>
      </tr>);
    });
  };

  return (
    <Fragment>
      <div className="pt-24">
        {/* data table */}
        <TableData
          headers={["Nombre", "dirección", "Estado", "Acciones"]}
          data={sedes}
          eventSearch={filtrar}
          eventAdd={agregar}
          titulo="Sedes"
          descripcion="Lista de sedes en el sistema."
          tbody={body}
          utils={[
            {
              event: listarSedes,
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

export default Sedes;