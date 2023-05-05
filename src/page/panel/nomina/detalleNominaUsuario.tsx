import { Rol } from "../../../model/rol";
import { NominaUsuario } from "../../../model/nominaUsuario";

const DetalleNominaUsuario = (props: { nominaUsuario: NominaUsuario }) => {
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
          <Item label="Horas trabajadas" value={props.nominaUsuario.horasTrabajadas.toString()} />
          <Item label="Horas extras" value={props.nominaUsuario.horasTrabajadasExtra.toString()} />
        </div>
        <h2 className="text-md title-font font-medium text-gray-800">Usuario</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Item label="Nombre" value={props.nominaUsuario.usuario.nombre} />
          <Item label="Apellido" value={props.nominaUsuario.usuario.apellido} />
          <Item label="Documento"
                value={props.nominaUsuario.usuario.tipoDocumento.abreviatura + " - " + props.nominaUsuario.usuario.numeroDocumento} />

          {props.nominaUsuario.usuario.correo !== null &&
            <Item label="Correo" value={props.nominaUsuario.usuario.correo} />
          }


          {props.nominaUsuario.usuario.numeroCelular !== null &&
            <Item label="Celular" value={props.nominaUsuario.usuario.numeroCelular} />
          }

          {props.nominaUsuario.usuario.numeroEmergencia !== null &&
            <Item label="Celular Emergencia" value={props.nominaUsuario.usuario.numeroEmergencia} />
          }

          {props.nominaUsuario.usuario.empresa !== null &&
            <Item label="Empresa" value={props.nominaUsuario.usuario.empresa} />
          }

          {props.nominaUsuario.usuario.area !== null &&
            <Item label="Area" value={props.nominaUsuario.usuario.area.nombre} />
          }

          {props.nominaUsuario.usuario.roles.length > 0 &&
            <Item label="Permisos" value={props.nominaUsuario.usuario.roles.map((rol: Rol) => {
              return rol.nombre;
            }).join(", ")} />}
        </div>
      </div>
    </section>
  );
};

export default DetalleNominaUsuario;