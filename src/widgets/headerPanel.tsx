import React from "react";
import { getUsuario } from "../service/token-config";
import { Usuario } from "../model/usuario";
import { formatName } from "../element/formatName";

const HeaderPanel = () => {
  const usuario: Usuario | null = getUsuario();

  return (
    <header className="fixed left-0 top-0 w-full bg-white p-4 flex justify-end shadow-sm border border-b-white">
      <ul className="flex items-center gap-4">
        <li>
          <span className="flex text-gray-800 items-center gap-2">
            {formatName(usuario as Usuario)}
          </span>
        </li>
      </ul>

    </header>
  );
};

export default HeaderPanel;