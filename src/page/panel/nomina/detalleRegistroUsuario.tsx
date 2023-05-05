import { ParametroUsuario } from "../../../model/ParametroUsuario";
import { formatDate, timeSimpleHM } from "../../../element/formatDateSimpleFormat";
import { Fragment } from "react";

const DetalleparametroUsuario = (props: { parametroUsuario: ParametroUsuario }) => {

  const Item = (props: { label: string, value: string }) => {
    return (
      <div className="p-2 w-full">
        <div className="h-full flex items-center p-2">
          <div className="flex-grow p-1">
            <h2 className="text-gray-900">{props.label}</h2>
            <p className="text-gray-500">{props.value}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="p-2">
        <h2 className="text-md title-font font-medium text-gray-800">Información</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Item label="Horas trabajadas" value={props.parametroUsuario.horasTrabajadas.toString()} />
          <Item label="Horas extras" value={props.parametroUsuario.horasTrabajadasExtra.toString()} />
        </div>

        {props.parametroUsuario.parametro !== null &&
          <Fragment>
            <h2 className="text-md title-font font-medium text-gray-800">Parametro</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {<Item label="Abreviatura" value={props.parametroUsuario.parametro.abreviatura} />}
              {<Item label="Descripción" value={props.parametroUsuario.parametro.descripcion} />}
              {<Item label="Jornada" value={props.parametroUsuario.parametro.jornada as string} />}
              {<Item label="Hora" value={props.parametroUsuario.parametro.hora as string} />}
              {<Item label="Hora inicio"
                     value={timeSimpleHM(props.parametroUsuario.parametro.horaInicio.toString())} />}
              {<Item label="Hora fin" value={timeSimpleHM(props.parametroUsuario.parametro.horaFin.toString())} />}
            </div>
          </Fragment>
        }

        <h2 className="text-md title-font font-medium text-gray-800">Registro</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {props.parametroUsuario.registro.sede !== null && <Item label="Sede"
                                                                  value={props.parametroUsuario.registro.sede?.nombre + " - " + props.parametroUsuario.registro.sede.direccion} />}
          <Item label="Fecha de llegada"
                value={formatDate(props.parametroUsuario.registro.fechaLlegada)} />
          {props.parametroUsuario.registro.fechaSalida !== null &&
            <Item label="Fecha de salida" value={formatDate(props.parametroUsuario.registro.fechaSalida)} />}
          {props.parametroUsuario.registro.cargueDevolucion !== null &&
            <Item label="Cargue devolución" value={props.parametroUsuario.registro.cargueDevolucion} />}
          {props.parametroUsuario.registro.encargado !== null &&
            <Item label="Encargado" value={props.parametroUsuario.registro.encargado} />}
          {props.parametroUsuario.registro.factura !== null &&
            <Item label="Factura" value={props.parametroUsuario.registro.factura} />}
          {props.parametroUsuario.registro.peso !== null &&
            <Item label="Peso" value={props.parametroUsuario.registro.peso.toString()} />}
          {props.parametroUsuario.registro.placa !== null &&
            <Item label="Placa" value={props.parametroUsuario.registro.placa} />}
          {props.parametroUsuario.registro.unidades !== null &&
            <Item label="Unidades" value={props.parametroUsuario.registro.unidades.toString()} />}
          {props.parametroUsuario.registro.tipoUsuario !== null &&
            <Item label="Tipo de usuario" value={props.parametroUsuario.registro.tipoUsuario} />}
        </div>
      </div>
    </section>
  );
};

export default DetalleparametroUsuario;