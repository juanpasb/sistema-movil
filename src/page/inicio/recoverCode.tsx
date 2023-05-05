import { useNavigate, useParams } from "react-router-dom";
import React, { FormEvent, useState } from "react";
import AlertMessage, { AlertType } from "../../components/alertMessage";
import { validarCodigoAxios, VerificateCode } from "../../service/authService";
import { error, success, timeoutConfig, warning } from "../../config/config";
import Load from "../../components/load";
import { decrypt } from "../../element/encript";

const RecoverCode = (props: { setCode: Function }) => {
  const [codigo, setCodigo] = useState("");
  const [alertMessage, setAlertMessage] = React.useState<AlertType>({ show: false });
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const { value } = useParams<string>();
  const navigate = useNavigate();

  const validarCodigoQuery = async (verificateCode: VerificateCode) => await validarCodigoAxios(verificateCode);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnDisabled(true);

    validarCodigoQuery({
      id: Number(decrypt(value as string)),
      code: codigo
    }).then((res) => {
      props.setCode(codigo);

      setAlertMessage({
        show: true,
        message: res.data.message,
        type: success,
        event: () => navigate("/inicio/change-password/" + value)
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
    <main className="flex items-center justify-center h-screen">
      <div className="w-96 bg-white rounded-md shadow-lg p-8">
        <h1 className="text-xl font-semibold text-center mb-4">Código de verificación</h1>
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <div className="relative">
            <input value={codigo}
                   type="text"
                   className="w-full border-gray-300 py-2 px-10 rounded-md outline-none
              focus:border-red-500 focus:ring-1 focus:ring-red-500 text-center"
                   placeholder="Ingresa el código de verificación"
                   onInput={(e) => {
                     setCodigo(e.currentTarget.value.replace(" ", ""));
                   }}
            />
            <svg className="absolute top-3 left-3 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"
                 aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20z"
                    clipRule="evenodd" />
              <path fillRule="evenodd" d="M10 6a1 1 0 100-2 1 1 0 000 2zm0 6a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z"
                    clipRule="evenodd" />
            </svg>
          </div>
          <button
            disabled={codigo === "" || btnDisabled || value === ""}
            type="submit"
            className="w-full rounded-md border transition-colors
                                    border-transparent bg-red-600 py-2 px-4 text-sm
                                    font-medium text-white shadow-sm hover:bg-red-700
                                    focus:outline-none focus:ring-2 focus:ring-red-500
                                    focus:ring-offset-2 disabled:opacity-50 disabled:opacity-80
                                    disabled:cursor-not-allowed disabled:hover:bg-red-500"
          >
            {btnDisabled && <Load />}
            Siguiente
          </button>
        </form>
      </div>

      <AlertMessage alert={alertMessage} setAlert={() => setAlertMessage({ show: false })} />

    </main>
  );
};

export default RecoverCode;