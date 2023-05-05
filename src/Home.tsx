import "./App.css";
import React, {createContext, Fragment, useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Inicio from "./page/inicio/inicio";
import Header from "./widgets/header";
import Footer from "./widgets/footer";
import Page_404 from "./page/page_404";
import Recover from "./page/inicio/recover";
import Registro from "./page/registro/registro";
import Salida from "./page/registro/salida";
import ChangePassword from "./page/inicio/changePassword";
import RecoverCode from "./page/inicio/recoverCode";
import {getToken, getUsuario} from "./service/token-config";
import Panel from "./page/panel/panel";
import {Usuario} from "./model/usuario";
import HeaderPanel from "./widgets/headerPanel";
import Aside from "./widgets/aside";
import Security from "./page/security";
import Usuarios from "./page/panel/usuarios/usuarios";
import Registros from "./page/panel/registros/registros";
import TipoDocumento from "./page/panel/tipo_documento/tipoDocumento";
import Areas from "./page/panel/areas/areas";
import Sedes from "./page/panel/sedes/sedes";
import HistorialUsuarios from "./page/panel/historial/historialUsuarios";
import UsuarioHistorial from "./page/panel/historial/usuarioHistorial";
import UsuarioRegistrosGet from "./page/panel/registros/usuarioRegistrosGet";
import IngresoRapido from "./page/registro/ingresoRapido";
import ParamNomina from "./page/panel/parametros/paramNomina";
import ConfigNominaPage from "./page/panel/configNominaPage";
import Nominas from "./page/panel/nomina/nominas";
import NominaUsuarios from "./page/panel/nomina/nominaUsuarios";
import RegistrosUsuario from "./page/panel/nomina/registrosUsuario";
import Informacion from "./page/registro/informacion";

type CodeContextType = {
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
};

export const CodeContext = createContext<CodeContextType | undefined>(undefined);

const Home = () => {
    const [code, setCode] = useState("");
    const token: string | null = getToken();
    const usuario: Usuario | null = getUsuario();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <Fragment>
                        <Header/>
                        <Inicio/>
                        <Footer/>
                    </Fragment>
                }/>

                <Route path="/registro" element={
                    <Fragment>
                        <Header/>
                        <Registro/>
                        <Footer/>
                    </Fragment>
                }/>

                <Route path="/ingreso" element={
                    <Fragment>
                        <Header/>
                        <IngresoRapido/>
                        <Footer/>
                    </Fragment>
                }/>

                <Route path="/salida" element={
                    <Fragment>
                        <Header/>
                        <Salida/>
                        <Footer/>
                    </Fragment>
                }/>

                <Route path="/info/:usuario/:message/:date" element={
                    <Fragment>
                        <Header/>
                        <Informacion/>
                        <Footer/>
                    </Fragment>
                }/>

                <Route path="/inicio" element={
                    <Fragment>
                        <Header/>
                        <Inicio/>
                        <Footer/>
                    </Fragment>}/>

                <Route path="/inicio/recover" element={
                    <Fragment>
                        <Header/>
                        <Recover/>
                        <Footer/>
                    </Fragment>}/>

                <Route path="/inicio/recover-password/:value" element={
                    <Fragment>
                        <Header/>
                        <CodeContext.Provider value={{code, setCode}}>
                            <RecoverCode setCode={setCode}/>
                        </CodeContext.Provider>
                        <Footer/>
                    </Fragment>
                }/>

                <Route path="/inicio/change-password/:value" element={
                    code === "" ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <Header/>
                            <CodeContext.Provider value={{code, setCode}}>
                                <ChangePassword setCode={setCode} code={code}/>
                            </CodeContext.Provider>
                            <Footer/>
                        </Fragment>
                }/>

                <Route path="/panel" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <HeaderPanel/>
                            <main className="lg:pl-80 lg:p-8 p-4">
                                <Aside/>
                                <Panel/>
                            </main>
                        </Fragment>
                }/>

                <Route path="/panel/usuarios" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <HeaderPanel/>
                            <main className="lg:pl-80 lg:p-8 p-4">
                                <Aside/>
                                <Usuarios/>
                            </main>
                        </Fragment>
                }/>

                <Route path="/panel/registros" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <HeaderPanel/>
                            <main className="lg:pl-80 lg:p-8 p-4">
                                <Aside/>
                                <Registros/>
                            </main>
                        </Fragment>
                }/>

                <Route path="/panel/registros/:id" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <HeaderPanel/>
                            <main className="lg:pl-80 lg:p-8 p-4">
                                <Aside/>
                                <UsuarioRegistrosGet/>
                            </main>
                        </Fragment>
                }/>

                <Route path="/panel/documentos" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <HeaderPanel/>
                            <main className="lg:pl-80 lg:p-8 p-4">
                                <Aside/>
                                <TipoDocumento/>
                            </main>
                        </Fragment>
                }/>

                <Route path="/panel/areas" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <HeaderPanel/>
                            <main className="lg:pl-80 lg:p-8 p-4">
                                <Aside/>
                                <Areas/>
                            </main>
                        </Fragment>
                }/>

                <Route path="/panel/sedes" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <HeaderPanel/>
                            <main className="lg:pl-80 lg:p-8 p-4">
                                <Aside/>
                                <Sedes/>
                            </main>
                        </Fragment>
                }/>

                <Route path="/panel/historial" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <HeaderPanel/>
                            <main className="lg:pl-80 lg:p-8 p-4">
                                <Aside/>
                                <HistorialUsuarios/>
                            </main>
                        </Fragment>
                }/>

                <Route path="/panel/historial/:id" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <HeaderPanel/>
                            <main className="lg:pl-80 lg:p-8 p-4">
                                <Aside/>
                                <UsuarioHistorial/>
                            </main>
                        </Fragment>
                }/>

                <Route path="/panel/nomina/parametros" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <HeaderPanel/>
                            <main className="lg:pl-80 lg:p-8 p-4">
                                <Aside/>
                                <ParamNomina/>
                            </main>
                        </Fragment>
                }/>

                <Route path="/panel/nomina" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <HeaderPanel/>
                            <main className="lg:pl-80 lg:p-8 p-4">
                                <Aside/>
                                <Nominas/>
                            </main>
                        </Fragment>
                }/>

                <Route path="/panel/nomina/:nomina/:fecha/empleados" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <HeaderPanel/>
                            <main className="lg:pl-80 lg:p-8 p-4">
                                <Aside/>
                                <NominaUsuarios/>
                            </main>
                        </Fragment>
                }/>

                <Route path="/panel/nomina/:nomina/:fecha/empleados/:usuario/:nombre" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <HeaderPanel/>
                            <main className="lg:pl-80 lg:p-8 p-4">
                                <Aside/>
                                <RegistrosUsuario/>
                            </main>
                        </Fragment>
                }/>

                <Route path="/panel/nomina/config" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <HeaderPanel/>
                            <main className="lg:pl-80 lg:p-8 p-4">
                                <Aside/>
                                <ConfigNominaPage/>
                            </main>
                        </Fragment>
                }/>

                <Route path="/security" element={
                    token === null || usuario === null ? <Navigate to="/inicio"/> :
                        <Fragment>
                            <Security/>
                            <Footer/>
                        </Fragment>
                }/>
                <Route path="*" element={
                    <Fragment>
                        <Page_404/>
                        <Footer/>
                    </Fragment>

                }/>
            </Routes>
        </BrowserRouter>
    );
};

export default Home;