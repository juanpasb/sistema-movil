import { formatDate } from "../../../element/formatDateSimpleFormat";
import { Rol } from "../../../model/rol";
import { Registro } from "../../../model/registro";

const DetalleRegistro = (props: { registro: Registro }) => {

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
          {props.registro.sede !== null &&
            <Item label="Sede" value={props.registro.sede?.nombre + " - " + props.registro.sede.direccion} />}
          <Item label="Fecha de llegada" value={formatDate(props.registro.fechaLlegada)} />
          {props.registro.fechaSalida !== null &&
            <Item label="Fecha de salida" value={formatDate(props.registro.fechaSalida)} />}
          {props.registro.cargueDevolucion !== null &&
            <Item label="Tipo Carga" value={props.registro.cargueDevolucion} />}
          {props.registro.encargado !== null && <Item label="Encargado" value={props.registro.encargado} />}
          {props.registro.factura !== null && <Item label="Factura" value={props.registro.factura} />}
          {props.registro.peso !== null && <Item label="Peso" value={props.registro.peso.toString()} />}
          {props.registro.placa !== null && <Item label="Placa" value={props.registro.placa} />}
          {props.registro.unidades !== null && <Item label="Unidades" value={props.registro.unidades.toString()} />}
          {props.registro.tipoUsuario !== null && <Item label="Tipo de usuario" value={props.registro.tipoUsuario} />}
        </div>

        <h2 className="text-md title-font font-medium text-gray-800">Usuario</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Item label="Nombre" value={props.registro.usuario.nombre} />
          <Item label="Apellido" value={props.registro.usuario.apellido} />
          <Item label="Documento"
                value={props.registro.usuario.tipoDocumento.abreviatura + " - " + props.registro.usuario.numeroDocumento} />
          {props.registro.usuario.correo !== null && <Item label="Correo" value={props.registro.usuario.correo} />}
          {props.registro.usuario.numeroCelular !== null &&
            <Item label="Celular" value={props.registro.usuario.numeroCelular} />}
          {props.registro.usuario.numeroEmergencia !== null &&
            <Item label="Numero de emergencia" value={props.registro.usuario.numeroEmergencia} />}
          {props.registro.usuario.roles.length > 0 &&
            <Item label="Permisos" value={props.registro.usuario.roles.map((rol: Rol) => {
              return rol.nombre;
            }).join(", ")} />}
          {props.registro.usuario.empresa !== null &&
            <Item label="Empresa" value={props.registro.usuario.empresa} />
          }

          {props.registro.usuario.area !== null &&
            <Item label="Area" value={props.registro.usuario.area.nombre} />
          }
        </div>
      </div>
    </section>
  );
};

export default DetalleRegistro;