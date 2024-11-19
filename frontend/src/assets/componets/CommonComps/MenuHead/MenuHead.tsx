import './MenuHeadStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='menuHeader'>
            <FontAwesomeIcon icon={faBars} onClick={toggleMenu} className="menu-icon" />
            {isMenuOpen && (
                <div className="dropdown-menu">
                    <button>Inicio</button>
                    <button>Horarios</button>
                    <button>Notificaciones</button>
                    <button>Trámites</button>
                    <button>Contacto</button>
                    <button><a href='/UserPage'>Usuario</a></button>
                </div>
            )}
        </div>
    );
}

export default Header;