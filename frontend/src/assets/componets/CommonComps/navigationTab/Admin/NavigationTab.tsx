import '../NavigationTabStyles.css';
import { RiCalendarScheduleLine, RiHome2Line } from "react-icons/ri";
import { LuBell } from "react-icons/lu";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { GoGear } from "react-icons/go";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '#src/assets/componets/CommonComps/SearchBarheader/SearchBarheader';

function NavigationTab() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    const pageTitle = () => {
        switch (location.pathname) {
            case '/home': return '';
            case '/timetable': return 'Mi Horario';
            case '/notificaciones': return <SearchBar />;
            case '/tramites': return <SearchBar />;
            case '/ProfilePage': return 'Mi Perfil';
            case '/admin': return 'Configuración';
            default: '';
        }
    };

    return (
        <div className='body'>
            <div className='navigationTab__header'>
                <h2 className="navigationTab__currentPage">{pageTitle()}</h2>
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
                        <h1 className='navigationTab__side-menuHeader'>Menú</h1>
                        <div className="navigationTab__side-menuContent">
                            <Link className='navigationLink' to="/home">
                                <button className={`navigationTab__side-menuButton ${location.pathname === "/home" ? "active" : ""}`}>
                                    <RiHome2Line className='homeIcon' size={30} /> Inicio
                                </button>
                            </Link>

                            <Link className='navigationLink' to="/timetable">
                                <button className={`navigationTab__side-menuButton ${location.pathname === "/horarios" ? "active" : ""}`}>
                                    <RiCalendarScheduleLine className='scheduleIcon' size={30} /> Horarios
                                </button>
                            </Link>

                            <Link className='navigationLink' to="/notices">
                                <button className={`navigationTab__side-menuButton ${location.pathname === "/notices" ? "active" : ""}`}>
                                    <LuBell className='notificationIcon' size={30} /> Notificaciones
                                </button>
                            </Link>

                            <Link className='navigationLink' to="/tramites">
                                <button className={`navigationTab__side-menuButton ${location.pathname === "/tramites" ? "active" : ""}`}>
                                    <BsPencilSquare className='formalitiesIcon' size={30} /> Trámites
                                </button>
                            </Link>

                            <Link className='navigationLink' to="/profile">
                                <button className={`navigationTab__side-menuButton ${location.pathname === "/profile" ? "active" : ""}`}>
                                    <FaRegUser className='profileIcon' size={30} /> Perfil
                                </button>
                            </Link>

                            <Link className='navigationLink' to="/admin">
                                <button className={`navigationTab__side-menuButton ${location.pathname === "/configuracion" ? "active" : ""}`}>
                                    <GoGear className='settingsIcon' size={30} /> Configuración
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className='navigationTab__side-menuFooter'>
                        <button className='navigationTab__side-menuFoot' onClick={handleLogout}>
                            <MdOutlineLogin className='logoutIcon' size={30} /> Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavigationTab;
