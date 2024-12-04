import React, { useState } from 'react';
import './NavigationTabStyles.css';
import { RiCalendarScheduleLine, RiHome2Line } from "react-icons/ri";
import { LuBell } from "react-icons/lu";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { GoGear } from "react-icons/go";

function NavigationTab() {

    const [active, setActive] = useState("home");

    const handleSetActive = (section: React.SetStateAction<string>) => {
        setActive(section);
    };

    function usePageTitle() {
        const location = useLocation();
        switch (location.pathname) {
            case '/home':
                return '';
            case '/horarios':
                return 'Mi Horario';
            case '/notificaciones':
                return <SearchBar/>;
            case '/tramites':
                return <SearchBar/>;
            case '/perfil':
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
                            <a className='navigationLink' href="#home">
                                <button
                                    className={`navigationTab__side-menuButton ${active === "home" ? "active" : ""}`}
                                    onClick={() => handleSetActive("home")}
                                >
                                    <RiHome2Line className='homeIcon' size={30} /> Inicio
                                </button>
                            </a>

                            <a className='navigationLink' href="#horarios">
                                <button
                                    className={`navigationTab__side-menuButton ${active === "horarios" ? "active" : ""}`}
                                    onClick={() => handleSetActive("horarios")}
                                >
                                    <RiCalendarScheduleLine className='scheduleIcon' size={30} /> Horarios
                                </button>
                            </a>

                            <a className='navigationLink' href="#notificaciones">
                                <button
                                    className={`navigationTab__side-menuButton ${active === "notificaciones" ? "active" : ""}`}
                                    onClick={() => handleSetActive("notificaciones")}
                                >
                                    <LuBell className='notificationIcon' size={30} /> Notificaciones
                                </button>
                            </a>

                            <a className='navigationLink' href="#tramites">
                                <button
                                    className={`navigationTab__side-menuButton ${active === "tramites" ? "active" : ""}`}
                                    onClick={() => handleSetActive("tramites")}
                                >
                                    <BsPencilSquare className='formalitiesIcon' size={30} /> Trámites
                                </button>
                            </a>

                            <a className='navigationLink' href="#perfil">
                                <button
                                    className={`navigationTab__side-menuButton ${active === "perfil" ? "active" : ""}`}
                                    onClick={() => handleSetActive("perfil")}
                                >
                                    <FaRegUser className='profileIcon' size={30} /> Perfil
                                </button>
                            </a>

                        </div>

                    </div>

                    <div className='navigationTab__side-menuFooter'>

                        <a className='navigationLink' href="#logout">

                            <button className='navigationTab__side-menuFoot'>
                                <MdOutlineLogin className='logoutIcon' size={30} /> Cerrar sesión
                            </button>

                        </a>

                    </div>

                </div>

            </div >

        </div>

    );
};
export default NavigationTab;