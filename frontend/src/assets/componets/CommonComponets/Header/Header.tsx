import './HeaderStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='header'>
            <a href='/Home'><FontAwesomeIcon icon={faCalendar} /></a>
            <FontAwesomeIcon icon={faBars} onClick={toggleMenu} className="menu-icon" />
            {isMenuOpen && (
                <div className="dropdown-menu">
                    <button>Inicio</button>
                    <button>Horarios</button>
                    <button>Notificaciones</button>
                    <button>Trámites</button>
                    <button>Contacto</button>
                </div>
            )}
        </div>
    );
}

export default Header;