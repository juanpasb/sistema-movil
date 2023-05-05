import {config} from "../config/config";

const Footer = () => {

    return (
        <footer className="flex flex-col xl:flex-row justify-center items-center gap-4 xl:gap-0 xl:justify-between w-full p-4">
            <div>
                <h1 className="text-gray-800">{config.nombre}</h1>
            </div>
            <div>
                <p className="text-gray-800 text-center md:text-left">
                    {config.footer.descripcion}
                </p>
            </div>
            <div className="flex flex-col xl:flex-row items-center gap-2">
                <span className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {config.footer.terminos}
                </span>
            </div>
        </footer>
    );
}

export default Footer;