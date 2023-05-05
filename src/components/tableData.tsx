import React, { useEffect } from "react";

interface utils {
  icon: any,
  event: Function,
  title: string
}

const TableData = (props: {
  titulo: string,
  descripcion: string,
  eventAdd?: Function,
  eventSearch?: any,
  headers: string[],
  tbody: Function,
  data: Object[],
  utils?: utils[]
}) => {

  const [list, setList] = React.useState<Object[]>([]);
  const [listAux, setListAux] = React.useState<Object[]>([]);

  const [busqueda, setBusqueda] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(0);
  const [maxPage, setMaxPage] = React.useState<number>(0);

  const prevPage = () => {
    if (page !== 1 && page !== 0) {
      setPage(page - 1);
      setListAux(list.slice((page - 2) * 5, (page - 1) * 5));
    }
  };

  const nextPage = () => {
    if (page !== maxPage && page !== 0) {
      setPage(page + 1);
      setListAux(list.slice(page * 5, (page + 1) * 5));
    }
  };

  const setDatos = (list: Object[], page: number) => {
    const ceil: number = Math.ceil(list.length / 5);
    setList(list);
    setMaxPage(ceil);
    setPage(ceil === 0 ? 0 : page === 0 ? 1 : page);
    if (page === 0 || page == 1) {
      setListAux(list.slice(0, 5));
    } else {
      setListAux(list.slice((page - 1) * 5, page * 5));
    }
  };

  const buscarFiltro = (e: any) => {
    const filtro = e.target.value.toLowerCase();
    setBusqueda(filtro);
    if (e.target.value === "") {
      setDatos(props.data, page);
    } else {
      setDatos(props.eventSearch(props.data, filtro), 1);
    }
  };

  useEffect(() => {
    if (busqueda.length === 0) {
      setDatos(props.data, page);
    } else {
      buscarFiltro({ target: { value: busqueda } });
    }
  }, [props.data, props.tbody]);

  return (
    <div className="bg-white p-8 rounded-md shadow-lg">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800">{props.titulo}</h2>
            <span className="px-3 py-1 text-xs text-red-600 bg-red-100 rounded-full">
              {list.length}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">{props.descripcion}</p>
        </div>

        {props.eventAdd ? (
          <div className="flex items-center mt-4 gap-x-3">
            <button onClick={() => props.eventAdd ? props.eventAdd() : null}
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-red-500 rounded-md shrink-0 sm:w-auto gap-x-2 hover:bg-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                   stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Agregar</span>
            </button>
          </div>
        ) : null
        }
      </div>

      {props.eventSearch ? (
        <div className="mt-6 md:flex md:items-center md:justify-between">
          {
            props.utils ? (
              <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse">
                <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse">
                  {props.utils.map((item, index: number) => (
                    <button key={index} onClick={() => item.event()}
                            className="transition-colors text-lg text-gray-500 p-2 hover:text-red-500 hover:bg-gray-100">
                      <item.icon />
                    </button>
                  ))}
                </div>
              </div>) : null
          }
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
      ) : null
      }

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  {props.headers.map((header, index) => (
                    <th scope="col" key={index}
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      {header}
                    </th>
                  ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {props.tbody(listAux)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
        <div className="text-sm text-gray-500">
          Pagina <span className="font-medium text-gray-700">{page} de {maxPage}</span>
        </div>

        <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
          <button onClick={prevPage}
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>

            <span>anterior</span>
          </button>

          <button onClick={nextPage}
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100">
            <span>Siguiente</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableData;