import React, { Fragment, useRef, useState } from "react";
import { RiCloseLine, RiLogoutCircleRLine, RiMenu3Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { config } from "../config/config";
import { clearToken } from "../service/token-config";
import { logoutAxios } from "../service/authService";
import { useOutsideAlerter } from "../element/useOutsideAlerter";

const Aside = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logoutQuery = () => logoutAxios();

  const location = useLocation();
  const navigate = useNavigate();

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setShowMenu(false);
  });

  const exit = () => {
    logoutQuery().then((res) => {
      clearToken();
      navigate("/inicio");
    });
  };

  return (
    <Fragment>
      <aside ref={wrapperRef}
             className={`bg-white shadow-lg fixed ${
               showMenu ? "-left-0" : "-left-full"
             } lg:left-0 top-0 w-72 h-full p-8 flex flex-col justify-between transition-all overflow-y-scroll border border-white lg:z-auto z-50`}
      >
        <div>
          <div className="mb-8">
            <Link to="/panel"
                  className="text-gray-800 uppercase font-bold text-lg tracking-[3px]">
              {config.panel.titulo}
            </Link>
          </div>
          {/* Nav */}
          <nav>
            {config.panel.path.length > 0 ? config.panel.path.map((item, index) => (
              <Link to={item.path} key={index}
                    onClick={() => location.pathname === item.path ? window.location.reload() : null}
                    className={(location.pathname === item.path ? "text-red-600 bg-gray-200 rounded-md" : " text-gray-700") + " flex m-2 items-center gap-4 py-2 p-4"}>
                {<item.icon />} {item.title}
              </Link>)) : null}
          </nav>
        </div>
        {/* Logout */}
        <div>
          <button onClick={exit}
                  className="flex items-center gap-4 text-gray-600 hover:text-red-500 transition-colors">
            <RiLogoutCircleRLine /> Cerrar sesión
          </button>
        </div>
        {/* Btn aside movile */}
        <button onClick={toggleMenu}
                className="lg:hidden fixed right-4 bottom-4 bg-red-500 ring-4 ring-gray-200 text-white text-xl p-3 rounded-full z-50"
        >
          {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
        </button>
      </aside>

    </Fragment>
  );

};

export default Aside;