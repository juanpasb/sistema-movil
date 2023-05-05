import React, { FormEvent, useState } from "react";
import AlertMessage, { AlertType } from "../../components/alertMessage";
import { recuperarClaveAxios } from "../../service/authService";
import { error, success, timeoutConfig } from "../../config/config";
import { useNavigate } from "react-router-dom";
import Load from "../../components/load";

const Recover = () => {
  const [correo, setCorreo] = useState("");
  const [alertMessage, setAlertMessage] = React.useState<AlertType>({ show: false });
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const recuperarClaveQuery = async (email: string) => await recuperarClaveAxios(email);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnDisabled(true);

    recuperarClaveQuery(correo).then((res) => {
      setAlertMessage({
        show: true,
        message: res.data.message, type: success,
        event: () => navigate("/inicio")
      });
    }).catch((err) => {
     setTimeout(() => {
        setBtnDisabled(false);
     }, timeoutConfig);

      try {
        err.response.status;
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
    <main className="flex items-center justify-center h-screen p-4">
      <div className="w-96 bg-white rounded-md shadow-lg p-8">
        <h1 className="text-xl font-semibold text-center mb-4">Recuperar contraseña</h1>
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <div className="relative">
            <input value={correo}
              type="email"
              className="w-full border-gray-300 py-2 px-10 rounded-md outline-none
              focus:border-red-500 focus:ring-1 focus:ring-red-500"
              placeholder="Ingresa tu correo"
              onInput={(e) => {
                setCorreo(e.currentTarget.value);
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
          <button disabled={correo === "" || btnDisabled}
                  type="submit"
                  className="w-full rounded-md border transition-colors
                                    border-transparent bg-red-600 py-2 px-4 text-sm
                                    font-medium text-white shadow-sm hover:bg-red-700
                                    focus:outline-none focus:ring-2 focus:ring-red-500
                                    focus:ring-offset-2 disabled:opacity-50 disabled:opacity-80
                                    disabled:cursor-not-allowed disabled:hover:bg-red-500"
          >
            {btnDisabled && <Load />}
            Recuperar
          </button>
        </form>
      </div>

      <AlertMessage alert={alertMessage} setAlert={() => setAlertMessage({ show: false })} />

    </main>
  );
};

export default Recover;