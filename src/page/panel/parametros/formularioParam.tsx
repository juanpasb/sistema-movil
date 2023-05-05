import React, { useEffect } from "react";
import Load from "../../../components/load";
import { success, timeoutConfig, warning } from "../../../config/config";
import { error } from "../../../service/error";
import { ModalProps } from "../../../components/menuModal";
import { Parametro } from "../../../model/parametro";
import { listarTipoHoraAxios, listarTipoJornadaAxios } from "../../../service/parametrosService";
import { dateTimeSimple } from "../../../element/formatDateSimpleFormat";

const FormularioParam = (props: { parametro?: Parametro | undefined, event: any, modalProps: ModalProps }) => {

  const [listHora, setListHora] = React.useState<string[]>([]);
  const [listTipoJornada, setListTipoJornada] = React.useState<string[]>([]);
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const [descripcion, setDescripcion] = React.useState("");
  const [abreviatura, setAbreviatura] = React.useState("");
  const [horaInicio, setHoraInicio] = React.useState<string>("");
  const [horaFin, setHoraFin] = React.useState<string>("");
  const [hora, setHora] = React.useState<string | null>(null);
  const [jornada, setJornada] = React.useState<string | null>(null);

  const listarTipoHoraQuery = async () => await listarTipoHoraAxios();
  const listarTipoJornadaQuery = async () => await listarTipoJornadaAxios();

  const form = (parametro: Parametro | undefined): Parametro => {
    return {
      id: parametro !== undefined ? parametro.id : null,
      descripcion: descripcion,
      abreviatura: abreviatura,
      horaInicio: dateTimeSimple(horaInicio),
      horaFin: dateTimeSimple(horaFin),
      hora: hora,
      jornada: jornada,
      estado: parametro !== undefined ? parametro.estado : null
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnDisabled(true);

    props.event(form(props.parametro)).then((res: any) => {
      props.modalProps.exit(res.data.data, props.parametro !== undefined);
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
    setDescripcion(props.parametro?.descripcion || "");
    setAbreviatura(props.parametro?.abreviatura || "");
    setHoraInicio(props.parametro?.horaInicio.toString() || "");
    setHoraFin(props.parametro?.horaFin.toString() || "");
    setHora(props.parametro?.hora || null);
    setJornada(props.parametro?.jornada || null);

    listarTipoHoraQuery().then((res: any) => {
      setListHora(res.data);
    });

    listarTipoJornadaQuery().then((res: any) => {
      setListTipoJornada(res.data);
    });
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="rounded-md p-8 grid grid-cols-1 lg:grid-cols-2 w-full gap-6">

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
            Descripción <span className="text-red-500">*</span>
          </label>
          <input
            value={descripcion}
            onChange={(e) => {
              setDescripcion(e.target.value);
            }}
            type="text"
            placeholder="Descripción del parametro"
            name="descripcion"
            id="descripcion"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                      py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                      focus:ring-red-500 sm:text-sm"
          />
          <span id="span-descripcion" className="text-sm" />
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
            placeholder="Abreviatura del parametro"
            name="abreviatura"
            id="abreviatura"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                      py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                      focus:ring-red-500 sm:text-sm"
          />
          <span id="span-abreviatura" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="horaInicio" className="block text-sm font-medium text-gray-700">
            Hora inicio <span className="text-red-500">*</span>
          </label>
          <input
            value={horaInicio}
            onChange={(e) => {
              setHoraInicio(e.target.value);
            }}
            type="time"
            name="horaInicio"
            placeholder="00:00"
            id="horaInicio"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                      py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                      focus:ring-red-500 sm:text-sm"
          />
          <span id="span-horaInicio" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="horaFin" className="block text-sm font-medium text-gray-700">
            Hora final <span className="text-red-500">*</span>
          </label>
          <input
            value={horaFin}
            onChange={(e) => {
              setHoraFin(e.target.value);
            }}
            type="time"
            name="horaFin"
            placeholder="00:00"
            id="horaFin"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                      py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                      focus:ring-red-500 sm:text-sm"
          />
          <span id="span-horaFin" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="hora" className="block text-sm font-medium text-gray-700">
            Hora <span className="text-red-500">*</span>
          </label>
          <select onChange={(e) => setHora(e.target.value)}
                  id="hora"
                  name="hora"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                     py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                     focus:ring-red-500 sm:text-sm"
          >
            <option disabled selected>Seleccione...</option>
            {
              listHora.map((estado, index) => {
                return (
                  <option selected={estado === props.parametro?.hora} key={index} value={estado}>{estado}</option>);
              })
            }
          </select>
          <span id="span-hora" className="text-sm" />
        </div>

        <div className="col-span-1 sm:col-span-1">
          <label htmlFor="jornada" className="block text-sm font-medium text-gray-700">
            Jornada <span className="text-red-500">*</span>
          </label>
          <select onChange={(e) => setJornada(e.target.value)}
                  id="jornada"
                  name="jornada"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                     py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                     focus:ring-red-500 sm:text-sm"
          >
            <option disabled selected>Seleccione...</option>
            {
              listTipoJornada.map((estado, index) => {
                return (
                  <option selected={estado === props.parametro?.jornada} key={index} value={estado}>{estado}</option>);
              })
            }
          </select>
          <span id="span-jornada" className="text-sm" />
        </div>

      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={btnDisabled}
          className="inline-flex justify-center py-2 px-4 border border-transparent
             shadow-sm text-sm font-medium rounded-md text-white bg-red-600
             hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2
             focus:ring-red-500 disabled:opacity-80 disabled:cursor-not-allowed
             disabled:hover:bg-red-500"
        >
          {btnDisabled && <Load />}
          {props.parametro !== undefined ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default FormularioParam;