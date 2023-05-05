import React, { Fragment } from "react";
import TableData from "../../../components/tableData";
import { TbRefresh } from "react-icons/all";
import AlertMessage, { AlertType } from "../../../components/alertMessage";
import MenuModal from "../../../components/menuModal";
import CambiarEstado from "../cambiarEstado";
import Desplegable from "../../../components/desplegable";
import { Parametro } from "../../../model/parametro";
import {
  agregarParametroAxios,
  cambiarEstadoParametroAxios,
  listaParametrosAxios
} from "../../../service/parametrosService";
import FormularioParam from "./formularioParam";
import { timeSimpleHM } from "../../../element/formatDateSimpleFormat";

const ParamNomina = () => {
  const [parametros, setParametros] = React.useState<Parametro[]>([]);
  const [alertMessage, setAlertMessage] = React.useState<AlertType>({ show: false });

  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<JSX.Element>();

  const listaParametrosQuery = async () => await listaParametrosAxios();
  const cambiarEstadoParametroQuery = async (id: number, estado: string) => await cambiarEstadoParametroAxios(id, estado);
  const agregarParametroQuery = async (parametro: Parametro) => await agregarParametroAxios(parametro);

  const filtrar = (parametros: Parametro[], filtro: string): Parametro[] => {
    return parametros.filter((area) => {
      if (area.abreviatura.toLowerCase().includes(filtro)) {
        return area;
      } else if (area.descripcion.toLowerCase().includes(filtro)) {
        return area;
      } else if (area.hora?.toLowerCase().includes(filtro)) {
        return area;
      } else if (area.jornada?.toLowerCase().includes(filtro)) {
        return area;
      } else if (area.estado === filtro) {
        return area;
      }
    });
  };

  const exitModal = (parametro: Parametro, estado: boolean): void => {
    setOpen(false);
    // let parametrosTemp: Parametro[] = parametros;
    // if (!estado) {
    //   parametrosTemp.push(parametro);// Agregar
    // } else {
    //   parametrosTemp.map((a: Parametro) => { // Actualizar
    //     if (a.id === parametro.id) {
    //       a.descripcion = parametro.descripcion;
    //       a.abreviatura = parametro.abreviatura;
    //       a.horaInicio = parametro.horaInicio;
    //       a.horaFin = parametro.horaFin;
    //       a.hora = parametro.hora;
    //       a.jornada = parametro.jornada;
    //       a.estado = parametro.estado;
    //     }
    //   }, []);
    // }
    // // Ordenar
    // setParametros(parametrosTemp.sort((a, b) => a.abreviatura > b.abreviatura ? 1 : -1));
    listarParametros();
  };

  const cambiarEstado = (parametro: Parametro): void => {
    setTitle("Cambiar estado");
    setOpen(true);
    setContent(<CambiarEstado
      modalProps={{
        message: setAlertMessage,
        exit: exitModal
      }}
      id={parametro.id as number}
      event={cambiarEstadoParametroQuery}
      estado={parametro.estado as string}
    />);
  };

  const agregar = (): void => {
    setTitle("Agregar Parámetro");
    setOpen(true);
    setContent(<FormularioParam
      modalProps={{
        message: setAlertMessage,
        exit: exitModal
      }}
      event={agregarParametroQuery}
    />);
  };

  const actualizar = (parametro: Parametro): void => {
    setTitle("Actualizar Parámetro");
    setOpen(true);
    setContent(<FormularioParam
      parametro={parametro}
      modalProps={{
        message: setAlertMessage,
        exit: exitModal
      }}
      event={agregarParametroQuery}
    />);
  };

  const listarParametros = () => {
    setParametros([]);
    listaParametrosQuery().then((res) => {
      setParametros(res.data);
    });
  };

  React.useEffect(() => {
    listarParametros();
  }, []);

  const body = (parametros: Parametro[]) => {
    return parametros.map((parametro: Parametro) => {
      return (
        <tr key={parametro.id}>
          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{parametro.descripcion}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{parametro.jornada}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{parametro.abreviatura}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{timeSimpleHM(parametro.horaInicio.toString())}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{timeSimpleHM(parametro.horaFin.toString())}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <span className="text-sm font-normal text-gray-600">{parametro.hora}</span>
            </div>
          </td>

          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <div
                className="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-md gap-x-2">
                {parametro.estado}
              </div>
            </div>
          </td>

          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <Desplegable data={[
              {
                label: "Editar",
                event: () => actualizar(parametro)
              },
              {
                label: "Cambiar estado",
                event: () => cambiarEstado(parametro)
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
          headers={["Descripción", "Jornada", "Abreviatura", "Hora Inicio", "Hora Final", "Hora", "Estado", "Acciones"]}
          data={parametros}
          eventAdd={agregar}
          eventSearch={filtrar}
          titulo="Parámetros"
          descripcion="Lista de los parámetros en el sistema."
          tbody={body}
          utils={[
            {
              event: listarParametros,
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

export default ParamNomina;