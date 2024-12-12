import './HeaderStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faBars } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { AuthData } from '#common/@types/models';
import { UserRole } from '#common/@enums/models';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [role, setRole] = useState<string>("");

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('currentUser') ?? "null") as AuthData;
        if (authData) {
            setRole(authData.user.role);
        } else {
            console.warn('No se encontró un rol en localStorage');
            setRole(""); // O manejarlo de otra forma
        }
    }, []);

    return (
        <div className='header'>
            <div className="header__content">
                <a href='/Home'>
                    <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
                </a>
            </div>
            <FontAwesomeIcon
                icon={faBars}
                onClick={toggleMenu}
                className="menu-icon"
            />
            {isMenuOpen && (
                <div className="dropdown-menu">
                    <a href="/Home">
                        <button>Inicio</button>
                    </a>
                    <a href="/timetable">
                        <button>Horarios</button>
                    </a>
                    <a href="/notices">
                        <button>Notificaciones</button>
                    </a>

                    {role !== UserRole.Student && (
                        // <a href="/Tramites">
                        <a href="">
                            <button>Trámites</button>
                        </a>
                    )}

                    {role === UserRole.Admin && (
                        <a href="/admin">
                            <button>Configuración</button>
                        </a>
                    )}

                    <a href="/profile">
                        <button>Perfil</button>
                    </a>

                </div>
            )}
        </div>
    );
}

export default Header;
