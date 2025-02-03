import './NavigationTabStyles.css';
import { RiCalendarScheduleLine, RiHome2Line } from "react-icons/ri";
import { LuBell } from "react-icons/lu";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { GoGear } from "react-icons/go";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '#src/assets/componets/CommonComps/SearchBarheader/SearchBarheader';
import { AuthData } from '#common/@types/models';
import Header from '../MenuheaderMobile/Header';
import NavItem from './NavItem';
import { UserRole } from '#common/@enums/models';

function NavigationTab() {
    const location = useLocation();
    const navigate = useNavigate();
    const { role, name } = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user; // Cambia 'currentuser' al nombre de la clave que usas en localStorage

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    const roleTextInfo = () =>{
        switch (role) {
            case 'UR0_STUDENT': return 'Estudiante';
            case 'UR1_TEACHER': return 'Profesor';
            case 'UR2_HEAD': return 'Jefatura';
            case 'UR3_ADMIN': return 'Administrador';
            default: '';
        }
    }

    const pageTitle = () => {
        switch (location.pathname) {
            case '/home': return roleTextInfo();
            case '/timetable': return 'Mi Horario';
            case '/notices': return <SearchBar />;
            case '/formalities': return <SearchBar />;
            case '/profile': return 'Mi Perfil';
            case '/admin': return 'Configuración';
            default: '';
        }
    };

    return (
        <>
        <div className="header">
            <Header />
        </div>
        <div className='navigationTab__body'>
            <div className='navigationTab__header'>
                <h2 className="navigationTab__currentPage">{pageTitle()}</h2>
                <div className='navigationTab__profile'>
                    <div className='navigationTab__profileInfo'>
                        <div className='navigationTab__profileIcon'>
                            <img src="./img/userExample.png" alt="Imagen de perfil" />
                        </div>
                        <p className="navigationTab__profileName">{name}</p>
                    </div>
                </div>
            </div>

            <div className='navigationTab__content'>
                <div className="navigationTab__side-menu">
                    <div className='navigationTab__side-menuBody'>
                        <h1 className='navigationTab__side-menuHeader'>Menú</h1>
                        <div className="navigationTab__side-menuContent">
                            
                            <NavItem
                                route="/home"
                                name="Inicio"
                                icon={RiHome2Line}
                                role={UserRole.Student}
                                className="homeIcon"
                            />
                            <NavItem
                                route="/timetable"
                                name="Horarios"
                                icon={RiCalendarScheduleLine}
                                role={UserRole.Student}
                                className="scheduleIcon"
                            />
                            
                            <NavItem
                                route="/notices"
                                name="Notificaciones"
                                icon={LuBell}
                                role={UserRole.Student}
                                className="notificationIcon"
                            />

                            <NavItem
                                route="/formalities"
                                name="Trámites"
                                icon={BsPencilSquare}
                                role={UserRole.Teacher}
                                className="formalitiesIcon"
                            />
                            
                            <NavItem
                                route="/profile"
                                name="Profil"
                                icon={FaRegUser}
                                role={UserRole.Admin}
                                className="profileIcon"
                            />

                            <NavItem
                                route="/admin"
                                name="Configuration"
                                icon={GoGear}
                                role={UserRole.Admin}
                                className="settingsIcon"
                            />
                        </div>
                    </div>
                    <div className='navigationTab__side-menuFooter'>
                        <button className='navigationTab__side-menuFoot' onClick={handleLogout}>
                            <MdOutlineLogin className='logoutIcon' size={30} /> Cerrar sesión
                        </button>
                    </div>
                </div >
            </div >
        </div >
        </>
    );
}


export default NavigationTab;
