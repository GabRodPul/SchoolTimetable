import React, { useState } from 'react';
import './NavigationTabStyles.css';
import { RiCalendarScheduleLine, RiHome2Line } from "react-icons/ri";
import { LuBell } from "react-icons/lu";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { GoGear } from "react-icons/go";
import { Link, useLocation } from 'react-router-dom'; // Importar Link de react-router-dom
import NoticesPage from '../../../../page/NoticesPage/NoticesPage'
import SearchBar from '#src/assets/componets/CommonComps/SearchBarheader/SearchBarheader';

function NavigationTab() {

    const [active, setActive] = useState("home");

    const handleSetActive = (section: React.SetStateAction<string>) => {
        setActive(section);
    };

    function usePageTitle() {
        const location = useLocation();
        switch (location.pathname) {
            case '/Home':
                return '';
            case '/Horarios':
                return 'Mi Horario';
            case '/notificaciones':
                return <SearchBar/>;
            case '/Tramites':
                return <SearchBar/>;
            case '/Perfil':
                return 'Mi Perfil';
            default:
                return 'Página Desconocida';
        }
    }

    // Componente principal de navegación
    const pageTitle = usePageTitle();

    return (
        <div className='body'>
            <div className='navigationTab__header'>
                <h2 className="navigationTab__currentPage">{pageTitle}</h2>
                <div className='navigationTab__profile'>
                    <div className='navigationTab__profileInfo'>
                        <div className='navigationTab__profileIcon'>
                            <img src="./img/userExample.png" alt="Imagen de perfil" />
                        </div>
                        <p className="navigationTab__profileName">Daniel Matias</p>
                    </div>
                </div>
            </div>

            <div className='navigationTab__content'>
                <div className="navigationTab__side-menu">

                    <div className='navigationTab__side-menuBody'>

                        <h1 className='navigationTab__side-menuHeader'>
                            Menú
                        </h1>

                        <div className="navigationTab__side-menuContent">
                            <Link className='navigationLink' to="/home"> {/* Usamos Link en lugar de a */}
                                <button
                                    className={`navigationTab__side-menuButton ${active === "home" ? "active" : ""}`}
                                    onClick={() => handleSetActive("home")}
                                >
                                    <RiHome2Line className='homeIcon' size={30} /> Inicio
                                </button>
                            </Link>

                            <Link className='navigationLink' to="/horarios">
                                <button
                                    className={`navigationTab__side-menuButton ${active === "horarios" ? "active" : ""}`}
                                    onClick={() => handleSetActive("horarios")}
                                >
                                    <RiCalendarScheduleLine className='scheduleIcon' size={30} /> Horarios
                                </button>
                            </Link>

                            <Link className='navigationLink' to="/NoticesPage"> {/* Reemplazamos a href por Link */}
                                <button
                                    className={`navigationTab__side-menuButton ${active === "notificaciones" ? "active" : ""}`}
                                    onClick={() => handleSetActive("notificaciones")}
                                >
                                    <LuBell className='notificationIcon' size={30} /> Notificaciones
                                </button>
                            </Link>

                            <Link className='navigationLink' to="/tramites">
                                <button
                                    className={`navigationTab__side-menuButton ${active === "tramites" ? "active" : ""}`}
                                    onClick={() => handleSetActive("tramites")}
                                >
                                    <BsPencilSquare className='formalitiesIcon' size={30} /> Trámites
                                </button>
                            </Link>

                            <Link className='navigationLink' to="/ProfilePage">
                                <button
                                    className={`navigationTab__side-menuButton ${active === "perfil" ? "active" : ""}`}
                                    onClick={() => handleSetActive("perfil")}
                                >
                                    <FaRegUser className='profileIcon' size={30} /> Perfil
                                </button>
                            </Link>

                        </div>

                    </div>

                    <div className='navigationTab__side-menuFooter'>

                        <Link className='navigationLink' to="/logout">
                            <button className='navigationTab__side-menuFoot'>
                                <MdOutlineLogin className='logoutIcon' size={30} /> Cerrar sesión
                            </button>
                        </Link>

                    </div>

                </div>

            </div >

        </div>
    );
};
export default NavigationTab;
