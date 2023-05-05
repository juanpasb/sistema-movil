import React, { Fragment } from "react";
import TableData from "../../../components/tableData";
import Desplegable from "../../../components/desplegable";
import { Area } from "../../../model/area";
import {
  actualizarAreaAxios,
  agregarAreaAxios,
  cambiarEstadoAreaAxios,
  listaAreasAxios
} from "../../../service/areaService";
import MenuModal from "../../../components/menuModal";
import CambiarEstado from "../cambiarEstado";
import AlertMessage, { AlertType } from "../../../components/alertMessage";
import FormularioArea from "./formularioArea";
import { TbRefresh } from "react-icons/all";

const Areas = () => {
    const [areas, setAreas] = React.useState<Area[]>([]);
    const [alertMessage, setAlertMessage] = React.useState<AlertType>({ show: false });

    const [open, setOpen] = React.useState<boolean>(false);
    const [title, setTitle] = React.useState<string>("");
    const [content, setContent] = React.useState<JSX.Element>();

    const listaAreasQuery = async () => await listaAreasAxios();
    const cambiarEstadoAreaQuery = async (id: number, estado: string) => await cambiarEstadoAreaAxios(id, estado);
    const agregarAreaQuery = async (nombre: string) => await agregarAreaAxios(nombre);
    const actualizarAreaQuery = async (id: number, nombre: string, estado: string) => await actualizarAreaAxios(id, nombre, estado);

    const filtrar = (areas: Area[], filtro: string): Area[] => {
      return areas.filter((area) => {
        if (area.nombre.toLowerCase().includes(filtro)) {
          return area;
        } else if (area.estado === filtro) {
          return area;
        }
      });
    };

    const exitModal = (area: Area, estado: boolean): void => {
      setOpen(false);
      let areasTemp: Area[] = areas;
      if (!estado) {
        areasTemp.push(area);// Agregar
      } else {
        areasTemp.map((a: Area) => { // Actualizar
          if (a.id === area.id) {
            a.nombre = area.nombre;
            a.estado = area.estado;
          }
        }, []);
      }
      // Ordenar
      setAreas(areasTemp.sort((a, b) => a.nombre > b.nombre ? 1 : -1));
    };

    const cambiarEstado = (area: Area): void => {
      setTitle("Cambiar estado");
      setOpen(true);
      setContent(<CambiarEstado
        modalProps={{
          message: setAlertMessage,
          exit: exitModal
        }}
        id={area.id}
        event={cambiarEstadoAreaQuery}
        estado={area.estado}
      />);
    };

    const agregar = (): void => {
      setTitle("Agregar Area");
      setOpen(true);
      setContent(<FormularioArea
        modalProps={{
          message: setAlertMessage,
          exit: exitModal
        }}
        event={agregarAreaQuery}
      />);
    };

    const actualizar = (area: Area): void => {
      setTitle("Actualizar Area");
      setOpen(true);
      setContent(<FormularioArea
        area={area}
        modalProps={{
          message: setAlertMessage,
          exit: exitModal
        }}
        event={actualizarAreaQuery}
      />);
    };

    const listarAreas = () => {
      setAreas([]);
      listaAreasQuery().then((res) => {
        setAreas(res.data);
      });
    };

    React.useEffect(() => {
      listarAreas();
    }, []);

    const body = (areas: Area[]) => {
      return areas.map((area: Area) => {
        return (
          <tr key={area.id}>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
              <div>
                <span className="text-sm font-normal text-gray-600">{area.nombre}</span>
              </div>
            </td>

            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
              <div>
                <div
                  className="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-md gap-x-2">
                  {area.estado}
                </div>
              </div>
            </td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">
              <Desplegable data={[
                {
                  label: "Editar",
                  event: () => actualizar(area)
                },
                {
                  label: "Cambiar estado",
                  event: () => cambiarEstado(area)
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
            headers={["Nombre", "Estado", "Acciones"]}
            data={areas}
            eventAdd={agregar}
            eventSearch={filtrar}
            titulo="Areas"
            descripcion="Lista de areas en el sistema."
            tbody={body}
            utils={[
              {
                event: listarAreas,
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
  }
;

export default Areas;