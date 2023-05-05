import img from "../assets/img/illustration.svg";
import {Link} from "react-router-dom";

const Page_404 = () => {

    return (
        <main className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
            <div className="wf-ull lg:w-1/2">
                <p className="text-sm font-medium text-orange-500">404 error</p>
                <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">Página no encontrada</h1>
                <p className="mt-4 text-gray-500">Lo sentimos, la página que está buscando no existe. Aquí hay algunos
                    enlaces útiles:</p>

                <div className="flex items-center mt-6 gap-x-3">
                    <Link to="/"
                          className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-orange-500 rounded-lg shrink-0 sm:w-auto hover:bg-orange-600 dark:hover:bg-orange-500 dark:bg-orange-600">
                        Llévame a casa
                    </Link>
                </div>
            </div>

            <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                <img className="w-full max-w-lg lg:mx-auto" src={img} alt="404"/>
            </div>
        </main>
    );
}

export default Page_404;