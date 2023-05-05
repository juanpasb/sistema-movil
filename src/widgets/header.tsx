import { Link } from "react-router-dom";
import { config } from "../config/config";

const Header = () => {

  return (
    <header
      className="w-full fixed bg-white p-4 flex flex-col xl:flex-row gap-4 items-center justify-center md:justify-between shadow-sm border border-b-white">
      <Link to={"/"} className="uppercase font-semibold cursor-pointer text-lg">
        {config.nombre}
      </Link>
      <nav className="flex items-center gap-4">
        {config.header.length > 0 ? config.header.map((item, index) => (
          <Link to={item.path} key={index}
                className="py-1 px-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {item.titulo}
          </Link>
        )) : null}
      </nav>
    </header>
  );
};

export default Header;