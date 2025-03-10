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

function NavigationTab() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, name } = (JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData).user; // Cambia 'currentuser' al nombre de la clave que usas en localStorage

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const roleTextInfo = () => {
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
          <h1 className="navigationTab__currentPage">{pageTitle()}</h1>
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
              <h2 className='navigationTab__side-menuHeader'>Menú</h2>
              <div className="navigationTab__side-menuContent">
                <div>
                  <Link className='navigationLink' to="/home">
                    <button className={`navigationTab__side-menuButton ${location.pathname === "/home" ? "active" : ""}`}>
                      <RiHome2Line className='homeIcon' size={30} /> <h3 className='button__text'>Inicio</h3>
                    </button>
                  </Link>
                </div>
                <div>
                  <Link className='navigationLink' to="/timetable">
                    <button className={`navigationTab__side-menuButton ${location.pathname === "/timetable" ? "active" : ""}`}>
                      <RiCalendarScheduleLine className='scheduleIcon' size={30} /> <h3 className='button__text'>Horarios</h3>
                    </button>
                  </Link>
                </div>
                <div>
                  <Link className='navigationLink' to="/notices">
                    <button className={`navigationTab__side-menuButton ${location.pathname === "/notices" ? "active" : ""}`}>
                      <LuBell className='notificationIcon' size={30} /> <h3 className='button__text'>Notificaciones</h3>
                    </button>
                  </Link>
                </div>
                <div>
                  {role != 'UR0_STUDENT' &&
                    <Link className='navigationLink' to="/formalities">
                      <button className={`navigationTab__side-menuButton ${location.pathname === "/formalities" ? "active" : ""}`}>
                        <BsPencilSquare className='formalitiesIcon' size={30} /> <h3 className='button__text'>Trámites</h3>
                      </button>
                    </Link>
                  }
                </div>
                <div>
                  <Link className='navigationLink' to="/profile">
                    <button className={`navigationTab__side-menuButton ${location.pathname === "/profile" ? "active" : ""}`}>
                      <FaRegUser className='profileIcon' size={30} /> <h3 className='button__text'>Perfil</h3>
                    </button>
                  </Link>
                </div>
                <div>
                  {role == 'UR3_ADMIN' &&
                    < Link className='navigationLink' to="/admin">
                      <button className={`navigationTab__side-menuButton ${location.pathname === "/admin" ? "active" : ""}`}>
                        <GoGear className='settingsIcon' size={30} /> <h3 className='button__text'>Configuración</h3>
                      </button>
                    </Link>
                  }

                </div>
              </div>
            </div>
            <div className='navigationTab__side-menuFooter'>
              <button className='navigationTab__side-menuFoot' onClick={handleLogout}>
                <MdOutlineLogin className='logoutIcon' size={30} /> <h3 className='button__text'>Cerrar sesión</h3>
              </button>
            </div>
          </div >
        </div >
      </div >
    </>
  );
}


export default NavigationTab;
