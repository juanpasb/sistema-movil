import React, { useEffect } from "react";
import { TipoDocumento } from "../../../model/tipoDocumento";
import { success, timeoutConfig, warning } from "../../../config/config";
import { ModalProps } from "../../../components/menuModal";
import Load from "../../../components/load";
import { validation } from "../../../element/validationForm";
import { error } from "../../../service/error";

const FormularioTipoDocumento = (props: { tipoDocumento?: TipoDocumento | undefined, event: any, modalProps: ModalProps }) => {
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const [nombre, setNombre] = React.useState("");
  const [abreviatura, setAbreviatura] = React.useState("");

  const eventForm = (tipoDocumento: TipoDocumento | undefined): any => {
    return tipoDocumento !== undefined
      ? props.event(tipoDocumento.id, nombre, abreviatura, tipoDocumento.estado)
      : props.event(nombre, abreviatura);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnDisabled(true);

    eventForm(props.tipoDocumento).then((res: any) => {
      props.modalProps.exit(res.data.data, props.tipoDocumento !== undefined);
      props.modalProps.message({
        show: true, message: res.data.message, type: success,
        event: () => props.modalProps.message({ show: false })
      });
    }).catch((err: any) => {
      setTimeout(() => {
        setBtnDisabled(false);
      }, timeoutConfig);

      error(err);// Error

      if (err.response.status === 500 || err.response.status === 400) {
        props.modalProps.message({
          show: true, message: err.response.data.message, type: warning,
          event: () => props.modalProps.message({ show: false })
        });
      }
    });
  };

  useEffect(() => {
    setNombre(props.tipoDocumento?.nombre || "");
    setAbreviatura(props.tipoDocumento?.abreviatura || "");
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="rounded-md p-8 grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            type="text"
            placeholder="Nombre del tipo de documento"
            name="nombre"
            id="nombre"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                      py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                      focus:ring-red-500 sm:text-sm"
          />
          <span id="span-nombre" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="abreviatura" className="block text-sm font-medium text-gray-700">
            Abreviatura <span className="text-red-500">*</span>
          </label>
          <input
            value={abreviatura}
            onChange={(e) => {
              setAbreviatura(e.target.value);
            }}
            type="text"
            placeholder="Abreviatura del tipo de documento"
            maxLength={3}
            name="abreviatura"
            id="abreviatura"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                      py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                      focus:ring-red-500 sm:text-sm"
          />
          <span id="span-abreviatura" className="text-sm" />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={btnDisabled || nombre === props.tipoDocumento?.nombre && abreviatura === props.tipoDocumento?.abreviatura
            || nombre === "" || abreviatura === ""
          }
          className="inline-flex justify-center py-2 px-4 border border-transparent
             shadow-sm text-sm font-medium rounded-md text-white bg-red-600
             hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2
             focus:ring-red-500 disabled:opacity-80 disabled:cursor-not-allowed
             disabled:hover:bg-red-500"
        >
          {btnDisabled && <Load />}
          {props.tipoDocumento !== undefined ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default FormularioTipoDocumento;