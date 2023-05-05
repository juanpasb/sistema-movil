import { listaNominasAxios, procesarNominaAxios } from "../../../service/nominaService";
import React, { Fragment, useEffect, useState } from "react";
import { Nomina } from "../../../model/nomina";
import { formatDate, formatDateDayMontYear } from "../../../element/formatDateSimpleFormat";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../../../element/encript";
import AlertMessage, { AlertType } from "../../../components/alertMessage";
import Load from "../../../components/load";
import { timeoutConfig, warning } from "../../../config/config";
import ModalConfirmation from "../../../components/modalConfirmation";

const Nominas = () => {
  const [listaNominas, setListaNominas] = useState<Nomina[]>([]);
  const [listNominasAux, setListNominasAux] = useState<Nomina[]>([]);
  const [busqueda, setBusqueda] = useState<string>("");
  const [alertMessage, setAlertMessage] = React.useState<AlertType>({ show: false });
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const listaNominasQuery = async () => await listaNominasAxios();

  const procesarNominaQuery = async () => await procesarNominaAxios();

  const navigate = useNavigate();

  const filtrar = (nominas: Nomina[], filtro: string): Nomina[] => {
    return nominas.filter((nomina) => {
      if (formatDate(nomina.fechaInicio).includes(filtro)) {
        return nomina;
      }
    });
  };

  const procesar = () => {
    setBtnDisabled(true);

    procesarNominaQuery().then((res) => {
      listarNomina();
      setAlertMessage({
        show: true,
        message: res.data.message,
        type: "success",
        event: () => setAlertMessage({ show: false })
      });
    }).catch((err) => {
      listarNomina();
      setAlertMessage({
        show: true,
        message: err.response.data.message,
        type: warning,
        event: () => setAlertMessage({ show: false })
      });
    });

    setTimeout(() => {
      setBtnDisabled(false);
    }, timeoutConfig);
  };

  const buscarFiltro = (e: any) => {
    const filtro = e.target.value.toLowerCase();
    setBusqueda(filtro);
    if (e.target.value === "") {
      setListNominasAux(listaNominas);
    } else {
      setListNominasAux(filtrar(listaNominas, filtro));
    }
  };

  const listarNomina = () => {
    listaNominasQuery().then((res) => {
      setListaNominas(res.data);
      setListNominasAux(res.data);
    });
  };

  useEffect(() => {
    listarNomina();
  }, []);

  return (
    <Fragment>
      <div className="pt-24">
        <div className="max-w-4xl mx-auto my-10 bg-white px-8 py-12 rounded-md shadow-lg">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="text-xl font-medium">Nóminas</h1>
            </div>
            <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </span>

              <input type="text" placeholder="Buscar..." value={busqueda}
                     onInput={(e) => buscarFiltro(e)}
                     className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-md md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>
          </div>
          <p className="text-slate-500">Nóminas procesadas en el sistema</p>
          <button
            onClick={() => setModal(true)}
            disabled={btnDisabled}
            className="inline-flex justify-center rounded-md border mt-4
                                    border-transparent bg-red-600 py-2 px-4 text-sm
                                    font-medium text-white shadow-sm hover:bg-red-700
                                    focus:outline-none focus:ring-2 focus:ring-red-500
                                    focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {btnDisabled && <Load />}
            Procesar nómina
          </button>
          <div className="my-5 overflow-y-scroll max-h-72">
            {listNominasAux.map((nomina: Nomina, index: number) => (
              <div key={nomina.id}
                   onClick={() => navigate("/panel/nomina/" + encrypt(nomina.id.toString()) + "/" + encrypt(formatDateDayMontYear(nomina.fechaInicio)) + "/empleados")}
                   className="hover:text-gray-400 hover:cursor-pointer flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 ease-linear">
                <div className="inline-flex items-center space-x-2">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor"
                         className="w-6 h-6 text-slate-500">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm">{formatDate(nomina.fechaInicio)}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-md text-slate-500 text-center">Nóminas: {listNominasAux.length}</p>
        </div>
      </div>

      <AlertMessage alert={alertMessage} setAlert={() => setAlertMessage({ show: false })} />
      <ModalConfirmation
        open={modal}
        closeModal={() => setModal(false)}
        message="¿Está seguro que desea procesar la nómina?"
        title="Procesar Nómina"
        event={() => procesar()} />
    </Fragment>
  );
};

export default Nominas;