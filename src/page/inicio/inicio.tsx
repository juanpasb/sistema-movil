import React from "react";
import { Link } from "react-router-dom";
import Load from "../../components/load";
import AlertMessage, { AlertType } from "../../components/alertMessage";
import { autenticarseAxios, AuthService } from "../../service/authService";
import { error, timeoutConfig, warning } from "../../config/config";
import Cookies from "js-cookie";
import { Rol } from "../../model/rol";

const Inicio = () => {

  const [email, setEmail] = React.useState("");
  const [btnDisabled, setBtnDisabled] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState<AlertType>({ show: false });

  const autenticarseQuery = (auth: AuthService) => autenticarseAxios(auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnDisabled(true);

    autenticarseQuery({ correo: email, clave: password }).then((res) => {
      Cookies.set("token", res.data.token, { secure: false, sameSite: "strict", expires: 1 });
      Cookies.set("user", JSON.stringify(res.data.usuario), { secure: false, sameSite: "strict", expires: 1 });

      let path: string | null = null;
      res.data.usuario.roles.forEach((rol: Rol) => {
        if (rol.path !== null) {
          path = rol.path;
        }
      });

      setAlertMessage({
        show: true,
        message: res.data.message, type: "success",
        event: () => window.location.href = path || "/inicio"
      });
    }).catch((err) => {
      setTimeout(() => {
        setBtnDisabled(false);
      }, timeoutConfig);

      try {
        setAlertMessage({
          show: true,
          message: err.response.data.message, type: warning,
          event: () => setAlertMessage({ show: false })
        });
      } catch (e) {
        setAlertMessage({
          type: error,
          message: "No se pudo conectar con el servidor",
          show: true,
          event: () => setAlertMessage({ show: false })
        });
      }
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg">
        <div className="bg-white w-full rounded-md p-8 mb-8 shadow-lg">
          <div className="flex flex-col items-center gap-1 mb-5">
            <h1 className="text-2xl text-gray-900 font-semibold">Bienvenido</h1>
            <p className="text-gray-400 text-sm">
              Ingresa con tu correo electrónico y tu contraseña
            </p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
            <div className="relative">
              <input
                type="email"
                className="w-full border-gray-300 py-2 px-10 rounded-md outline-none
                                focus:border-red-500 focus:ring-1 focus:ring-red-500"
                placeholder="Ingresa tu correo"
                onInput={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div className="relative">
              <input
                type="password"
                className="w-full border-gray-300 py-2 px-10 rounded-md outline-none
                                 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                placeholder="Ingresa tu contraseña"
                onInput={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <div>
              <button
                disabled={email === "" || password === "" || btnDisabled}
                type="submit"
                className="w-full rounded-md border transition-colors
                                    border-transparent bg-red-600 py-2 px-4 text-sm
                                    font-medium text-white shadow-sm hover:bg-red-700
                                    focus:outline-none focus:ring-2 focus:ring-red-500
                                    focus:ring-offset-2 disabled:opacity-50 disabled:opacity-80
                                    disabled:cursor-not-allowed disabled:hover:bg-red-500"
              >
                {btnDisabled && <Load />}
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
        <span className="flex items-center justify-center gap-2">
                           ¿Olvidaste tu contraseña?
          <Link to={"/inicio/recover"} className="text-red-500 hover:text-gray-600 transition-colors">Recuperar</Link>
                    </span>
      </div>

      <AlertMessage alert={alertMessage} setAlert={() => setAlertMessage({ show: false })} />

    </main>
  );
};

export default Inicio;