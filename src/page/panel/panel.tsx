import React from "react";
import {FaUsers} from "react-icons/all";
import {numeroEmpleadosAxios} from "../../service/usuarioService";


const Panel = () => {

  const [numeroEmpleados, setNumeroEmpleados] = React.useState<any>({
    message: "Cargando...",
    data: 0
  });

  const numeroEmpleadosQuery = async () => await numeroEmpleadosAxios();

  React.useEffect(() => {
    numeroEmpleadosQuery().then((response) => {
      setNumeroEmpleados(response.data);
    });
  }, []);

  return (
    <div className="pt-12">
      <h1 className="text-2xl text-gray-500 my-10">Estadísticas</h1>
      {/* Plans */}
      <div className="text-gray-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card */}
        <div className="bg-white rounded-md shadow-lg p-3">
          <div className="flex items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-500 text-white">
              <FaUsers/>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800">{numeroEmpleados.message}</h2>
              <p className="text-gray-500">{numeroEmpleados.data}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;