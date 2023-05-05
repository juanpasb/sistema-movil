import React, { Fragment, useEffect, useState } from "react";
import { cambiarConfigNominaAxios, obtenerConfigNominaAxios } from "../../service/configNominaService";
import { ConfigNomina } from "../../model/configNomina";
import { success, timeoutConfig, warning } from "../../config/config";
import { error } from "../../service/error";
import AlertMessage, { AlertType } from "../../components/alertMessage";
import Load from "../../components/load";

const ConfigNominaPage = () => {
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [horasLaborales, setHorasLaborales] = useState<number>(0);
  const [correoNotificacion, setCorreoNotificacion] = useState<string>("");
  const [alertMessage, setAlertMessage] = React.useState<AlertType>({ show: false });
  const obtenerConfigNominaQuery = async () => await obtenerConfigNominaAxios();
  const cambiarConfigNominaQuery = async (configNomina: ConfigNomina) => await cambiarConfigNominaAxios(configNomina);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnDisabled(true);

    cambiarConfigNominaQuery({
      horasLaborales: horasLaborales,
      correoNotificacion: correoNotificacion
    }).then((res: any) => {
      setAlertMessage({
        show: true, message: res.data.message, type: success,
        event: () => {
          setBtnDisabled(false);
          setAlertMessage({ show: false });
        }
      });
    }).catch((err: any) => {
      setTimeout(() => {
        setBtnDisabled(false);
      }, timeoutConfig);

      error(err);// Error

      if (err.response.status === 500 || err.response.status === 400) {
        setAlertMessage({
          show: true, message: err.response.data.message, type: warning,
          event: () => setAlertMessage({ show: false })
        });
      }
    });
  };

  useEffect(() => {
    obtenerConfigNominaQuery().then((res) => {
      setHorasLaborales(res.data.horasLaborales);
      setCorreoNotificacion(res.data.correoNotificacion);
    });
  }, []);

  return (
    <Fragment>
      <div className="pt-24">
        <div className="max-w-4xl mx-auto my-10 bg-white px-8 py-12 rounded-md shadow shadow-lg">
          <div className="p-4 border-b">
            <h2 className="text-xl font-medium">
              Configuración de la Nomina
            </h2>
            <p className="text-gray-500">
              Configuración de los parámetros de la nomina.
            </p>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">
                Horas laborales
              </p>
              <div>
                <input type={"number"} value={horasLaborales}
                       placeholder="Horas laborales"
                       id="horasLaborales"
                       min={0}
                       className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-md md:w-80 placeholder-gray-400/70 focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                       onInput={(e) => setHorasLaborales(Number(e.currentTarget.value))} />
                <span id="span-horasLaborales" className="text-sm" />
              </div>
            </div>

            <div className="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">
                Correo de notificación
              </p>
              <div>
                <input type={"email"} value={correoNotificacion}
                       id="correoNotificacion"
                       placeholder="lola@example.com"
                       className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-md md:w-80 placeholder-gray-400/70 focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                       onInput={(e) => setCorreoNotificacion(e.currentTarget.value)} />
                <span id="span-correoNotificacion" className="text-sm" />
              </div>
            </div>

            <div className="flex justify-end m-4">
              <button
                type="submit"
                disabled={btnDisabled || horasLaborales === 0 || correoNotificacion === ""}
                className="inline-flex justify-center py-2 px-4 border border-transparent
             shadow-sm text-sm font-medium rounded-md text-white bg-red-600
             hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2
             focus:ring-red-500 disabled:opacity-80 disabled:cursor-not-allowed
             disabled:hover:bg-red-500">
                {btnDisabled && <Load />}
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>

      <AlertMessage alert={alertMessage} setAlert={() => setAlertMessage({ show: false })} />
    </Fragment>
  );
};

export default ConfigNominaPage;