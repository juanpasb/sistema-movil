import { Historial } from "../../../model/Historial";
import { formatDate } from "../../../element/formatDateSimpleFormat";
import { Rol } from "../../../model/rol";

const DetalleHistorial = (props: { historial: Historial }) => {

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
          <Item label="Tipo" value={props.historial.tipo} />
          <Item label="Fecha" value={formatDate(props.historial.fecha)} />
          <Item label="Descripción" value={props.historial.descripcion} />
        </div>
        <h2 className="text-md title-font font-medium text-gray-800">Usuario</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Item label="Nombre" value={props.historial.usuario.nombre} />
          <Item label="Apellido" value={props.historial.usuario.apellido} />
          <Item label="Documento"
                value={props.historial.usuario.tipoDocumento.abreviatura + " - " + props.historial.usuario.numeroDocumento} />

          {props.historial.usuario.correo !== null &&
            <Item label="Correo" value={props.historial.usuario.correo} />
          }

          {props.historial.usuario.numeroCelular !== null
            && props.historial.usuario.numeroCelular !== "" &&
            <Item label="Celular" value={props.historial.usuario.numeroCelular} />
          }

          {props.historial.usuario.numeroEmergencia !== null &&
            <Item label="Celular Emergencia" value={props.historial.usuario.numeroEmergencia} />
          }

          {props.historial.usuario.empresa !== null &&
            <Item label="Empresa" value={props.historial.usuario.empresa} />
          }

          {props.historial.usuario.area !== null &&
            <Item label="Area" value={props.historial.usuario.area.nombre} />
          }

          {props.historial.usuario.roles.length > 0 &&
            <Item label="Permisos" value={props.historial.usuario.roles.map((rol: Rol) => {
              return rol.nombre;
            }).join(", ")} />}
        </div>
      </div>
    </section>
  );
};

export default DetalleHistorial;