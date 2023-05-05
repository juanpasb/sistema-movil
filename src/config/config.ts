import {
  BsClockHistory,
  BsJournalBookmark,
  BsTable, FiCreditCard,
  FiUsers, GrHistory,
  HiBuildingOffice2,
  HiDocumentText, ImDropbox, ImMap,
  IoDocumentTextSharp, MdHistoryToggleOff, MdOutlineHistory, RiBarChartBoxFill
} from "react-icons/all";

interface footer {
  nombre: string;
  descripcion: string;
  terminos: string;
}

interface Path {
  path: string;
  icon: any;
  title: string;
}

interface Panel {
  titulo: string;
  path: Path[];
}

interface Header {
  titulo: string;
  path: string;
}

interface Config {
  nombre: string;
  footer: footer;
  panel: Panel;
  header: Header[];
}

export const config: Config = {
  nombre: "Mundial S.A.S",
  footer: {
    nombre: "Mundial S.A.S",
    descripcion: "servicioalclientemundial@grupo-orbis.com",
    terminos: "COPYRIGHT © 2023 MUNDIAL"
  },
  panel: {
    titulo: "Mundial S.A.S",
    path: [
      {
        path: "/panel/usuarios",
        icon: FiUsers,
        title: "Usuarios"
      },
      {
        path: "/panel/registros",
        icon: BsJournalBookmark,
        title: "Registros"
      },
      {
        path: "/panel/documentos",
        icon: FiCreditCard,
        title: "Documentos"
      },
      {
        path: "/panel/areas",
        icon: RiBarChartBoxFill,
        title: "Areas"
      },
      {
        path: "/panel/sedes",
        icon: ImMap,
        title: "Sedes"
      },
      {
        path: "/panel/historial",
        icon: BsClockHistory,
        title: "Historial"
      },
      {
        path: "/panel/nomina/parametros",
        icon: MdOutlineHistory,
        title: "Parámetros"
      },
      {
        path: "/panel/nomina",
        icon: BsTable,
        title: "Nómina"
      },{
        path: "/panel/nomina/config",
        icon: MdHistoryToggleOff,
        title: "Configuración"
      },
    ]
  },
  header: [
    {
      titulo: "Inicio",
      path: "/inicio"
    },
    {
      titulo: "Registro",
      path: "/registro"
    },
    {
      titulo: "Ingreso",
      path: "/ingreso"
    },
    {
      titulo: "Salida",
      path: "/salida"
    }
  ]
};

export const success: string = "success";
export const update: string = "update";
export const warning: string = "warning";
export const error: string = "error";

export const timeoutConfig: number = 2800;