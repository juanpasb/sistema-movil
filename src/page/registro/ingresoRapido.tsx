import { TipoDocumento } from "../../model/tipoDocumento";
import Load from "../../components/load";
import AlertMessage, { AlertType } from "../../components/alertMessage";
import React, { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listaTipoDocumentoActivosAxios } from "../../service/tipoDocumentoService";
import { Sede } from "../../model/sede";
import { listaSedesActivasAxios } from "../../service/sedeService";
import { success, timeoutConfig, warning } from "../../config/config";
import { registroIngresoEmpleadoAxios } from "../../service/registroService";
import { Documento } from "../../model/documento";
import { error } from "../../service/error";
import { encrypt } from "../../element/encript";
import { Usuario } from "../../model/usuario";
import { date } from "../../element/formatDateSimpleFormat";

const IngresoRapido = () => {
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [listaTipoDocumentos, setListaTipoDocumentos] = React.useState<TipoDocumento[]>([]);
  const [listaSedes, setListaSedes] = React.useState<Sede[]>([]);

  const [tipoDocumento, setTipoDocumento] = React.useState<TipoDocumento>({
    id: 0,
    nombre: "",
    abreviatura: "",
    estado: ""
  });
  const [sede, setSede] = React.useState<Sede>({
    id: 0,
    nombre: "",
    direccion: "",
    estado: ""
  });
  const [numeroDocumento, setNumeroDocumento] = React.useState<string>("");
  const [alertMessage, setAlertMessage] = React.useState<AlertType>({ show: false });

  const navigate = useNavigate();

  const listaTipoDocumentoActivosQuery = async () => await listaTipoDocumentoActivosAxios();
  const listaSedesActivasQuery = async () => await listaSedesActivasAxios();
  const registroIngresoEmpleadoQuery = async (ingreso: {
    documento: Documento;
    sede: Sede;
  }) => await registroIngresoEmpleadoAxios(ingreso);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnDisabled(true);

    registroIngresoEmpleadoQuery({
      documento: { numero: numeroDocumento, tipo: tipoDocumento },
      sede: sede
    }).then((res) => {
      const user: Usuario = res.data.data;
      user.id = 0;
      setAlertMessage({
        type: success,
        message: res.data.message,
        show: true,
        event: () => navigate(
          "/info/" + encrypt(JSON.stringify(user))
          + "/" + encrypt(res.data.message)
          + "/" + encrypt(date())
        )
      });
    }).catch((err) => {
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
    listaTipoDocumentoActivosQuery().then((res) =>
      setListaTipoDocumentos(res.data)
    );

    listaSedesActivasQuery().then((res) =>
      setListaSedes(res.data)
    );
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center pt-24">
      <div className="max-w-md px-6 py-10 mx-auto container">
        <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl">
          Ingreso
        </h1>

        <form onSubmit={(e) => handleSubmit(e)} className="mt-12">
          <div className="rounded-md bg-white shadow-md p-8 grid grid-cols-1 w-full gap-6">

            <div className="col-span-1 sm:col-span-1">
              <label htmlFor="tipoDocumento" className="block text-sm font-medium text-gray-700">
                Tipo de documento <span className="text-red-500">*</span>
              </label>
              <select onChange={(e) => setTipoDocumento(JSON.parse(e.target.value))}
                      id="tipoDocumento"
                      name="tipoDocumento"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                     py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                     focus:ring-red-500 sm:text-sm"
              >
                <option disabled selected>Seleccione...</option>
                {listaTipoDocumentos.map((documento: TipoDocumento, index: number) => (
                  <option key={index}
                          value={JSON.stringify(documento)}>{documento.abreviatura + " - " + documento.nombre}</option>
                ))}
              </select>
            </div>

            <div className="col-span-1 sm:col-span-1">
              <label htmlFor="numeroDocumento" className="block text-sm font-medium text-gray-700">
                Numero documento <span className="text-red-500">*</span>
              </label>
              <input onChange={(e) => setNumeroDocumento(e.target.value)}
                     type="number"
                     name="numeroDocumento"
                     min={0}
                     id="numeroDocumento"
                     placeholder="132324433"
                     className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                     py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                     focus:ring-red-500 sm:text-sm"
              />

              <span id="span-documento" className="text-sm" />
            </div>

            <div className="col-span-1 sm:col-span-1">
              <label htmlFor="tipoDocumento" className="block text-sm font-medium text-gray-700">
                Sede <span className="text-red-500">*</span>
              </label>
              <select onChange={(e) => setSede(JSON.parse(e.target.value))}
                      id="tipoDocumento"
                      name="tipoDocumento"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                     py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                     focus:ring-red-500 sm:text-sm"
              >
                <option disabled selected>Seleccione...</option>
                {listaSedes.map((sede: Sede) => (
                  <option key={sede.id}
                          value={JSON.stringify(sede)}>{sede.nombre + " - " + sede.direccion}</option>
                ))}
              </select>

              <span id="span-sede" className="text-sm" />
            </div>

            <button
              disabled={tipoDocumento.id === 0 || numeroDocumento === "" || btnDisabled || sede.id === 0}
              type="submit"
              className="w-full rounded-md border transition-colors
                                    border-transparent bg-red-600 py-2 px-4 text-sm
                                    font-medium text-white shadow-sm hover:bg-red-700
                                    focus:outline-none focus:ring-2 focus:ring-red-500
                                    focus:ring-offset-2 disabled:opacity-80
                                    disabled:cursor-not-allowed disabled:hover:bg-red-500"
            >
              {btnDisabled && <Load />}
              Marcar ingreso
            </button>
          </div>
        </form>
      </div>

      <AlertMessage alert={alertMessage} setAlert={() => setAlertMessage({ show: false })} />

    </main>
  );
};

export default IngresoRapido;