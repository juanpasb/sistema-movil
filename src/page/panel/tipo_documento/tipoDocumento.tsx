import React, { Fragment } from "react";
import { Estado } from "../../../model/estado";
import TableData from "../../../components/tableData";
import Desplegable from "../../../components/desplegable";
import { TipoDocumento } from "../../../model/tipoDocumento";
import {
  actualizarTipoDocumentoAxios,
  agregarTipoDocumentoAxios,
  cambiarEstadoTipoDocumentoAxios,
  listaTipoDocumentoAxios
} from "../../../service/tipoDocumentoService";
import MenuModal from "../../../components/menuModal";
import CambiarEstado from "../cambiarEstado";
import AlertMessage, { AlertType } from "../../../components/alertMessage";
import FormularioTipoDocumento from "./formularioTipoDocumento";
import { Sede } from "../../../model/sede";
import { TbRefresh } from "react-icons/all";

const TipoDocumento = () => {
    const [tipoDocumentos, setTipoDocumentos] = React.useState<TipoDocumento[]>([]);
    const [alertMessage, setAlertMessage] = React.useState<AlertType>({ show: false });

    const [open, setOpen] = React.useState<boolean>(false);
    const [title, setTitle] = React.useState<string>("");
    const [content, setContent] = React.useState<JSX.Element>();

    const listaTipoDocumentosQuery = async () => await listaTipoDocumentoAxios();
    const cambiarEstadoTipoDocumentoQuery = async (id: number, estado: string) => await cambiarEstadoTipoDocumentoAxios(id, estado);
    const agregarTipoDocumentoQuery = async (nombre: string, abreviatura: string) => await agregarTipoDocumentoAxios(nombre, abreviatura);
    const actualizarTipoDocumentoQuery = async (id: number, nombre: string, abreviatura: string, estado: string) => await actualizarTipoDocumentoAxios(id, nombre, abreviatura, estado);

    const filtrar = (tipoDocumentos: TipoDocumento[], filtro: string): TipoDocumento[] => {
      return tipoDocumentos.filter((documento) => {
        if (documento.nombre.toLowerCase().includes(filtro)) {
          return documento;
        } else if (documento.abreviatura.toLowerCase().includes(filtro)) {
          return documento;
        } else if (documento.nombre.includes(filtro)) {
          return documento;
        } else if (documento.estado === filtro) {
          return documento;
        }
      });
    };

    const agregar = (): void => {
      setTitle("Agregar Tipo de documento");
      setOpen(true);
      setContent(<FormularioTipoDocumento
        modalProps={{
          message: setAlertMessage,
          exit: exitModal
        }}
        event={agregarTipoDocumentoQuery}
      />);
    };

    const actualizar = (tipoDocumento: TipoDocumento): void => {
      setTitle("Actualizar Tipo de documento");
      setOpen(true);
      setContent(<FormularioTipoDocumento
        tipoDocumento={tipoDocumento}
        modalProps={{
          message: setAlertMessage,
          exit: exitModal
        }}
        event={actualizarTipoDocumentoQuery}
      />);
    };

  const exitModal = (tipoDocumento: TipoDocumento, estado: boolean): void => {
    setOpen(false);
    let listTemp: TipoDocumento[] = tipoDocumentos;
    if (!estado) {
      listTemp.push(tipoDocumento);// Agregar
    } else {
      listTemp.map((t: TipoDocumento) => { // Actualizar
        if (t.id === tipoDocumento.id) {
          t.nombre = tipoDocumento.nombre;
          t.abreviatura = tipoDocumento.abreviatura;
          t.estado = tipoDocumento.estado;
        }
      }, []);
    }
    // Ordenar
    setTipoDocumentos(listTemp.sort((a, b) => a.nombre > b.nombre ? 1 : -1));
  };

    const cambiarEstado = (tipoDocumento: TipoDocumento): void => {
      setTitle("Cambiar estado");
      setOpen(true);
      setContent(<CambiarEstado
        modalProps={{
          message: setAlertMessage,
          exit: exitModal
        }}
        id={tipoDocumento.id}
        event={cambiarEstadoTipoDocumentoQuery}
        estado={tipoDocumento.estado}
      />);
    };

  const listarDocumentos = () => {
    setTipoDocumentos([]);
    listaTipoDocumentosQuery().then((res) => {
      setTipoDocumentos(res.data);
    });
  };

    React.useEffect(() => {
      listarDocumentos();
    }, []);

    const body = (tipoDocumentos: TipoDocumento[]) => {
      return tipoDocumentos.map((documento) => {
        return (
          <tr key={documento.id}>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
              <div>
                <span className="text-sm font-normal text-gray-600">{documento.nombre}</span>
              </div>
            </td>

            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
              <div>
                <span className="text-sm font-normal text-gray-600">{documento.abreviatura}</span>
              </div>
            </td>

            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
              <div>
                <div
                  className="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-md gap-x-2">
                  {documento.estado}
                </div>
              </div>
            </td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">
              <Desplegable data={[
                {
                  label: "Editar",
                  event: () => actualizar(documento)
                },
                {
                  label: "Cambiar estado",
                  event: () => cambiarEstado(documento)
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
            headers={["Nombre", "Abreviatura", "Estado", "Acciones"]}
            data={tipoDocumentos}
            eventAdd={agregar}
            eventSearch={filtrar}
            titulo="Tipos de documentos"
            descripcion="Lista de tipos de documentos en el sistema."
            tbody={body}
            utils={[
              {
                event: listarDocumentos,
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

export default TipoDocumento;