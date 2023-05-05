import { listaEstadosAxios } from "../../service/estadoService";
import React, { useEffect } from "react";
import Load from "../../components/load";
import { success, timeoutConfig, warning } from "../../config/config";
import { ModalProps } from "../../components/menuModal";
import { error } from "../../service/error";

const CambiarEstado = (props: { event: any, estado: string, modalProps: ModalProps, id: number }) => {

  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const [estados, setEstados] = React.useState<string[]>([]);
  const [estado, setEstado] = React.useState<string | null>(null);

  const listaEstadosQuery = async () => await listaEstadosAxios();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnDisabled(true);

    props.event(props.id, estado).then((res: any) => {
      props.modalProps.exit(res.data.data, true);
      props.modalProps.message({
        show: true, message: res.data.message, type: success, event: () =>
          props.modalProps.message({ show: false })
      });
    }).catch((err: any) => {
      setTimeout(() => {
        setBtnDisabled(true);
      }, timeoutConfig);

      error(err);// Error

      if (err.response.status === 500) {
        props.modalProps.message({
          show: true, message: err.response.message, type: warning, event: () =>
            props.modalProps.message({ show: false })
        });
      }
    });
  };

  useEffect(() => {
    listaEstadosQuery().then((res) => {
      setEstados(res.data);
    });
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="rounded-md p-8 grid grid-cols-1 w-full gap-6">

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="tipoDocumento" className="block text-sm font-medium text-gray-700">
            Estados <span className="text-red-500">*</span>
          </label>
          <select onChange={(e) => setEstado(e.target.value)}
                  id="estado"
                  name="estado"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                     py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                     focus:ring-red-500 sm:text-sm"
          >
            <option disabled selected>Seleccione...</option>
            {
              estados.map((estado, index) => {
                return (<option selected={estado === props.estado} key={index} value={estado}>{estado}</option>);
              })
            }
          </select>
          <span id="span-estado" className="text-sm" />
        </div>

        <div className="flex justify-end">
          <button
            disabled={estado === null || btnDisabled || estado === props.estado}
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent
             shadow-sm text-sm font-medium rounded-md text-white bg-red-600
             hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2
             focus:ring-red-500 disabled:opacity-80 disabled:cursor-not-allowed
             disabled:hover:bg-red-500"

          >
            {btnDisabled && <Load />}
            Cambiar estado
          </button>
        </div>
      </div>
    </form>
  );
};

export default CambiarEstado;