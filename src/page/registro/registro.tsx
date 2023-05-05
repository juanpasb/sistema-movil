import React, { FormEvent, Fragment, useEffect } from "react";
import Item from "../../components/item";
import { TipoDocumento } from "../../model/tipoDocumento";
import { Area } from "../../model/area";
import { Sede } from "../../model/sede";
import { listaTipoCargaAxios, listaTipoUsuarioAxios, registroIngresoAxios } from "../../service/registroService";
import { listaSedesActivasAxios } from "../../service/sedeService";
import { listaTipoDocumentoActivosAxios } from "../../service/tipoDocumentoService";
import { listaAreasActivasAxios } from "../../service/areaService";
import { Ingreso } from "../../model/ingreso";
import AlertMessage, { AlertType } from "../../components/alertMessage";
import { error, success, timeoutConfig, warning } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { validation } from "../../element/validationForm";
import Load from "../../components/load";
import { encrypt } from "../../element/encript";
import { Usuario } from "../../model/usuario";
import { date } from "../../element/formatDateSimpleFormat";

const Registro = () => {

  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const [listaTipoUsuarios, setListaTipoUsuarios] = React.useState<string[]>([]);
  const [listaTipoDocumentos, setListaTipoDocumentos] = React.useState<TipoDocumento[]>([]);
  const [listaAreas, setListaAreas] = React.useState<Area[]>([]);
  const [listaSedes, setListaSedes] = React.useState<Sede[]>([]);
  const [listaTipoCarga, setListaTipoCarga] = React.useState<string[]>([]);

  const [tipoUsuario, setTipoUsuario] = React.useState<string>("");
  const [nombres, setNombres] = React.useState<string>("");
  const [apellidos, setApellidos] = React.useState<string>("");
  const [tipoDocumento, setTipoDocumento] = React.useState<TipoDocumento | null>(null);
  const [documento, setDocumento] = React.useState<string>("");
  const [placa, setPlaca] = React.useState<string | null>("");
  const [area, setArea] = React.useState<Area | null>(null);
  const [empresa, setEmpresa] = React.useState<string | null>("");
  const [numeroEmergencia, setNumeroEmergencia] = React.useState<string>("");
  const [encargado, setEncargado] = React.useState<string | null>(null);
  const [factura, setFactura] = React.useState<string | null>("");
  const [unidades, setUnidades] = React.useState<string | null>("");
  const [peso, setPeso] = React.useState<string | null>("");
  const [cargueDevolucion, setCargueDevolucion] = React.useState<string | null>("");
  const [sede, setSede] = React.useState<Sede | null>(null);

  const [alertMessage, setAlertMessage] = React.useState<AlertType>({ show: false });

  const navigate = useNavigate();

  const listaTipoUsuarioQuery = async () => await listaTipoUsuarioAxios();

  const listaTipoCargaQuery = async () => await listaTipoCargaAxios();

  const listaSedesActivasQuery = async () => await listaSedesActivasAxios();

  const listaTipoDocumentoActivosQuery = async () => await listaTipoDocumentoActivosAxios();

  const listaAreasActivasQuery = async () => await listaAreasActivasAxios();

  const registroIngresoQuery = async (ingreso: Ingreso) => await registroIngresoAxios(ingreso);

  const valores = (): Ingreso => {
    const ingreso: Ingreso = {
      nombre: nombres,
      apellido: apellidos,
      documento: tipoDocumento === null || documento === "" ? null : {
        tipo: tipoDocumento,
        numero: documento.toString()
      },
      numeroEmergencia: numeroEmergencia.toString(),
      empresa: tipoUsuario === "Empleado" ? null : empresa,
      tipoUsuario: tipoUsuario,
      area: area,
      sede: sede,
      placa: placa === "" ? tipoUsuario === "Visitante" || tipoUsuario === "Empleado" ? null : "" : placa,
      encargado: tipoUsuario === "Visitante" ? encargado : null,
      factura: tipoUsuario === "Proveedor" ? factura : null,
      unidades: tipoUsuario === "Proveedor" ? unidades : null,
      peso: tipoUsuario === "Proveedor" || tipoUsuario === "Transportador" ? peso : null,
      cargueDevolucion: tipoUsuario === "Transportador" ? cargueDevolucion : null
    };
    return ingreso;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setBtnDisabled(true);
    e.preventDefault();

    registroIngresoQuery(valores()).then((res) => {
      const user: Usuario = res.data.data;
      user.id = 0;
      setAlertMessage({
        type: success, message: res.data.message, show: true,
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

      try {
        switch (err.response.status) {
          case 500:
            setAlertMessage({
              type: error,
              message: err.response.data.message,
              show: true,
              event: () => setAlertMessage({ show: false })
            });
            break;
          case 400:
            if (err.response.data.details !== undefined) {
              validation(err.response.data.details);
            }
            setAlertMessage({
              type: warning,
              message: err.response.data.message,
              show: true,
              event: () => setAlertMessage({ show: false })
            });
            break;
        }
      } catch (e) {
        setAlertMessage({
          type: error,
          message: "No se pudo conectar con el servidor",
          show: true,
          event: () => setAlertMessage({ show: false })
        });
      }
    });
  };

  useEffect(() => {
    listaTipoUsuarioQuery().then((res) =>
      setListaTipoUsuarios(res.data)
    );

    listaSedesActivasQuery().then((res) =>
      setListaSedes(res.data)
    );

    listaTipoCargaQuery().then((res) =>
      setListaTipoCarga(res.data)
    );

    listaTipoDocumentoActivosQuery().then((res) =>
      setListaTipoDocumentos(res.data)
    );

    listaAreasActivasQuery().then((res) =>
      setListaAreas(res.data)
    );
  }, []);

  const otrosCampos = (tipoUsuario?: string): any => {
    let content = null;

    switch (tipoUsuario) {
      case "Visitante":
        content = (
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="encargado" className="block text-sm font-medium text-gray-700">
              Encargado <span className="text-red-500">*</span>
            </label>
            <input onChange={(e) => setEncargado(e.target.value)}
                   type="text"
                   name="encargado"
                   id="encargado"
                   placeholder="Jose Roberto"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
            <span id="span-encargado" className="text-sm" />
          </div>
        );
        break;
      case "Proveedor":
        content = (
          <Fragment>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="factura" className="block text-sm font-medium text-gray-700">
                Factura <span className="text-red-500">*</span>
              </label>
              <input onChange={(e) => setFactura(e.target.value)}
                     type="text"
                     name="factura"
                     id="factura"
                     placeholder="234123123"
                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
              <span id="span-factura" className="text-sm" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="unidades" className="block text-sm font-medium text-gray-700">
                Unidades <span className="text-red-500">*</span>
              </label>
              <input onChange={(e) => setUnidades(e.target.value)}
                     type="number"
                     name="unidades"
                     min={0}
                     id="unidades"
                     placeholder="99"
                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
              <span id="span-unidades" className="text-sm" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="peso" className="block text-sm font-medium text-gray-700">
                Peso (Toneladas) <span className="text-red-500">*</span>
              </label>
              <input onChange={(e) => setPeso(e.target.value)}
                     pattern="[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?(\.[0-9][0-9]?[0-9]?)?"
                     type="text"
                     name="peso"
                     id="peso"
                     placeholder="40.5"
                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
              <span id="span-peso" className="text-sm" />
            </div>
          </Fragment>
        );
        break;
      case "Transportador":
        content = (
          <Fragment>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="peso" className="block text-sm font-medium text-gray-700">
                Peso (Toneladas) <span className="text-red-500">*</span>
              </label>
              <input onChange={(e) => setPeso(e.target.value)}
                     pattern="[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?(\.[0-9][0-9]?[0-9]?)?"
                     type="text"
                     name="peso"
                     id="peso"
                     placeholder="40.5"
                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
              <span id="span-peso" className="text-sm" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="cargueDevolucion" className="block text-sm font-medium text-gray-700">
                Cargue / Devolución <span className="text-red-500">*</span>
              </label>
              <select onChange={(e) => setCargueDevolucion(e.target.value)}
                      id="cargueDevolucion"
                      name="cargueDevolucion"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                     py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                     focus:ring-red-500 sm:text-sm"
              >
                <option disabled selected>Seleccione...</option>
                {listaTipoCarga.map((tipo: string, index: number) => (
                  <option key={index}
                          value={tipo}>{tipo}</option>
                ))}
              </select>
              <span id="span-cargueDevolucion" className="text-sm" />
            </div>
          </Fragment>
        );
        break;
    }

    return content;
  };

  return (
    <main className="min-h-screen flex items-center justify-center pt-24">
      <div className="container max-w-4xl px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl">
          Registro
        </h1>

        <form className="mt-12 space-y-8" onSubmit={(e) => handleSubmit(e)}>

          <Item estado={true} titulo="Información inicial" content={
            <div className="grid grid-cols-6 gap-6 p-8">

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="tipoUsuario" className="block text-sm font-medium text-gray-700">
                  Tipo de usuario <span className="text-red-500">*</span>
                </label>
                <select onChange={(e) => setTipoUsuario(e.target.value)}
                        id="tipoUsuario"
                        name="tipoUsuario"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                     py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                     focus:ring-red-500 sm:text-sm"
                >
                  <option disabled selected>Seleccione...</option>
                  {listaTipoUsuarios.map((tipo: string, index: number) => (
                    <option key={index} value={tipo}>{tipo}</option>
                  ))}
                </select>
                <span id="span-tipoUsuario" className="text-sm" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="sede" className="block text-sm font-medium text-gray-700">
                  Sede <span className="text-red-500">*</span>
                </label>
                <select onChange={(e) => setSede(JSON.parse(e.target.value))}
                        id="sede"
                        name="sede"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                                     py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none
                                     focus:ring-red-500 sm:text-sm"
                >
                  <option disabled selected>Seleccione...</option>
                  {listaSedes.map((tipo: Sede, index: number) => (
                    <option key={index}
                            value={JSON.stringify(tipo)}>{tipo.nombre + " (" + tipo.direccion + ")"}</option>
                  ))}
                </select>
                <span id="span-sede" className="text-sm" />
              </div>
            </div>
          } />

          <Item estado={false} titulo="Información detalle" content={
            <div className="grid grid-cols-6 gap-6 p-8">

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombres <span className="text-red-500">*</span>
                </label>
                <input onChange={(e) => setNombres(e.target.value)}
                       type="text"
                       name="nombre"
                       id="nombre"
                       placeholder="Juan Carlos"
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
                <span id="span-nombre" className="text-sm" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                  Apellidos <span className="text-red-500">*</span>
                </label>
                <input onChange={(e) => setApellidos(e.target.value)}
                       type="text"
                       name="apellido"
                       id="apellido"
                       placeholder="Perez Gomez"
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
                <span id="span-apellido" className="text-sm" />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="documento" className="block text-sm font-medium text-gray-700">
                  Documento <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input onChange={(e) => setDocumento(e.target.value)}
                         type="number"
                         min={0}
                         name="documento"
                         id="documento"
                         className="block w-full rounded-md border-gray-300 pr-12 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                         placeholder="343465433"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <select onChange={(e) => setTipoDocumento(JSON.parse(e.target.value))}
                            name="documento"
                            className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    >
                      <option disabled selected>##</option>
                      {listaTipoDocumentos.map((tipo: TipoDocumento, index: number) => (
                        <option key={index} value={JSON.stringify(tipo)}>{tipo.abreviatura}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <span id="span-documento" className="text-sm" />
              </div>

              {tipoUsuario !== "Empleado" ?
                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">
                    Empresa <span className="text-red-500">*</span>
                  </label>
                  <input onChange={(e) => setEmpresa(e.target.value)}
                         type="text"
                         placeholder="Empresa S.A.S"
                         name="empresa"
                         id="empresa"
                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                  <span id="span-empresa" className="text-sm" />
                </div> : null
              }

              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                  Area <span className="text-red-500">*</span>
                </label>
                <select onChange={(e) => setArea(JSON.parse(e.target.value))}
                        id="area"
                        name="area"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                >
                  <option disabled selected>Seleccione...</option>
                  {listaAreas.map((area: Area, index: number) => (
                    <option key={index} value={JSON.stringify(area)}>{area.nombre}</option>
                  ))}
                </select>
                <span id="span-area" className="text-sm" />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="placa" className="block text-sm font-medium text-gray-700">
                  Placa {tipoUsuario === "Visitante" || tipoUsuario === "Empleado" ? null :
                  <span className="text-red-500">*</span>}
                </label>
                {
                  tipoUsuario === "Visitante" || tipoUsuario === "Empleado" ? (
                    <input onChange={(e) => setPlaca(e.target.value)}
                           type="text"
                           name="placa"
                           id="placa"
                           placeholder="AAA-000"
                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  ) : (
                    <input onChange={(e) => setPlaca(e.target.value)}
                           type="text"
                           name="placa"
                           id="placa"
                           maxLength={7}
                           minLength={7}
                           placeholder="AAA-000"
                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  )
                }
                <span id="span-placa" className="text-sm" />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="numeroEmergencia" className="block text-sm font-medium text-gray-700">
                  Numero de emergencia <span className="text-red-500">*</span>
                </label>
                <input onChange={(e) => setNumeroEmergencia(e.target.value)}
                       type="number"
                       min={0}
                       name="numeroEmergencia"
                       id="numeroEmergencia"
                       placeholder="32124567853"
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
                <span id="span-numeroEmergencia" className="text-sm" />
              </div>
            </div>
          } />

          {
            otrosCampos(tipoUsuario) !== null ?
              <Item estado={false} titulo="Información adicional" content={
                <div className="grid grid-cols-6 gap-6 p-8">
                  {otrosCampos(tipoUsuario)}
                </div>
              } /> : <Fragment />
          }

          <div className="px-4 py-3 text-right sm:px-6">
            <button
              disabled={btnDisabled}
              type="submit"
              className="inline-flex justify-center rounded-md border
                                    border-transparent bg-red-600 py-2 px-4 text-sm
                                    font-medium text-white shadow-sm hover:bg-red-700
                                    focus:outline-none focus:ring-2 focus:ring-red-500
                                    focus:ring-offset-2 disabled:cursor-not-allowed"
            >
              {btnDisabled && <Load />}
              Hacer registro
            </button>
          </div>
        </form>
      </div>

      <AlertMessage alert={alertMessage} setAlert={() => setAlertMessage({ show: false })} />

    </main>
  );
};

export default Registro;