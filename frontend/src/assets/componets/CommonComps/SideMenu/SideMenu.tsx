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
        <div className='header'>
            <div className="side-menu__body">
                <a href="#home">
                    <button
                        className={`side-menu__header ${active === "home" ? "active" : ""}`}
                        onClick={() => handleSetActive("home")}
                    >
                        <RiHome2Line /> Menú
                    </button>
                </a>
                <a href="#horarios">
                    <button
                        className={`side-menu__content ${active === "horarios" ? "active" : ""}`}
                        onClick={() => handleSetActive("horarios")}
                    >
                        <RiCalendarScheduleLine /> Horarios
                    </button>
                </a>
                <a href="#notificaciones">
                    <button
                        className={`side-menu__content ${active === "notificaciones" ? "active" : ""}`}
                        onClick={() => handleSetActive("notificaciones")}
                    >
                        <LuBell /> Notificaciones
                    </button>
                </a>
                <a href="#tramites">
                    <button
                        className={`side-menu__content ${active === "tramites" ? "active" : ""}`}
                        onClick={() => handleSetActive("tramites")}
                    >
                        <BsPencilSquare /> Trámites
                    </button>
                </a>
                <a href="#perfil">
                    <button
                        className={`side-menu__content ${active === "perfil" ? "active" : ""}`}
                        onClick={() => handleSetActive("perfil")}
                    >
                        <FaRegUser /> Perfil
                    </button>
                </a>
            </div>
            <div className='side-menu__footer'>
                <a href="#logout">
                    <button className='side-menu__foot'>
                        <MdOutlineLogin /> Cerrar sesión
                    </button>
                </a>
            </div>
        </div>
    );
}

export default SideMenu;