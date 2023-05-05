import Load from "../../components/load";
import AlertMessage, { AlertType } from "../../components/alertMessage";
import React, { FormEvent, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cambiarClaveAxios, VerificateCode } from "../../service/authService";
import { error, success, warning } from "../../config/config";
import { validation } from "../../element/validationForm";
import { clearToken } from "../../service/token-config";
import { decrypt } from "../../element/encript";

const ChangePassword = (props: { code: string, setCode: Function }) => {
  const [clave, setClave] = useState("");
  const [confirmarClave, setConfirmarClave] = useState("");
  const [alertMessage, setAlertMessage] = React.useState<AlertType>({ show: false });
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const { value } = useParams<string>();
  const navigate = useNavigate();

  const cambiarClaveQuery = async (verificateCode: VerificateCode) => await cambiarClaveAxios(verificateCode);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnDisabled(true);

    if (clave === confirmarClave) {
      cambiarClaveQuery({ id: Number(decrypt(value as string)), code: props.code, password: clave }).then((res) => {
        setAlertMessage({
          show: true,
          message: res.data.message, type: success,
          event: () => {
            clearToken();
            props.setCode("");
            navigate("/inicio");
          }
        });
      }).catch((err) => {
        setBtnDisabled(false);

        if (err.response.status === 400) {
          if (err.response.data.details !== undefined) {
            validation(err.response.data.details);
          }
        }
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
    } else {
      setBtnDisabled(false);
      setAlertMessage({
        show: true,
        message: "Las contraseñas no coinciden", type: warning,
        event: () => setAlertMessage({ show: false })
      });
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-96 bg-white rounded-md shadow-lg p-8">
        <h1 className="text-xl font-semibold text-center mb-4">Nueva contraseña</h1>
        <form className="flex flex-col gap-3" onSubmit={(e) => handleSubmit(e)}>

          <div className="relative">
            <input value={clave}
                   type="password"
                   id="password"
                   className="w-full border-gray-300 py-2 px-10 rounded-md outline-none
              focus:border-red-500 focus:ring-1 focus:ring-red-500"
                   placeholder="Ingresa tu nueva contraseña"
                   onInput={(e) => setClave(e.currentTarget.value)}
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

          <span id="span-password" className="text-sm" />

          <div className="relative">
            <input value={confirmarClave}
                   type="password"
                   className="w-full border-gray-300 py-2 px-10 rounded-md outline-none
              focus:border-red-500 focus:ring-1 focus:ring-red-500"
                   placeholder="Confirma tu nueva contraseña"
                   onInput={(e) => setConfirmarClave(e.currentTarget.value)}
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

          <button
            disabled={clave === "" || btnDisabled || props.code === "" || value === "" || confirmarClave === "" || clave !== confirmarClave}
            type="submit"
            className="w-full rounded-md border transition-colors
                                    border-transparent bg-red-600 py-2 px-4 text-sm
                                    font-medium text-white shadow-sm hover:bg-red-700
                                    focus:outline-none focus:ring-2 focus:ring-red-500
                                    focus:ring-offset-2 disabled:opacity-50 disabled:opacity-80
                                    disabled:cursor-not-allowed disabled:hover:bg-red-500"
          >
            {btnDisabled && <Load />}
            cambiar contraseña
          </button>
        </form>
      </div>

      <AlertMessage alert={alertMessage} setAlert={() => setAlertMessage({ show: false })} />

    </main>
  );
};

export default ChangePassword;