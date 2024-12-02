import React, { useState } from 'react';
import './SideMenuStyles.css';
import { RiCalendarScheduleLine, RiHome2Line } from "react-icons/ri";
import { LuBell } from "react-icons/lu";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";

function SideMenu() {
    const [active, setActive] = useState("home");

    const handleSetActive = (section: React.SetStateAction<string>) => {
        setActive(section);
    };

    return (
        <div className='body'>
            <div className="side-menu__body">
                <div>
                    <h1 className='side-menu__header'>Menú</h1>
                    <a href="#home">
                        <button
                            className={`side-menu__content ${active === "home" ? "active" : ""}`}
                            onClick={() => handleSetActive("home")}
                        >
                            <RiHome2Line className='homeIcon' size={30}/> Inicio
                        </button>
                    </a>
                    <a href="#horarios">
                        <button
                            className={`side-menu__content ${active === "horarios" ? "active" : ""}`}
                            onClick={() => handleSetActive("horarios")}
                        >
                            <RiCalendarScheduleLine  className='scheduleIcon' size={30}/> Horarios
                        </button>
                    </a>
                    <a href="#notificaciones">
                        <button
                            className={`side-menu__content ${active === "notificaciones" ? "active" : ""}`}
                            onClick={() => handleSetActive("notificaciones")}
                        >
                            <LuBell className='notificationIcon' size={30}/> Notificaciones
                        </button>
                    </a>
                    <a href="#tramites">
                        <button
                            className={`side-menu__content ${active === "tramites" ? "active" : ""}`}
                            onClick={() => handleSetActive("tramites")}
                        >
                            <BsPencilSquare className='formalitiesIcon' size={30}/> Trámites
                        </button>
                    </a>
                    <a href="#perfil">
                        <button
                            className={`side-menu__content ${active === "perfil" ? "active" : ""}`}
                            onClick={() => handleSetActive("perfil")}
                        >
                            <FaRegUser className='profileIcon' size={30}/> Perfil
                        </button>
                    </a>
                </div>

                <div className='side-menu__footer'>
                    <a href="#logout">
                        <button className='side-menu__foot'>
                            <MdOutlineLogin className='logoutIcon' size={30}/> Cerrar sesión
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SideMenu;
